<?php

namespace App\Http\Resources;

use App\Models\Story;
use Illuminate\Http\Request;
use App\Http\Controllers\FriendController;
use Illuminate\Http\Resources\Json\JsonResource;

class UserStoryResource extends JsonResource
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


        $statusResponse = app(FriendController::class)->getFriendStatus($this->id);

        // Ambil data asli dari respons JSON
        $statusData = $statusResponse->getData(true);





        return [
            'uuid' => $this->uuid,
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'username' => $this->username,
            'profile' => $this->profile,
            'story' => $stories,
            'story_archived' => $allStories,
            'story_caption' => $captions,
            'status' => $statusData,
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('Y-m-d H:i:s') : null,
        ];
    }
}
