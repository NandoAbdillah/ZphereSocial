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

class UserPublicResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {


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
            'thumbnial' => $this->thumbnial,
            'gender' => $this->gender,
            'location' => $this->location,
            'relationship' => $this->relationship,
            'status' => $statusData,
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('Y-m-d H:i:s') : null,
        ];
    }
}
