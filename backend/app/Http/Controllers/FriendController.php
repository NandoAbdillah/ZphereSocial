<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Friend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use App\Http\Resources\FriendResource;
use App\Http\Requests\StoreFriendRequest;
use App\Http\Requests\UpdateFriendRequest;
use App\Models\Notification;

class FriendController extends Controller
{
    public function getFriendStatus($user_id)
    {


        $receiver = Friend::where([
            "user_id" => $user_id,
            "friend_id" => auth()->id(),
        ])->first()->status ?? "";

        $sender = Friend::where([
            "user_id" => auth()->id(),
            "friend_id" => $user_id,
        ])->first()->status ?? null;

        $status = null;
        $role = null;

        if ($receiver) {
            $role =  "receiver";
            $status = $receiver;
        }
        if ($sender) {
            $role =  "sender";
            $status = $sender;
        }

        return response()->json(['status' => $status, 'role' => $role]);
    }

    public function getPendingFriend()
    {
        $pending_friends = Friend::where([
            "friend_id" => auth()->id(),
            "status" => "pending"
        ])->with('user')->get();

        return FriendResource::collection($pending_friends);
    }
    public function getAcceptedFriend()
    {
        $accepted_friends = Friend::where([
            "friend_id" => auth()->id(),
            "status" => "accepted"
        ])->with('user')->paginate(3);

        return FriendResource::collection($accepted_friends)
            ->additional([
                'meta' => [
                    'current_page' => $accepted_friends->currentPage(),
                    'last_page' => $accepted_friends->lastPage(),
                    'per_page' => $accepted_friends->perPage(),
                    'total' => $accepted_friends->total(),
                ]
            ]);
    }

    public function myFriends(Request $request)
    {
        $uuid = $request->uuid;
        $user = User::where('uuid', $uuid)->firstOrFail();
        $user_id = $user->id;


        $FriendFromMyRequest = Friend::where([
            'user_id' => $user_id,
            "status" => "accepted"
        ])->pluck('friend_id');

        $FriendFromMyConfirm = Friend::where([
            "friend_id" => $user_id,
            "status" => "accepted"
        ])->pluck('user_id');

        // Menggabungkan kedua koleksi ID
        $friendIds = $FriendFromMyRequest->merge($FriendFromMyConfirm)->unique();

        // Mengambil data pengguna berdasarkan ID-ID tersebut
        $friends = User::whereIn('id', $friendIds)->get();

        // Mengembalikan sebagai koleksi UserResource
        return UserResource::collection($friends);
    }

    /**
     * Add a new friend request.
     */
    public function addFriend(Request $request, $user_id)
    {

        $status = Friend::where([
            'user_id' => auth()->id(),
            'friend_id' => $user_id,
        ])->first();

        $user = User::find($user_id);

        // Create a new friend request
        if (!$status) {
            Friend::create([
                'user_id' => auth()->id(),
                'friend_id' => $user_id,
                'status' => 'pending',
            ]);

            Notification::create([
                'user_id' => auth()->id(),
                'receiver_id' => $user_id,
                'context' => 'add_friend',
                'type' => 'requests',
                'url' => "/friends/".$user->uuid."/accept",
                'message' => "@" . $user->username . " wants to be friend with you",
            ]);
            return response()->json(['message' => 'Friend request sent successfully']);
        }

        return response()->json(['message' => 'Friend request already sent'], 404);
    }


    /**
     * Accept a friend request.
     */
    public function acceptFriend(Request $request, $friend_id)
    {
        
        $friend = Friend::where(['user_id' => $friend_id, 'friend_id' => auth()->id()])->where('status', 'pending')->first();

        $user = User::find(auth()->id())->first();
        Notification::create([
            'user_id' => auth()->id(),
            'receiver_id' => $friend_id,
            'context' => 'confirm_friend',
            'type' => 'requests',
            'url' => "http://localhost:3000/user/". $user->uuid,
            'message' => "@".$user->username." confirm your friend request",
        ]);

        // Update the friend request status to accepted
        if ($friend) {
            $friend->status = 'accepted';
            $friend->save();
            return response()->json(['message' => 'Friend request accepted successfully']);
        }

        return response()->json(['message' => 'Friend request not found'], 404);
    }

    /**
     * Remove a friend.
     */
    public function removeFriend(Request $request, $friend_id)
    {


        if ($friend_id) {
            Friend::where([
                "user_id" => auth()->id(),
                "friend_id" => $friend_id,
            ])->first()->delete();

            Notification::where([
                "user_id" => auth()->id(),
                "receiver_id" => $friend_id,
                "context" => "add_friend",
            ])->first()->delete();
            return response()->json(['message' => 'Friend request canceled successfully']);
        }


        return response()->json(['message' => 'Friend not found'], 404);
    }
}
