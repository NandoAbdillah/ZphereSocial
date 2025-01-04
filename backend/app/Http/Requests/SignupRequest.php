<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // First name and last name should be alphabets only
            'first_name' => 'required|string|max:255|regex:/^[a-zA-Z]+$/',
            'last_name' => 'required|string|max:255|regex:/^[a-zA-Z]+$/',

            // Username should allow only letters, numbers, and limited symbols like underscore or dot
            'username' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-zA-Z0-9._]+$/',
                'unique:' . User::class,
            ],

            // Optional email field
            'email' => 'required|string|email|max:255',

            // NIK validation - must be 16 digits
            'nik' => 'required|string',

            // Date of Birth validation - user must be at least 15 years old
            'dob' => 'required|date' ,

            // Optional phone number field (unique)
            'tel' => 'sometimes|string|max:255|unique:users,mobile',

            // Optional image uploads (profile and thumbnail)
            'profile' => 'sometimes|image|mimes:png,jpg,jpeg|max:1024',
            'thumbnail' => 'sometimes|image|mimes:png,jpg,jpeg|max:1024',

            // Gender is required
            'gender' => 'required',

            // Password validation with required complexity: at least one lowercase, one uppercase, one number, and one symbol
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->mixedCase()   // Require both uppercase and lowercase
                    ->numbers()     // Require at least one number
                    ->symbols()     // Require at least one symbol
            ],
        ];
    }
}
