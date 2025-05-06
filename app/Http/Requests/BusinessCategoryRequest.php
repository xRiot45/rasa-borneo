<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BusinessCategoryRequest extends FormRequest
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
            'name.required' => 'Nama Kategori Bisnis wajib diisi.',
            'name.string' => 'Nama Kategori harus berupa teks.',
            'name.max' => 'Nama Kategori tidak boleh lebih dari 255 karakter.',
        ];
    }
}
