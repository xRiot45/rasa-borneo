<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Enums\ReportTypeEnum;
use App\Exports\RevenueReportExportAll;
use App\Exports\RevenueReportExportByDate;
use App\Models\Merchant;
use App\Models\RevenueReport;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class RevenueReportController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $revenueReports = RevenueReport::where('merchant_id', $merchantId)->orderBy('report_date', 'asc')->get();
        $totalTransactions = RevenueReport::where('merchant_id', $merchantId)->sum('total_transaction');
        $totalRevenue = RevenueReport::where('merchant_id', $merchantId)->sum('total_revenue');

        $averageRevenuePerTransaction = $totalTransactions > 0 ? $totalRevenue / $totalTransactions : 0;
        $todayReport = RevenueReport::whereDate('report_date', Carbon::today())->first();
        $revenueByDate = RevenueReport::selectRaw('report_date, total_revenue')->get();

        $todayTransactions = 0;
        $todayRevenue = 0;
        $todayAverageRevenuePerTransaction = 0;

        if ($todayReport) {
            $todayTransactions = $todayReport->total_transaction;
            $todayRevenue = $todayReport->total_revenue;
            $todayAverageRevenuePerTransaction = $todayTransactions > 0 ? $todayRevenue / $todayTransactions : 0;
        }

        return Inertia::render('merchant/financial-management/revenue-report/index', [
            'data' => $revenueReports,
            'totalTransactions' => $totalTransactions,
            'totalRevenue' => $totalRevenue,
            'averageRevenuePerTransaction' => $averageRevenuePerTransaction,
            'todayTransactions' => $todayTransactions,
            'todayRevenue' => $todayRevenue,
            'todayAverageRevenuePerTransaction' => $todayAverageRevenuePerTransaction,
            'revenueByDate' => $revenueByDate,
        ]);
    }

    public function generateTodayReport(): RedirectResponse
    {
        $startOfDay = Carbon::today(config('app.timezone'))->startOfDay()->timezone('Asia/Jakarta');
        $endOfDay = Carbon::today(config('app.timezone'))->endOfDay()->timezone('Asia/Jakarta');

        $transactions = Transaction::whereBetween('checked_out_at', [$startOfDay, $endOfDay])
            ->where('payment_status', PaymentStatusEnum::PAID)
            ->whereHas('orderStatus', function ($query) {
                $query->where('status', OrderStatusEnum::COMPLETED);
            })
            ->get();

        if ($transactions->isEmpty()) {
            return redirect()->route('merchant.revenue-report.indexMerchant')
                ->with('message', 'Tidak ada transaksi hari ini. Laporan harian tidak dibuat.');
        }

        $groupedByMerchant = $transactions->groupBy('merchant_id');

        $createdReports = 0;
        $skippedReports = 0;

        foreach ($groupedByMerchant as $merchantId => $merchantTransactions) {
            $existingReport = RevenueReport::where('merchant_id', $merchantId)
                ->where('report_date', $startOfDay->toDateString())
                ->where('report_type', ReportTypeEnum::DAILY)
                ->exists();

            if ($existingReport) {
                $skippedReports++;
                continue;
            }

            $totalTransactions = $merchantTransactions->count();
            $totalRevenue = $merchantTransactions->reduce(function ($carry, $transaction) {
                $deliveryFee = $transaction->delivery_fee ?? 0;
                $serviceFee = $transaction->application_service_fee ?? 0;
                return $carry + ($transaction->final_total - $deliveryFee - $serviceFee);
            }, 0);

            RevenueReport::create([
                'merchant_id' => $merchantId,
                'report_date' => $startOfDay->toDateString(),
                'report_type' => ReportTypeEnum::DAILY,
                'total_transaction' => $totalTransactions,
                'total_revenue' => $totalRevenue,
            ]);

            $createdReports++;
        }

        // Tambahkan logika pesan
        if ($createdReports === 0 && $skippedReports > 0) {
            $message = 'Laporan Hari Ini Sudah Dibuat.';
        } elseif ($createdReports > 0) {
            $message = "Laporan harian berhasil dibuat. {$createdReports} dibuat, {$skippedReports} dilewati.";
        } else {
            $message = 'Tidak ada transaksi hari ini.';
        }

        return redirect()->route('merchant.revenue-report.indexMerchant')
            ->with('message', $message);
    }


    public function detailReport($reportDate): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->firstOrFail();
        $merchantId = $merchant->id;

        $revenueReport = RevenueReport::where('report_date', $reportDate)->where('merchant_id', $merchantId)->first();

        if (!$revenueReport) {
            abort(404);
        }

        $startOfDay = Carbon::parse($reportDate, config('app.timezone'))->startOfDay()->timezone('Asia/Jakarta');
        $endOfDay = Carbon::parse($reportDate, config('app.timezone'))->endOfDay()->timezone('Asia/Jakarta');

        $transactions = Transaction::with(['latestOrderStatus'])
            ->where('merchant_id', $merchantId)
            ->whereBetween('checked_out_at', [$startOfDay, $endOfDay])
            ->where('payment_status', PaymentStatusEnum::PAID)
            ->whereHas('orderStatus', function ($query) {
                $query->where('status', OrderStatusEnum::COMPLETED);
            })
            ->get();

        return Inertia::render('merchant/financial-management/revenue-report/pages/detail-report/index', [
            'report' => $revenueReport,
            'transactions' => $transactions,
        ]);
    }

    public function exportByDate($reportDate): BinaryFileResponse
    {
        return Excel::download(new RevenueReportExportByDate($reportDate), "Laporan Pendapatan - {$reportDate}.csv");
    }

    public function exportAll(): BinaryFileResponse
    {
        return Excel::download(new RevenueReportExportAll(), 'Semua Laporan Pendapatan.csv');
    }

    public function destroy(int $id): RedirectResponse
    {
        RevenueReport::where('id', $id)->delete();
        return redirect()->back()->with('success', 'Laporan berhasil dihapus.');
    }
}
