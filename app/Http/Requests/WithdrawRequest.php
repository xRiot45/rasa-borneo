<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WithdrawRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $useMerchantBank = $this->boolean('use_merchant_bank');

        return [
            'amount' => ['required', 'integer', 'min:10000'],
            'use_merchant_bank' => ['nullable', 'boolean'],
            'bank_code' => $useMerchantBank ? ['nullable'] : ['required', 'string'],
            'bank_account_number' => $useMerchantBank ? ['nullable'] : ['required', 'string'],
            'bank_account_name' => $useMerchantBank ? ['nullable'] : ['required', 'string'],
            'note' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'amount.required' => 'Jumlah penarikan wajib diisi.',
            'amount.numeric' => 'Jumlah penarikan harus berupa angka.',
            'amount.min' => 'Jumlah penarikan minimal Rp10.000.',

            'bank_code.required' => 'Kode bank wajib diisi.',
            'bank_code.string' => 'Kode bank harus berupa teks.',
            'bank_code.max' => 'Kode bank maksimal :max karakter.',

            'bank_account_number.required' => 'Nomor rekening wajib diisi.',
            'bank_account_number.string' => 'Nomor rekening harus berupa teks.',
            'bank_account_number.max' => 'Nomor rekening maksimal :max karakter.',

            'bank_account_name.required' => 'Nama pemilik rekening wajib diisi.',
            'bank_account_name.string' => 'Nama pemilik rekening harus berupa teks.',
            'bank_account_name.max' => 'Nama pemilik rekening maksimal :max karakter.',

            'note.string' => 'Catatan harus berupa teks.',
        ];
    }
}
