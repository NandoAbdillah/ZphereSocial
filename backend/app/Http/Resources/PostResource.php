<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        $user = Auth::user();

        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'user' => new PostUserResource($this->whenLoaded('user')), //user adalah fungsi di folder model yang merupakan hasil dari relasi 
            'content' => $this->content,
            'status' => $this->status,
            'likes' => $this->likes,
            'comments' => $this->comments,
            'is_page_post' => $this->is_page_post,
            'page_id' => $this->page_id,
            'is_group_post' => $this->is_group_post,
            'group_id' => $this->group_id,
            'group_detail' => new PostGroupResource($this->whenLoaded('group')),
            'media' => PostMediaResource::collection($this->whenLoaded('media')),//sama dengan user
            'created_at' => $this->created_at->toDateTimeString(),
            'liked' => $this->likes()->where('user_id', $user->id)->exists(), // Tambahkan ini
            'saved' => $this->saves()->where('user_id', $user->id)->exists(), // Tambahkan ini
            'comment' => CommentResource::collection($this->whenLoaded('commentss'))
        ];
    }
}
