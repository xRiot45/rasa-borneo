<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOperatingHourRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'hours' => ['required', 'array'],
            'hours.*.day' => ['required', 'string'],
            'hours.*.is_closed' => ['required', 'boolean'],
            'hours.*.open_time' => [
                'required_unless:hours.*.is_closed,true',
            ],
            'hours.*.close_time' => [
                'required_unless:hours.*.is_closed,true',
            ],
        ];
    }


    public function messages(): array
    {
        return [
            'day.required' => 'Hari wajib diisi.',
            'day.in' => 'Hari yang dipilih tidak valid.',

            'open_time.required' => 'Waktu buka wajib diisi.',
            'open_time.date_format' => 'Format waktu buka harus HH:MM (contoh: 08:00).',

            'close_time.required' => 'Waktu tutup wajib diisi.',
            'close_time.date_format' => 'Format waktu tutup harus HH:MM (contoh: 17:00).',
            'close_time.after' => 'Waktu tutup harus setelah waktu buka.',

            'is_closed.boolean' => 'Status tutup harus berupa true atau false.',
        ];
    }
}
