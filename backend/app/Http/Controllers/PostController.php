<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use App\Models\Friend;
use App\Models\PostMedia;
use App\Models\GroupMember;
use Illuminate\Support\Str;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Group;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    public function index()
    {
        $posts = Post::with(['media', 'user', 'group'])
            ->orderBy('created_at', 'desc')
            ->paginate(3);
        return PostResource::collection($posts)
            ->additional([
                'meta' => [
                    'current_page' => $posts->currentPage(),
                    'last_page' => $posts->lastPage(),
                    'per_page' => $posts->perPage(),
                    'total' => $posts->total(),
                ]
            ]);;
    }



    public function single(Request $request)
    {
        $uuid = $request->uuid;
        $posts = Post::where("uuid", $uuid)
            ->with(["media", "user", "commentss.user",])
            ->get();

        return PostResource::collection($posts); // Mengubah koleksi menjadi PostResource
    }

    public function videos(Request $request)
    {
        $posts = Post::whereHas('media', function ($query) {
            $query->where('file_type', 'video');
        })->with(['media', 'user', 'group'])
            ->orderBy('created_at', 'desc')
            ->paginate(10); // Menambahkan paginate

        return PostResource::collection($posts)
            ->additional([
                'meta' => [
                    'current_page' => $posts->currentPage(),
                    'last_page' => $posts->lastPage(),
                    'per_page' => $posts->perPage(),
                    'total' => $posts->total(),
                ]
            ]);
    }

    public function edit(Request $request)
    {
        // Validasi input
        $request->validate([
            'content' => 'required|string|max:255',
            'id' => 'required|integer|exists:posts,id',
        ]);

        // Ambil data dari request
        $content = $request->content;
        $id = $request->id;

        // Temukan post berdasarkan ID
        $post = Post::findOrFail($id);

        // Perbarui caption
        $post->content = $content;

        // Simpan perubahan
        $post->save();

        // Berikan respon, misalnya redirect kembali dengan pesan sukses
        return response()->json([
            'message' => 'Post edited successfully!'
        ], 200);
    }

    public function delete(Request $request)
    {
        $id = $request->post_id;

        // Temukan post berdasarkan ID
        $post = Post::findOrFail($id);

        $post->delete();
        // Berikan respon, misalnya redirect kembali dengan pesan sukses
        return response()->json([
            'message' => 'Post deleted successfully!'
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $data = $request->validated();

        try {
            // creating post
            $uuid = Str::uuid();
            $post = Post::create([
                "uuid" => $uuid,
                "user_id" => auth()->id(),
                "content" => $data['content'],
                "is_group_post" => $data['is_group_post'] ?? 0,
                "group_id" => $data['group_id'] ?? null,
            ]);



            // if post his media
            $images = [];
            if (isset($data['image'])) {
                foreach ($data['image'] as  $image) {
                    $images[]  = $image->store("posts/images", "public");
                }

                PostMedia::create([
                    "post_id" => $post->id,
                    "file_type" => "image",
                    "file" => json_encode($images),
                    "position" => "general",
                ]);
            }

            $video_file_name = "";
            if (isset($data['video'])) {
                $video_file_name  = $data['video']->store("posts/video", "public");

                PostMedia::create([
                    "post_id" => $post->id,
                    "file_type" => "video",
                    "file" => $video_file_name,
                    "position" => "general",
                ]);
            }

            $audio_file_name = "";
            if (isset($data['audio'])) {
                $audio_file_name = $data['audio']->store("posts/audio", "public");
                PostMedia::create([
                    "post_id" => $post->id,
                    "file_type" => "audio",
                    "file" => $audio_file_name,
                    "position" => "general",
                ]);
            }

            $user = User::find(auth()->id());

            if (isset($data['is_group_post']) && isset($data['group_id'])) {
                // Mengirim Notifikasi ke semua group member 
                $group = Group::find($data['group_id']);
                $members = GroupMember::where('group_id', $data['group_id'])->pluck('user_id');
                foreach ($members as $member) {
                    Notification::create([
                        'user_id' => auth()->id(),
                        'receiver_id' => $member,
                        'context' => 'group_newpost',
                        'type' => 'groups',
                        'url' => "http://localhost:3000/single-post/" . $uuid,
                        'message' => "@" . $user->username . " posted a new post on " . $group->name,
                    ]);
                }
            } else {
                //  Mengirim Notifikasi hanya ke pengikut
                $FriendFromMyRequest = Friend::where([
                    'user_id' => auth()->id(),
                    'status' => 'accepted'
                ])->pluck('friend_id');

                $FriendFromMyConfirm = Friend::where([
                    'friend_id' => auth()->id(),
                    'status' => 'accepted'
                ])->pluck('user_id');

                $friendIds = $FriendFromMyRequest->merge($FriendFromMyConfirm)->unique();


                foreach ($friendIds as $friendId) {
                    Notification::create([
                        'user_id' => auth()->id(),
                        'receiver_id' => $friendId,
                        'context' => 'posted_newpost',
                        'type' => 'friends',
                        'url' => "http://localhost:3000/single-post/" . $uuid,
                        'message' => "@" . $user->username . " posted a new post",
                    ]);
                }
            }

            return response()->json([
                'message' => 'Post uploaded successfully!'
            ], 200);
        } catch (\Throwable $th) {

            return response()->json([
                'message' => 'There was an error uploading the post!'
            ], 500);
        }
    }



    public function like(Request $request)
    {
        $postId = $request->post_id;
        $userId = auth()->id();

        // Check if the user already liked the post
        $like = Like::where([
            'post_id' => $postId,
            'user_id' => $userId,
        ])->first();

        if ($like) {
            return response()->json(['message' => 'Already liked'], 400);
        }

        // Create a new like
        Like::create([
            'post_id' => $postId,
            'user_id' => $userId,
        ]);

        $post = Post::find($postId);
        $user = User::find($post->user_id);
        $auth = User::find(auth()->id());
        
        Notification::create([
            'user_id' => auth()->id(),
            'receiver_id' => $user->id,
            'context' => 'like_post',
            'type' => 'posts',
            'url' => "http://localhost:3000/single-post/". $post->uuid,
            'message' => "@" . $auth->username . " like your post ",
        ]);

        // Increment the like count on the post
        $post = Post::find($postId);
        $post->increment('likes');

        return response()->json(['message' => 'Liked successfully'], 200);
    }

    public function dislike(Request $request)
    {
        $postId = $request->post_id;
        $userId = auth()->id();

        // Check if the user liked the post
        $like = Like::where([
            'post_id' => $postId,
            'user_id' => $userId,
        ])->first();

        if (!$like) {
            return response()->json(['message' => 'Not liked yet'], 400);
        }

        // Remove the like
        $like->delete();

        // Decrement the like count on the post
        $post = Post::find($postId);
        $post->decrement('likes');

        return response()->json(['message' => 'Disliked successfully'], 200);
    }
}
