<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMerchantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Akun
            'full_name' => 'sometimes|required|string|max:255',
            'email' => [
                'sometimes',
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->route('id')),
            ],
            'phone_number' => 'sometimes|required|string|min:12|max:255',
            'password' => 'nullable|string|min:8|confirmed',

            // Data Merchant
            'id_card_photo' => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:2048',
            'business_name' => 'sometimes|required|string|max:255',
            'business_phone' => 'sometimes|required|string|max:20',
            'business_email' => 'sometimes|required|email|max:255',
            'postal_code' => 'sometimes|required|string|max:10',
            'business_description' => 'sometimes|required|string',
            'business_address' => 'sometimes|required|string',
            'business_category_id' => 'sometimes|required|exists:business_categories,id',
            'bank_code' => 'sometimes|required|string',
            'bank_account_number' => 'sometimes|required|string|max:30',
            'bank_account_name' => 'sometimes|required|string|max:255',
            'tax_identification_number' => 'nullable|string|max:30',
            'is_verified' => 'sometimes|boolean',
        ];
    }


    public function messages(): array
    {
        return [
            'full_name.required' => 'Nama lengkap wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah digunakan.',
            'phone_number.required' => 'Nomor telepon wajib diisi.',

            'id_card_photo.image' => 'File harus berupa gambar.',
            'id_card_photo.mimes' => 'Format gambar harus jpg, jpeg, png, atau webp.',
            'id_card_photo.max' => 'Ukuran gambar maksimal 2MB.',

            'business_name.required' => 'Nama bisnis wajib diisi.',
            'business_phone.required' => 'Nomor telepon bisnis wajib diisi.',
            'business_email.required' => 'Email bisnis wajib diisi.',
            'business_email.email' => 'Format email bisnis tidak valid.',
            'postal_code.required' => 'Kode pos wajib diisi.',
            'business_description.required' => 'Deskripsi bisnis wajib diisi.',
            'business_address.required' => 'Alamat bisnis wajib diisi.',
            'business_category_id.required' => 'Kategori bisnis wajib dipilih.',
            'business_category_id.exists' => 'Kategori bisnis tidak ditemukan.',

            'bank_code.required' => 'Kode bank wajib diisi.',
            'bank_account_number.required' => 'Nomor rekening wajib diisi.',
            'bank_account_name.required' => 'Nama pemilik rekening wajib diisi.',
            'tax_identification_number.string' => 'NPWP harus berupa teks.',

            'is_verified.boolean' => 'Format status verifikasi tidak valid.',
        ];
    }
}
