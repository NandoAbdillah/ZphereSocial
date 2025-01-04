<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStoryRequest extends FormRequest
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
            'story' => 'nullable|array', // Maksimal 100 MB
            'story.*' => 'required|mimetypes:image/*,video/*|max:102400', // Maksimal 100 MB
            'caption' => 'sometimes',
        ];
    }
}
