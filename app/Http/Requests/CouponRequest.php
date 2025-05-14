<?php

namespace App\Http\Requests;

use App\Enums\CouponTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CouponRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $couponId = $this->route('id');

        return [
            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('coupons', 'code')->ignore($couponId),
            ],
            'type' => ['required', Rule::in(CouponTypeEnum::values())],
            'discount' => ['required', 'numeric', 'min:0'],
            'minimum_purchase' => ['nullable', 'numeric', 'min:0'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'is_active' => ['required', 'boolean'],
        ];
    }


    public function messages(): array
    {
        return [
            'code.required' => 'Kode kupon wajib diisi.',
            'code.string' => 'Kode kupon harus berupa teks.',
            'code.max' => 'Kode kupon maksimal 50 karakter.',
            'code.unique' => 'Kode kupon sudah digunakan.',

            'type.required' => 'Tipe kupon wajib dipilih.',
            'type.in' => 'Tipe kupon harus berupa "fixed" atau "percent".',

            'discount.required' => 'Jumlah diskon wajib diisi.',
            'discount.numeric' => 'Jumlah diskon harus berupa angka.',
            'discount.min' => 'Jumlah diskon minimal adalah 0.',

            'minimum_purchase.numeric' => 'Minimal pembelian harus berupa angka.',
            'minimum_purchase.min' => 'Minimal pembelian tidak boleh kurang dari 0.',

            'start_date.required' => 'Tanggal mulai wajib diisi.',
            'start_date.date' => 'Tanggal mulai harus berupa tanggal yang valid.',

            'end_date.required' => 'Tanggal berakhir wajib diisi.',
            'end_date.date' => 'Tanggal berakhir harus berupa tanggal yang valid.',
            'end_date.after_or_equal' => 'Tanggal berakhir harus sama atau setelah tanggal mulai.',

            'is_active.required' => 'Status aktif wajib diisi.',
            'is_active.boolean' => 'Status aktif harus berupa true atau false.',
        ];
    }
}
