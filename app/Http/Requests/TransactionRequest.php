<?php

namespace App\Http\Requests;

use App\Enums\OrderTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TransactionRequest extends FormRequest
{
    protected OrderTypeEnum $orderType;

    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->orderType = OrderTypeEnum::tryFrom($this->order_type) ?? OrderTypeEnum::DINEIN;
    }

    public function rules(): array
    {
        $rules = [];

        // Jika bukan DELIVERY, maka wajib nama dan no hp
        if ($this->orderType !== OrderTypeEnum::DELIVERY) {
            $rules['orderer_name'] = ['required', 'string'];
            $rules['orderer_phone_number'] = ['required', 'string'];
        }

        // Kalau DINEIN wajib pilih meja
        if ($this->orderType === OrderTypeEnum::DINEIN) {
            $rules['dine_in_table_id'] = ['required', Rule::exists('tables', 'id')];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'orderer_name.required' => 'Nama pemesan wajib diisi.',
            'orderer_phone_number.required' => 'Nomor HP pemesan wajib diisi.',
            'dine_in_table_id.required' => 'Meja makan wajib dipilih.',
            'dine_in_table_id.exists' => 'Meja makan yang dipilih tidak tersedia.',
        ];
    }
}
