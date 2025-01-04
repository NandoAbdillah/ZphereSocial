<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePurchaseRequest extends FormRequest
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
            'owner_id' => 'required',
            'item_id' => 'required',
            'cart_id' => 'required',
            'order_name' => 'required|string',
            'order_total'=>'required',
            'subtotal' => 'required',
            'shipping' => 'required',
            'total_pays' => 'required',
            'postal_code' => 'required',
            'messages' => 'required|string|max:225',
            'payment' => 'required',
            'specific_location' => 'required',
            'total_item' => 'required',

        ];
    }
}
