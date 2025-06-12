<?php

namespace App\Http\Requests;

use App\Enums\GenderEnum;
use App\Enums\VehicleTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class UpdateCourierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // User fields
            'full_name' => ['sometimes', 'string', 'max:255'],
            'email' => [
                'nullable',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->route('id')),
            ],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'phone_number' => ['sometimes', 'string', 'max:20'],

            // Courier fields
            'vehicle_type' => ['sometimes', new Enum(VehicleTypeEnum::class)],
            'national_id' => ['sometimes', 'digits:16'],
            'id_card_photo' => ['nullable', 'image', 'max:2048'],
            'age' => ['sometimes', 'integer', 'min:17'],
            'birthplace' => ['sometimes', 'string', 'max:255'],
            'birthdate' => ['sometimes', 'date'],
            'profile_image' => ['nullable', 'image', 'max:2048'],
            'gender' => ['sometimes', new Enum(GenderEnum::class)],
            'driving_license_photo' => ['nullable', 'image', 'max:2048'],
            'license_plate' => ['sometimes', 'string', 'max:255'],
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

            'phone_number.string' => 'Nomor HP harus berupa teks.',
            'phone_number.max' => 'Nomor HP maksimal 20 karakter.',

            'vehicle_type.required' => 'Jenis kendaraan wajib dipilih.',

            'national_id.digits' => 'Nomor KTP harus terdiri dari 16 digit.',

            'id_card_photo.image' => 'Foto KTP harus berupa file gambar.',
            'id_card_photo.max' => 'Ukuran foto KTP maksimal 2MB.',

            'age.integer' => 'Umur harus berupa angka.',
            'age.min' => 'Umur minimal adalah 17 tahun.',

            'birthplace.string' => 'Tempat lahir harus berupa teks.',
            'birthplace.max' => 'Tempat lahir maksimal 255 karakter.',

            'birthdate.date' => 'Tanggal lahir tidak valid.',

            'profile_image.image' => 'Foto profil harus berupa file gambar.',
            'profile_image.max' => 'Ukuran foto profil maksimal 2MB.',

            'gender.required' => 'Jenis kelamin wajib dipilih.',

            'driving_license_photo.image' => 'Foto SIM harus berupa file gambar.',
            'driving_license_photo.max' => 'Ukuran foto SIM maksimal 2MB.',

            'license_plate.string' => 'Nomor plat kendaraan harus berupa teks.',
            'license_plate.max' => 'Nomor plat kendaraan maksimal 255 karakter.',
        ];
    }
}
