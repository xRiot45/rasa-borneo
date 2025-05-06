<?php

namespace App\Http\Requests\Auth;

use App\Enums\GenderEnum;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class CustomerRegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone_number' => 'required|string|min:12|max:255',
            'birthplace' => 'nullable|string|max:255',
            'birthdate' => 'nullable|date',
            'gender' => ['nullable', Rule::in(GenderEnum::values())],
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.required' => 'Nama lengkap wajib diisi.',
            'full_name.string' => 'Nama lengkap harus berupa teks.',
            'full_name.max' => 'Nama lengkap tidak boleh lebih dari 255 karakter.',

            'email.required' => 'Email wajib diisi.',
            'email.string' => 'Email harus berupa teks.',
            'email.email' => 'Email tidak valid.',
            'email.max' => 'Email tidak boleh lebih dari 255 karakter.',
            'email.unique' => 'Email sudah terdaftar.',

            'password.required' => 'Password wajib diisi.',
            'password.confirmed' => 'Password tidak cocok.',
            'password.string' => 'Password harus berupa teks.',
            'password.max' => 'Password tidak boleh lebih dari 255 karakter.',

            'phone_number.required' => 'Nomor telepon wajib diisi.',
            'phone_number.string' => 'Nomor telepon harus berupa teks.',
            'phone_number.min' => 'Nomor telepon harus memiliki minimal 12 karakter.',
            'phone_number.max' => 'Nomor telepon tidak boleh lebih dari 255 karakter.',

            'birthplace.string' => 'Tempat lahir harus berupa teks.',
            'birthplace.max' => 'Tempat lahir tidak boleh lebih dari 255 karakter.',

            'birthdate.date' => 'Tanggal lahir harus berupa tanggal.',

            'gender.in' => 'Jenis kelamin tidak valid.',
        ];
    }
}
