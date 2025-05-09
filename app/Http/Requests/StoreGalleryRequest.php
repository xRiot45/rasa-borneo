<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGalleryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'image_url' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'image_url.required' => 'Gambar harus diisi.',
            'image_url.image' => 'Gambar harus berupa gambar.',
            'image_url.mimes' => 'Format gambar harus jpg, jpeg, png, atau webp.',
            'image_url.max' => 'Ukuran gambar tidak boleh lebih dari 2MB.',
        ];
    }
}
