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
            'vehicle_type' => ['required', new Enum(VehicleTypeEnum::class)],
            'national_id' => ['required', 'digits:16'],
            'id_card_photo' => ['nullable', 'image', 'max:2048'], // max 2MB
            'age' => ['required', 'integer', 'min:17'],
            'birthplace' => ['required', 'string', 'max:255'],
            'birthdate' => ['required', 'date'],
            'profile_image' => ['nullable', 'image', 'max:2048'],
            'gender' => ['required', new Enum(GenderEnum::class)],
            'driving_license_photo' => ['nullable', 'image', 'max:2048'],
            'is_online' => ['sometimes', 'boolean'],
            'is_verified' => ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
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

            'is_online.boolean' => 'Status online harus berupa true atau false.',
            'is_verified.boolean' => 'Status verifikasi harus berupa true atau false.',
        ];
    }
}
