<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExpenseReportRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'report_date' => 'required|date',
            'description' => 'nullable|string',
            'items.*.category_id' => 'required|exists:expense_report_categories,id',
            'items' => 'required|array|min:1',
            'items.*.name' => 'required|string|max:255',
            'items.*.description' => 'nullable|string',
            'items.*.amount' => 'required|numeric|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            // 'report_date.unique' => 'Laporan pengeluaran untuk tanggal ini sudah ada.',
            'report_date.date' => 'Tanggal harus berupa tanggal.',

            'items.*.category_id.required' => 'Kategori pengeluaran harus dipilih.',
            'items.*.category_id.exists' => 'Kategori pengeluaran tidak ditemukan.',

            'items.*.amount.min' => 'Jumlah harus lebih besar dari 0.',
            'items.*.amount.numeric' => 'Jumlah harus berupa angka.',

            'items.*.name.required' => 'Nama pengeluaran harus diisi.',
            'items.*.name.string' => 'Nama pengeluaran harus berupa teks.',
            'items.*.name.max' => 'Nama pengeluaran maksimal 255 karakter.',

            'items.*.description.string' => 'Keterangan harus berupa teks.',
            'items.*.description.max' => 'Keterangan maksimal 255 karakter.',

            'items.*.amount.required' => 'Jumlah harus diisi.',

        ];
    }
}
