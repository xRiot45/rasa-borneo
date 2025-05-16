<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TableRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'is_available' => 'sometimes|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama meja wajib diisi.',
            'name.string' => 'Nama meja harus berupa teks.',
            'name.max' => 'Nama meja maksimal 255 karakter.',

            'capacity.required' => 'Kapasitas meja wajib diisi.',
            'capacity.integer' => 'Kapasitas meja harus berupa angka bulat.',
            'capacity.min' => 'Kapasitas meja minimal adalah 1.',

            'is_available.boolean' => 'Status ketersediaan meja harus berupa nilai true atau false.',
        ];
    }
}
