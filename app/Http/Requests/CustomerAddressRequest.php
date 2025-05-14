<?php

namespace App\Http\Requests;

use App\Enums\AddressLabelEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CustomerAddressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'address_label' => ['nullable', Rule::in(AddressLabelEnum::values())],
            'complete_address' => 'required|string|max:255',
            'note_to_courier' => 'nullable|string|max:255',
            'recipient_name' => 'required|string|max:255',
            'email' => 'required|email|unique:customer_addresses,email',
            'phone_number' => 'required|string|unique:customer_addresses,phone_number',
            'is_primary' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'address_label.in' => 'Label alamat yang dipilih tidak valid.',

            'complete_address.required' => 'Alamat lengkap wajib diisi.',
            'complete_address.string' => 'Alamat lengkap harus berupa teks.',
            'complete_address.max' => 'Alamat lengkap tidak boleh lebih dari 255 karakter.',

            'note_to_courier.string' => 'Catatan untuk kurir harus berupa teks.',
            'note_to_courier.max' => 'Catatan untuk kurir tidak boleh lebih dari 255 karakter.',

            'recipient_name.required' => 'Nama penerima wajib diisi.',
            'recipient_name.string' => 'Nama penerima harus berupa teks.',
            'recipient_name.max' => 'Nama penerima tidak boleh lebih dari 255 karakter.',

            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah digunakan pada alamat lain.',

            'phone_number.required' => 'Nomor telepon wajib diisi.',
            'phone_number.string' => 'Nomor telepon harus berupa teks.',
            'phone_number.unique' => 'Nomor telepon sudah digunakan pada alamat lain.',

            'is_primary.boolean' => 'Format nilai untuk alamat utama tidak valid.',
        ];
    }
}
