<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreCommentRequest $request)
    {
        $data = $request->validated();

        try {
            Comment::firstOrCreate([
                "post_id" => $data['post_id'],
                "comment" => $data['comment'],
                "user_id" => auth()->id()
            ]);
            $post = Post::findOrFail($data['post_id']);
            $post->comments += 1;
            $post->save();
            DB::commit();

        $user = User::find($post->user_id);
        $auth = User::find(auth()->id());
        $comment = substr($data['comment'], 0, 25);
        Notification::create([
            'user_id' => auth()->id(),
            'receiver_id' => $user->id,
            'context' => 'comment_post',
            'type' => 'posts',
            'url' => "http://localhost:3000/single-post/". $post->uuid,
            'message' => "@" . $auth->username . " comment on your post \"". $comment ."\"",
        ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $comment_id = $request->comment_id;

        $comment = Comment::where('id', $comment_id)->firstOrFail();
        $post = Post::where('id', $comment->post_id)->firstOrFail();

        if($comment)
        {
            $post->decrement('comments');
            $comment->delete();
            
        }

        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }
}
