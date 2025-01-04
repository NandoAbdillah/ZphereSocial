<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . auth()->id(),
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . auth()->id(),
            'profile' => 'sometimes|image|mimes:png,jpg,jpeg|max:1024',
            'thumbnial' => 'sometimes|image|mimes:png,jpg,jpeg|max:1024',
            'gender' => 'required|string',
            'relationship' => 'required|string',
            'address' => 'nullable|string',
            'location' => 'nullable|string',


        ];
    }
}
