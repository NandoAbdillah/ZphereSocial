<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateShopItemRequest extends FormRequest
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

            "item" => "string|required",
            "stock" => "integer|required", // Menggunakan integer untuk stock
            "category" => "string|required",
            "picture" => "nullable|array",
            "picture.*" => "image|mimes:png,jpeg",
            "description" => "string|required",
            "price" => "numeric|required" // Menggunakan numeric untuk price

        ];
    }
}
