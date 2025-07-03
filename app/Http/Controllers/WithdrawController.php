<?php

namespace App\Http\Controllers;

use App\Enums\WithdrawStatusEnum;
use App\Http\Requests\WithdrawRequest;
use App\Mail\CourierWithdrawalProofMail;
use App\Mail\MerchantWithdrawalProofMail;
use App\Models\Courier;
use App\Models\CourierWallet;
use App\Models\Merchant;
use App\Models\MerchantWallet;
use App\Models\Withdraw;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class WithdrawController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $wallet = MerchantWallet::where('merchant_id', $merchantId)->first();
        $balances = $wallet->balance ?? 0;

        $withdraws = Withdraw::where('merchant_id', $merchantId)->orderBy('created_at', 'desc')->get();
        $totalWithdrawn = Withdraw::where('merchant_id', $merchantId)->sum('amount');

        return Inertia::render('merchant/financial-management/withdraw/index', [
            'data' => $withdraws,
            'balances' => $balances,
            'total_withdrawn' => $totalWithdrawn,
        ]);
    }

    public function indexAdmin(): InertiaResponse
    {
        $withdrawalMerchants = Withdraw::with('merchant')->whereNotNull('merchant_id')->orderBy('created_at', 'desc')->get();

        $withdrawalCouriers = Withdraw::with('courier.user')->whereNotNull('courier_id')->orderBy('created_at', 'desc')->get();

        return Inertia::render('admin/pages/financial-management/withdraw/index', [
            'withdrawalMerchants' => $withdrawalMerchants,
            'withdrawalCouriers' => $withdrawalCouriers,
        ]);
    }

    public function showMerchantWithdrawForm(): InertiaResponse
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

    public function requestWithdrawMerchant(WithdrawRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $wallet = MerchantWallet::where('merchant_id', $merchantId)->first();

        if ($validated['amount'] > $wallet->balance) {
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

        $wallet = CourierWallet::where('courier_id', $courierId)->first();

        if ($validated['amount'] > $wallet->balance) {
            return back()->withErrors(['amount' => 'Jumlah penarikan melebihi saldo yang tersedia.']);
        }

        Withdraw::create(array_merge($validated, ['courier_id' => $courierId]));

        return redirect()->route('courier.indexCourier')->with('success', 'Pengajuan Penarikan Dana Berhasil');
    }

    public function withdrawHistoryCourier(): InertiaResponse
    {
        $user = Auth::user();
        $courier = Courier::where('user_id', $user->id)->first();
        $withdraws = Withdraw::where('courier_id', $courier->id)->orderBy('created_at', 'desc')->get();

        return Inertia::render('courier/pages/withdraw-history/index', [
            'data' => $withdraws,
        ]);
    }

    public function processWithdrawalProof(Request $request, int $withdrawId): RedirectResponse
    {
        $request->validate([
            'transfer_proof' => 'required|image|max:2048',
        ]);

        $withdraw = Withdraw::with(['merchant.user', 'courier.user'])->findOrFail($withdrawId);

        if ($request->hasFile('transfer_proof') && $request->file('transfer_proof')->isValid()) {
            $file = $request->file('transfer_proof');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('withdraw_proofs', $filename, 'public');

            if ($withdraw->status !== WithdrawStatusEnum::TRANSFERED) {
                $walletCourier = CourierWallet::where('courier_id', $withdraw->courier_id)->first();
                $walletMerchant = MerchantWallet::where('merchant_id', $withdraw->merchant_id)->first();

                if ($walletCourier) {
                    if ($walletCourier->balance < $withdraw->amount) {
                        return back()->withErrors(['error' => 'Saldo courier tidak mencukupi untuk pengurangan.']);
                    }

                    $walletCourier->balance -= $withdraw->amount;
                    $walletCourier->save();
                } elseif ($walletMerchant) {
                    if ($walletMerchant->balance < $withdraw->amount) {
                        return back()->withErrors(['error' => 'Saldo merchant tidak mencukupi untuk pengurangan.']);
                    }

                    $walletMerchant->balance -= $withdraw->amount;
                    $walletMerchant->save();
                }
            }

            $withdraw->update([
                'transfer_proof' => '/storage/' . $path,
                'status' => WithdrawStatusEnum::TRANSFERED,
                'transferred_at' => now(),
            ]);
        }

        if ($withdraw->merchant && $withdraw->merchant->user) {
            $merchantEmail = $withdraw->merchant->user->email;
            Mail::to($merchantEmail)->send(new MerchantWithdrawalProofMail($withdraw));
        }

        if ($withdraw->courier && $withdraw->courier->user) {
            $courierEmail = $withdraw->courier->user->email;
            Mail::to($courierEmail)->send(new CourierWithdrawalProofMail($withdraw));
        }

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
