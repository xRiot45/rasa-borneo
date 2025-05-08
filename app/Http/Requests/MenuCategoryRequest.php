<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MenuCategoryRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama Kategori menu wajib diisi.',
            'name.string' => 'Nama Kategori menu harus berupa string.',
            'name.max' => 'Nama Kategori menu maksimal 255 karakter.',
        ];
    }
}
