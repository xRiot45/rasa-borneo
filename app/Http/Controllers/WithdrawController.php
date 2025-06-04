<?php

namespace App\Http\Controllers;

use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentStatusEnum;
use App\Enums\WithdrawStatusEnum;
use App\Http\Requests\WithdrawRequest;
use App\Mail\WithdrawTransferProofMail;
use App\Models\Courier;
use App\Models\CourierWallet;
use App\Models\Merchant;
use App\Models\Transaction;
use App\Models\Withdraw;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class WithdrawController extends Controller
{
    private function calculateMerchantBalance(int $merchantId): array
    {
        // Hitung total pendapatan cashless yang sudah dibayar
        $subtotal = Transaction::where('merchant_id', $merchantId)->where('payment_method', PaymentMethodEnum::CASHLESS)->where('payment_status', PaymentStatusEnum::PAID)->sum('subtotal_transaction_item');

        $totalDiscount = Transaction::where('merchant_id', $merchantId)->where('payment_method', PaymentMethodEnum::CASHLESS)->where('payment_status', PaymentStatusEnum::PAID)->sum('discount_total');

        $totalRevenue = $subtotal - $totalDiscount;

        $totalWithdrawn = Withdraw::where('merchant_id', $merchantId)
            ->whereNotIn('status', [WithdrawStatusEnum::REJECTED, WithdrawStatusEnum::CANCELED])
            ->sum('amount');

        $remainingBalance = $totalRevenue - $totalWithdrawn;

        return [
            'subtotal' => $subtotal,
            'totalDiscount' => $totalDiscount,
            'totalRevenue' => $totalRevenue,
            'totalWithdrawn' => $totalWithdrawn,
            'remainingBalance' => $remainingBalance,
        ];
    }

    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $balances = $this->calculateMerchantBalance($merchantId);
        $withdraws = Withdraw::where('merchant_id', $merchantId)->orderBy('created_at', 'desc')->get();

        return Inertia::render('merchant/financial-management/withdraw/index', [
            'data' => $withdraws,
            'totalRevenue' => $balances['totalRevenue'],
            'totalWithdrawn' => $balances['totalWithdrawn'],
            'remainingBalance' => $balances['remainingBalance'],
        ]);
    }

    public function indexAdmin(): InertiaResponse
    {
        $withdraws = Withdraw::with('merchant')->orderBy('created_at', 'desc')->get();
        return Inertia::render('admin/financial-management/withdraw/index', [
            'data' => $withdraws,
        ]);
    }

    public function create(): InertiaResponse
    {
        $user = Auth::user();
        $merchantBank = Merchant::where('user_id', $user->id)->select('bank_code', 'bank_account_number', 'bank_account_name')->first();

        return Inertia::render('merchant/financial-management/withdraw/pages/form', [
            'merchantBank' => $merchantBank,
        ]);
    }

    public function showCourierWithdrawForm(): InertiaResponse
    {
        return Inertia::render('courier/pages/withdraw/index');
    }

    public function store(WithdrawRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $balances = $this->calculateMerchantBalance($merchantId);

        if ($validated['amount'] > $balances['remainingBalance']) {
            return back()->withErrors(['amount' => 'Jumlah penarikan melebihi saldo yang tersedia.']);
        }

        if ($request->boolean('use_merchant_bank')) {
            $validated['bank_code'] = $merchant->bank_code;
            $validated['bank_account_number'] = $merchant->bank_account_number;
            $validated['bank_account_name'] = $merchant->bank_account_name;
        }

        Withdraw::create(
            array_merge($validated, [
                'merchant_id' => $merchantId,
            ]),
        );

        return redirect()->route('merchant.withdraw.indexMerchant')->with('success', 'Pengajuan Penarikan Dana Berhasil');
    }

    public function requestWithdrawCourier(WithdrawRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $user = Auth::user();
        $courier = Courier::where('user_id', $user->id)->first();
        $courierId = $courier->id;

        $balances = CourierWallet::where('courier_id', $courierId)->first();

        if ($validated['amount'] > $balances->balance) {
            return back()->withErrors(['amount' => 'Jumlah penarikan melebihi saldo yang tersedia.']);
        }

        Withdraw::create(
            array_merge($validated, [
                'courier_id' => $courierId,
            ]),
        );

        return redirect()->route('courier.indexCourier')->with('success', 'Pengajuan Penarikan Dana Berhasil');
    }

    public function storeAdmin(Request $request, int $withdrawId): RedirectResponse
    {
        $request->validate([
            'transfer_proof' => 'required|image|max:2048',
        ]);

        $withdraw = Withdraw::with('merchant.user')->findOrFail($withdrawId);

        if ($request->hasFile('transfer_proof') && $request->file('transfer_proof')->isValid()) {
            $file = $request->file('transfer_proof');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('withdraw_proofs', $filename, 'public');

            $withdraw->update([
                'transfer_proof' => '/storage/' . $path,
                'status' => WithdrawStatusEnum::TRANSFERED,
                'transferred_at' => now(),
            ]);
        }

        $merchantEmail = $withdraw->merchant->user->email;
        Mail::to($merchantEmail)->send(new WithdrawTransferProofMail($withdraw));

        return redirect()->route('admin.withdraw.indexAdmin')->with('success', 'Bukti transfer berhasil diupload dan email notifikasi terkirim.');
    }

    public function updateStatus(Request $request, int $withdrawId): RedirectResponse
    {
        $request->validate([
            'status' => 'required|in:' . implode(',', WithdrawStatusEnum::values()),
        ]);

        $withdraw = Withdraw::findOrFail($withdrawId);

        if (in_array($withdraw->status, [WithdrawStatusEnum::REJECTED, WithdrawStatusEnum::CANCELED, WithdrawStatusEnum::TRANSFERED])) {
            return back()->with('error', 'Status tidak dapat diubah karena withdraw sudah memiliki status akhir.');
        }

        $newStatus = WithdrawStatusEnum::from($request->input('status'));

        // Siapkan array untuk pembaruan data
        $updateData = ['status' => $newStatus];

        // Tambahkan waktu berdasarkan status
        switch ($newStatus) {
            case WithdrawStatusEnum::APPROVED:
                $updateData['approved_at'] = now();
                break;
            case WithdrawStatusEnum::REJECTED:
                $updateData['rejected_at'] = now();
                break;
            case WithdrawStatusEnum::CANCELED:
                $updateData['cancelled_at'] = now();
                break;
            case WithdrawStatusEnum::TRANSFERED:
                $updateData['transferred_at'] = now();
                break;
        }

        $withdraw->update($updateData);

        return back()->with('success', 'Status penarikan berhasil diperbarui.');
    }

    public function cancelledWithdraw(int $withdrawId): RedirectResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $withdraw = Withdraw::where('id', $withdrawId)->first();

        if (!$withdraw || $merchantId !== $withdraw->merchant_id) {
            return redirect()->route('merchant.withdraw.indexMerchant')->with('error', 'Anda tidak memiliki izin untuk melakukan pembatalan penarikan ini.');
        }

        if ($withdraw->status !== WithdrawStatusEnum::PENDING) {
            return redirect()->route('merchant.withdraw.indexMerchant')->with('error', 'Penarikan hanya dapat dibatalkan jika masih dalam status "pending".');
        }

        $withdraw->update(['status' => WithdrawStatusEnum::CANCELED, 'cancelled_at' => now()]);

        return redirect()->route('merchant.withdraw.indexMerchant')->with('success', 'Pengajuan Penarikan Dana Berhasil Dibatalkan');
    }
}
