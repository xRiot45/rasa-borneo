<?php

namespace App\Http\Requests;

use App\Enums\DayEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreOperatingHourRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'hours' => 'required|array',
            'hours.*.day' => [
                'required',
                Rule::in(DayEnum::values()), // Validasi sesuai dengan nilai enum bahasa Indonesia
            ],
            'hours.*.open_time' => 'required|date_format:H:i',
            'hours.*.close_time' => 'required|date_format:H:i|after:open_time',
            'hours.*.is_closed' => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'day_of_week.required' => 'Hari wajib diisi.',
            'day_of_week.in' => 'Hari yang dipilih tidak valid.',

            'open_time.required' => 'Waktu buka wajib diisi.',
            'open_time.date_format' => 'Format waktu buka harus HH:MM (contoh: 08:00).',

            'close_time.required' => 'Waktu tutup wajib diisi.',
            'close_time.date_format' => 'Format waktu tutup harus HH:MM (contoh: 17:00).',
            'close_time.after' => 'Waktu tutup harus setelah waktu buka.',

            'is_closed.boolean' => 'Status tutup harus berupa true atau false.',
        ];
    }
}
