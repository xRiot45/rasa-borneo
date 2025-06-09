<?php

namespace App\Http\Requests\Settings;

use App\Enums\GenderEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class CustomerProfileUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // User fields
            'full_name' => 'required|string|max:255',
            'phone_number' => 'nullable|string|max:20',

            // Customer fields
            'birthplace' => 'nullable|string|max:255',
            'birthdate' => 'nullable|date',
            'profile_image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png|max:2048',
            'gender' => ['nullable', new Enum(GenderEnum::class)],
        ];
    }

    public function messages(): array
    {
        return [
            // User field messages
            'full_name.required' => 'Nama lengkap wajib diisi.',
            'full_name.string' => 'Nama lengkap harus berupa teks.',
            'full_name.max' => 'Nama lengkap tidak boleh lebih dari :max karakter.',

            'phone_number.string' => 'Nomor telepon harus berupa teks.',
            'phone_number.max' => 'Nomor telepon tidak boleh lebih dari :max karakter.',

            // Customer field messages
            'birthplace.string' => 'Tempat lahir harus berupa teks.',
            'birthplace.max' => 'Tempat lahir tidak boleh lebih dari :max karakter.',

            'birthdate.date' => 'Tanggal lahir harus berupa tanggal yang valid.',

            'profile_image.image' => 'Foto profil harus berupa file gambar.',
            'profile_image.mimes' => 'Foto profil harus berformat JPG, JPEG, atau PNG.',
            'profile_image.max' => 'Ukuran foto profil tidak boleh melebihi 2MB.',

            'gender.enum' => 'Jenis kelamin harus bernilai "laki-laki" atau "perempuan".',
        ];
    }
}
