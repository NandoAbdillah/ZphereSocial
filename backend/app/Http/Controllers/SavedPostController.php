<?php

namespace App\Http\Controllers;

use App\Models\SavedPost;
use Illuminate\Http\Request;
use App\Http\Resources\SavedPostResource;
use App\Http\Requests\StoreSavedPostRequest;
use App\Http\Requests\UpdateSavedPostRequest;

class SavedPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookmarks = SavedPost::where('user_id',auth()->id())
            ->with('post.user')
            ->with('post.media')
            ->paginate(8);

        return SavedPostResource::collection($bookmarks)
            ->additional([
                'meta' => [
                    'current_page' => $bookmarks->currentPage(),
                    'last_page' => $bookmarks->lastPage(),
                    'per_page' => $bookmarks->perPage(),
                    'total' => $bookmarks->total(),
                ]
            ]);
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
    // public function store(StoreSavedPostRequest $request)
    // {
    //     //
    // }

    public function store(Request $request) {
        $postId = $request->post_id;
        $userId = auth()->id();


        // Create a new like
        SavedPost::create([
            'post_id' => $postId,
            'user_id' => $userId,
        ]);

        return response()->json(['message' => 'Added to bookmarks'], 200);
    }
    public function remove(Request $request) {
        $postId = $request->post_id;
        $userId = auth()->id();


        // Create a new like
        $saved = SavedPost::where([
            'post_id' => $postId,
            'user_id' => $userId,
        ])->first();
        $saved->delete();

        return response()->json(['message' => 'Removed from bookmarks'], 200);
    }

    
    /**
     * Display the specified resource.
     */
    public function show(SavedPost $savedPost)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SavedPost $savedPost)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSavedPostRequest $request, SavedPost $savedPost)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SavedPost $savedPost)
    {
        //
    }
}
