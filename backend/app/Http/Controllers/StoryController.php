<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Models\Friend;
use App\Http\Resources\StoryResource;
use App\Http\Requests\StoreStoryRequest;
use App\Http\Requests\UpdateStoryRequest;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {


    //     $stories = Story::with(['user'])->where("created_at", ">=", now()->subDay())->latest()->get()->unique("user_id");
    //     return StoryResource::collection($stories);
    // }

    public function index()
    {
        // Mengambil ID teman dari permintaan saya
        $FriendFromMyRequest = Friend::where([
            'user_id' => auth()->id(),
            "status" => "accepted"
        ])->pluck('friend_id');

        // Mengambil ID teman dari konfirmasi saya
        $FriendFromMyConfirm = Friend::where([
            "friend_id" => auth()->id(),
            "status" => "accepted"
        ])->pluck('user_id');

        // Menggabungkan kedua koleksi ID dan memastikan tidak ada duplikat
        $friendIds = $FriendFromMyRequest->merge($FriendFromMyConfirm)->unique();

        // Tambahkan ID pengguna yang sedang login ke dalam daftar friendIds
        $friendIds->push(auth()->id());

        // Mengambil cerita dari teman-teman yang ID-nya ada di friendIds termasuk cerita milik auth()->id()
        $stories = Story::with(['user'])
            ->whereIn('user_id', $friendIds)  // Filter berdasarkan user_id teman dan diri sendiri
            ->where("created_at", ">=", now()->subDay())
            ->latest()
            ->get()
            ->unique("user_id");

        return StoryResource::collection($stories);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStoryRequest $request)
    {
        $data = $request->validated();

        // Periksa jumlah cerita yang diunggah oleh pengguna dalam 24 jam terakhir
        $userStoryCount = Story::where('user_id', auth()->id())
            ->where('created_at', '>=', now()->subDay())
            ->count();

        if ($userStoryCount >= 4) {
            return response()->json([
                'message' => 'Exceeds the daily maximum limit, you can only upload 4 stories per 24 hours!'
            ], 403);
        }

        $stories = [];
        foreach ($data['story'] as $story) {
            $stories[] = $story->store("stories", 'public');
        }

        try {
            // creating post
            $postStory = Story::create([
                "user_id" => auth()->id(),
                "story" => json_encode($stories),
                "caption" => $data['caption'] ?? " ",
                "status" => 1,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'There was an error uploading the story!'
            ], 500);
        }

        return response()->json([
            'message' => 'Story uploaded successfully!'
        ], 200);
    }



    /**
     * Display the specified resource.
     */
    public function show(Story $story)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Story $story)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStoryRequest $request, Story $story)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Story $story)
    {
        //
    }
}
