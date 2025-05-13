<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CartRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_id' => 'nullable|exists:customers,id',
            'merchant_id' => 'nullable|exists:merchants,id',
            'menu_item_id' => 'required|exists:menu_items,id',
            'quantity' => 'required|integer|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'customer_id.exists' => 'Customer tidak ditemukan.',
            'merchant_id.exists' => 'Merchant tidak ditemukan.',
            'menu_item_id.exists' => 'Menu item tidak ditemukan.',
        ];
    }
}
