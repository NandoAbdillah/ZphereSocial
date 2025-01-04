<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreShopItemRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    // StoreShopItemRequest.php
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
