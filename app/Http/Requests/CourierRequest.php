<?php

namespace App\Http\Requests;

use App\Enums\GenderEnum;
use App\Enums\VehicleTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class CourierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // User fields
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'phone_number' => ['required', 'string', 'max:20'],

            // Courier fields
            'vehicle_type' => ['required', new Enum(VehicleTypeEnum::class)],
            'national_id' => ['required', 'digits:16'],
            'id_card_photo' => ['nullable', 'image', 'max:2048'], // max 2MB
            'age' => ['required', 'integer', 'min:17'],
            'birthplace' => ['required', 'string', 'max:255'],
            'birthdate' => ['required', 'date'],
            'profile_image' => ['nullable', 'image', 'max:2048'],
            'gender' => ['required', new Enum(GenderEnum::class)],
            'driving_license_photo' => ['nullable', 'image', 'max:2048'],
            'license_plate' => ['nullable', 'string', 'max:255'],
            // 'is_online' => ['sometimes', 'boolean'],
            // 'is_verified' => ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            // User fields
            'full_name.required' => 'Nama lengkap wajib diisi.',
            'full_name.max' => 'Nama lengkap maksimal 255 karakter.',

            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email maksimal 255 karakter.',
            'email.unique' => 'Email sudah digunakan.',

            'password.required' => 'Password wajib diisi.',
            'password.min' => 'Password minimal 8 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',

            'phone_number.required' => 'Nomor HP wajib diisi.',
            'phone_number.max' => 'Nomor HP maksimal 20 karakter.',

            'vehicle_type.required' => 'Jenis kendaraan wajib dipilih.',

            'national_id.required' => 'Nomor KTP wajib diisi.',
            'national_id.digits' => 'Nomor KTP harus terdiri dari 16 digit.',

            'id_card_photo.image' => 'Foto KTP harus berupa file gambar.',
            'id_card_photo.max' => 'Ukuran foto KTP maksimal 2MB.',

            'age.required' => 'Umur wajib diisi.',
            'age.integer' => 'Umur harus berupa angka.',
            'age.min' => 'Umur minimal adalah 17 tahun.',
            'birthplace.required' => 'Tempat lahir wajib diisi.',

            'birthplace.max' => 'Tempat lahir maksimal 255 karakter.',
            'birthdate.required' => 'Tanggal lahir wajib diisi.',
            'birthdate.date' => 'Tanggal lahir tidak valid.',

            'profile_image.image' => 'Foto profil harus berupa file gambar.',
            'profile_image.max' => 'Ukuran foto profil maksimal 2MB.',

            'gender.required' => 'Jenis kelamin wajib dipilih.',

            'driving_license_photo.image' => 'Foto SIM harus berupa file gambar.',
            'driving_license_photo.max' => 'Ukuran foto SIM maksimal 2MB.',

            'license_plate.required' => 'Nomor plat kendaraan wajib diisi.',
            'license_plate.string' => 'Nomor plat kendaraan harus berupa teks.',
            'license_plate.max' => 'Nomor plat kendaraan maksimal 255 karakter.',

            // 'is_online.boolean' => 'Status online harus berupa true atau false.',
            // 'is_verified.boolean' => 'Status verifikasi harus berupa true atau false.',
        ];
    }
}
