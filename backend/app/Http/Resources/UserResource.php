<?php

namespace App\Http\Resources;

use App\Models\Group;
use App\Models\Story;
use App\Models\SavedPost;
use App\Models\GroupMember;
use Illuminate\Http\Request;
use App\Http\Resources\GroupResource;
use App\Http\Controllers\FriendController;
use App\Models\Post;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Mengambil semua cerita yang dibuat oleh user dalam 24 jam terakhir
        $recentStories = Story::where('created_at', '>=', now()->subDay())
            ->where('user_id', $this->id)
            ->orderBy('created_at', 'asc')
            ->get();

        $allStories = Story::where('user_id', $this->id)->get();
        // Memisahkan story dan caption
        $stories = $recentStories->pluck('story');
        $captions = $recentStories->pluck('caption');

        $groupMembers = GroupMember::where('user_id', $this->id)->get();
        $groupIds = $groupMembers->pluck('group_id');
        $groups = Group::whereIn('id', $groupIds)->get();
        $groupsSimple = $groups->map(function ($group) {
            return [
                'name' => $group->name,
                'profile' => $group->icon
            ];
        });

        $statusResponse = app(FriendController::class)->getFriendStatus($this->id);

        // Ambil data asli dari respons JSON
        $statusData = $statusResponse->getData(true);

        $likes = Post::where('user_id', $this->id)->sum('likes');
        $posts = Post::where('user_id',$this->id)->count();




        return [
            'uuid' => $this->uuid,
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'username' => $this->username,
            'email' => $this->email,
            'profile' => $this->profile,
            'thumbnial' => $this->thumbnial,
            'gender' => $this->gender,
            'relationship' => $this->relationship,
            'address' => $this->address,
            'location' => $this->location,
            'friends_count' => $this->acceptedFriends()->count(),
            'likes_count' => $likes,
            'posts_count' => $posts,
            'posts' => PostResource::collection($this->whenLoaded('posts')),
            'saved_posts' => SavedPostResource::collection($this->whenLoaded('savedPosts')),
            'story' => $stories,
            'story_archived' => $allStories,
            'story_caption' => $captions,
            'status' => $statusData,
            'groups' => $groupsSimple,
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('Y-m-d H:i:s') : null,
        ];
    }
}
