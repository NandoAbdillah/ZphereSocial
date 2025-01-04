<?php

namespace App\Http\Resources;

use App\Models\GroupMember;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupResource extends JsonResource
{
   
    public function toArray(Request $request): array
    {

        $groupMember = GroupMember::where('group_id', $this->id)->with('user')->paginate(9);

        $members = GroupMember::where('group_id', $this->id)->pluck('user_id');
        $likes = Post::where('group_id', $this->id)->whereIn('user_id', $members)->get('likes');
        $totalLikes = null;

        foreach ($likes as $like) {
            $totalLikes += (int) $like->likes;
        }

        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'name' => $this->name,
            'location' => $this->location,
            'type' => $this->type,
            'icon' => $this->icon,
            'description' => $this->description,
            'thumbnail' => $this->thumbnail,
            'members' => $this->members, 
            'postsCount' => $this->posts_count, 
            'isMember' => $this->isMember,
            'admin' => new MembersGroupResource($this->whenLoaded('user')),
            'groupMember' => GroupMemberResource::collection($groupMember),
            'likes' => $totalLikes,
            'posts' => PostResource::collection($this->whenLoaded('posts')),

        ];
    }
}

