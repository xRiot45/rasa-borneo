<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExpenseReportCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:expense_report_categories,name,merchant_id,id'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Nama kategori harus diisi.',
            'name.string' => 'Nama kategori harus berupa string.',
            'name.max' => 'Nama kategori tidak boleh lebih dari 255 karakter.',
            'name.unique' => 'Nama kategori sudah ada.',
        ];
    }
}
