<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ZphereLibraries;
use App\Http\Requests\CreateBookRequest;
use App\Http\Resources\BooksResource;
use App\Models\User;

class LibrariesController extends Controller
{

    public function index()
    {
        // $books = ZphereLibraries::whereNotIn('user_id', [auth()->id()])->paginate(8);

        $books = ZphereLibraries::with('user')->paginate(8);

        return BooksResource::collection($books)
            ->additional([
                'meta' => [
                    'current_page' => $books->currentPage(),
                    'last_page' => $books->lastPage(),
                    'per_page' => $books->perPage(),
                    'total' => $books->total(),
                ]
            ]);
    }

    public function userBooks(Request $request)
    {
        $userUuid = $request->userUuid;
        $user = User::where('uuid', $userUuid)->first();
        $id = $user->id;
        $books = ZphereLibraries::where('user_id', $id)->with('user')->get();

        return BooksResource::collection($books);
    }

    public function create(CreateBookRequest $request)
    {
        $data = $request->validated();

        try {
            $thumbnail  = $data['thumbnail']->store("libraries/thumbnails", "public");
            $content = $data['content']->store("libraries/books", "public");

            $library = ZphereLibraries::create([
                'uuid' => Str::uuid(),
                'user_id' => auth()->id(),
                'title' => $data['title'],
                'thumbnail' => $thumbnail,
                'genre' => $data['category'],
                'synopsis' => $data['synopsis'],
                'description' => $data['description'],
                'content' => $content,
            ]);

            return response()->json([
                'message' => 'Book uploaded successfully!'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error ' . $th->getMessage()
            ], 500);
        }
    }

    public function singleBook(Request $request)
    {
        $bookId = $request->id;
        try {
            $book = ZphereLibraries::where('id', $bookId)->get();

            return BooksResource::collection($book);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'buku tidak dapat dimuat' . $th->getMessage()], 500);
        }
    }
}
