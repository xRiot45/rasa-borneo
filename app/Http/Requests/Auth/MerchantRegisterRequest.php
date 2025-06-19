<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class MerchantRegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Informasi Akun
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            // 'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone_number' => 'required|string|min:12|max:255',

            // Informasi Identitas
            'id_card_photo' => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:2048',

            // Informasi Bisnis
            'business_name' => 'required|string|max:255',
            'business_phone' => 'required|string|max:20',
            'business_email' => 'required|email|max:255',
            'postal_code' => 'required|string|max:10',
            'business_description' => 'required|string',
            'business_address' => 'required|string',
            'business_category_id' => 'required|exists:business_categories,id',

            // Informasi Rekening Bank
            'bank_code' => 'required|string',
            'bank_account_number' => 'required|string|max:30',
            'bank_account_name' => 'required|string|max:255',
            'tax_identification_number' => 'nullable|string|max:30',

            // Informasi Verifikasi
            'is_verified' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'User wajib diisi.',
            'user_id.exists' => 'User tidak ditemukan.',
            'id_card_photo.required' => 'Foto KTP wajib diunggah.',

            'business_name.required' => 'Nama bisnis wajib diisi.',
            'business_phone.required' => 'Nomor telepon bisnis wajib diisi.',
            'business_email.required' => 'Email bisnis wajib diisi.',
            'business_email.email' => 'Format email bisnis tidak valid.',
            'postal_code.required' => 'Kode pos wajib diisi.',
            'business_description.required' => 'Deskripsi bisnis wajib diisi.',
            'business_address.required' => 'Alamat bisnis wajib diisi.',
            'business_category_id.required' => 'Kategori bisnis wajib dipilih.',
            'business_category_id.exists' => 'Kategori bisnis tidak valid.',

            'bank_code.required' => 'Kode bank wajib diisi.',
            'bank_account_number.required' => 'Nomor rekening wajib diisi.',
            'bank_account_name.required' => 'Nama pemilik rekening wajib diisi.',
            'tax_identification_number.string' => 'NPWP harus berupa teks.',

            'is_verified.boolean' => 'Format verifikasi tidak valid.',
        ];
    }
}
