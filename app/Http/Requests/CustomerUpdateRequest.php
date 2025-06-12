<?php

namespace App\Http\Requests;

use App\Enums\GenderEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class CustomerUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'full_name' => ['sometimes', 'string', 'max:255'],
            'email' => [
                'nullable',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->route('id')),
            ],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'phone_number' => ['sometimes', 'string', 'max:20'],
            'birthplace' => ['sometimes', 'string', 'max:255'],
            'birthdate' => ['sometimes', 'date'],
            'gender' => ['sometimes', new Enum(GenderEnum::class)],
            'profile_image' => ['sometimes', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.string' => 'Nama lengkap harus berupa teks.',
            'full_name.max' => 'Nama lengkap maksimal 255 karakter.',

            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email maksimal 255 karakter.',
            'email.unique' => 'Email sudah digunakan oleh pengguna lain.',

            'password.min' => 'Password minimal 8 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',

            'phone_number.string' => 'Nomor telepon harus berupa teks.',
            'phone_number.max' => 'Nomor telepon maksimal 20 karakter.',

            'birthplace.string' => 'Tempat lahir harus berupa teks.',
            'birthplace.max' => 'Tempat lahir maksimal 255 karakter.',

            'birthdate.date' => 'Tanggal lahir harus berupa tanggal yang valid.',

            'gender.in' => 'Jenis kelamin harus L (Laki-laki) atau P (Perempuan).',

            'profile_image.image' => 'Foto profil harus berupa gambar.',
            'profile_image.mimes' => 'Foto profil harus berformat jpeg, png, atau jpg.',
            'profile_image.max' => 'Ukuran foto profil maksimal 2MB.',
        ];
    }
}
