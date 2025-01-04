<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    
    public function rules(): array
    {
        return [
            "content" => "required|string",
            "image" => "nullable|array", // Contoh: Gambar opsional (array)
            "image.*" => "image|mimes:jpeg,png|max:51200", // Validasi setiap file gambar
            "video" => "nullable|file|mimes:mp4|max:102400", // Video opsional (maksimal 10 MB)
            "audio" => "nullable|file|mimes:mp3,wav|max:5120", // Audio opsional (maksimal 5 MB)
            "is_group_post" => "nullable|boolean",
            "group_id" => "nullable|integer",
   
        ];
    }
}
