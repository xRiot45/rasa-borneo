<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Photos
            'logo_photo' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'cover_photo' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp|max:2048',

            // Media Social URL
            'website_url' => 'nullable|url',
            'instagram_url' => 'nullable|url',
            'facebook_url' => 'nullable|url',
            'twitter_url' => 'nullable|url',
            'tiktok_url' => 'nullable|url',
            'whatsapp_url' => 'nullable|url',

            // Store Location
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',

            // Store Information
            'founded_year' => 'sometimes|numeric',
            'number_of_employees' => 'sometimes|numeric',
        ];
    }


    public function messages(): array
    {
        return [
            // Photos
            'cover_photo.required' => 'Foto cover toko wajib diisi.',
            'cover_photo.image' => 'Foto cover toko harus berupa gambar.',
            'cover_photo.mimes' => 'Format foto cover toko harus jpg, jpeg, png, atau webp.',
            'cover_photo.max' => 'Ukuran foto cover toko tidak boleh lebih dari 2MB.',

            // URL fields
            '*.url' => 'Format URL pada :attribute tidak valid.',

            // Store Location
            'latitude.numeric' => 'Latitude harus berupa angka.',
            'longitude.numeric' => 'Longitude harus berupa angka.',

            // Store Info
            'founded_year.required' => 'Tahun berdiri wajib diisi.',
            'founded_year.integer' => 'Tahun berdiri harus berupa angka.',
            'founded_year.digits' => 'Tahun berdiri harus terdiri dari 4 digit.',
            'founded_year.min' => 'Tahun berdiri minimal 1900.',
            'founded_year.max' => 'Tahun berdiri tidak boleh lebih dari tahun saat ini.',

            'number_of_employees.required' => 'Jumlah karyawan wajib diisi.',
            'number_of_employees.integer' => 'Jumlah karyawan harus berupa angka.',
            'number_of_employees.min' => 'Jumlah karyawan minimal 1 orang.',
        ];
    }
}
