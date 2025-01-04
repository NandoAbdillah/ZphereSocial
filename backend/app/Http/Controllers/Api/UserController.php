<?php

namespace App\Http\Controllers\Api;


use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Validation\Rules\Password;
use App\Http\Resources\UserPublicResource;
use App\Http\Requests\UpdatePasswordRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::where('id', '!=', auth()->id())
            ->paginate(16);

        return UserPublicResource::collection($users)
            ->additional([
                'meta' => [
                    'current_page' => $users->currentPage(),
                    'last_page' => $users->lastPage(),
                    'per_page' => $users->perPage(),
                    'total' => $users->total(),
                ]
            ]);
    }

    public function searchUser(Request $request)
    {
        $search = $request->input('search', '');

        $users = User::where('id', '!=', auth()->id())
            ->where(function ($query) use ($search) {
                $query->where("first_name", "like", "%" . $search . "%")
                    ->orWhere("last_name", "like", "%" . $search . "%")
                    ->orWhere("username", "like", "%" . $search . "%");
            })
            ->get();

        return UserPublicResource::collection($users);
    }




    public function profile(Request $request)
    {
        $uuid = $request->uuid;

        $user = User::where('uuid', $uuid)
            ->with(['posts' => function ($query) {
                $query->with(['media', 'commentss'])
                    ->orderBy('created_at', 'desc'); // Urutkan berdasarkan tanggal dibuat secara descending
            }])->with(['savedPosts.post'])
            ->firstOrFail();

        // Kembalikan data pengguna sebagai UserResource
        return new UserResource($user);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(UpdateUserRequest $request, User $user)
    // {
    //     $data = $request->validated();

    //     if (isset($data['password'])) {
    //         $data['password'] = bcrypt(($data['password']));
    //     }

    //     $user->update($data);

    //     return new UserResource($user);
    // }

    public function changePassword(UpdatePasswordRequest $request)
    {
        // $request->validate([
        //     'current_password' => 'required',
        //     'new_password' => 'required|confirmed',
        //     'confirm_new_password' => 'required'
        // ]);

        $data = $request->validated();

        $userId = auth()->id();

        // Ambil objek pengguna dari database
        $user = User::findOrFail($userId);

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => "Current Password doesn't match"], 400);
        }

        $user->password = bcrypt($request->new_password);

        $user->save();

        return response()->json(['message' => 'Password Successfully Changed']);
    }

    // public function forgotPassword(Request $request)
    // {
    //     $request->validate([
    //         'email' => 'required',
    //         'otp' => 'required|confirmed',
    //     ]);

    //     $data = $request->validated();

    //     $userId = auth()->id();

    //     // Ambil objek pengguna dari database
    //     $user = User::findOrFail($userId);

    //     if (!Hash::check($request->current_password, $user->password)) {
    //         return response()->json(['message' => "Current Password doesn't match"], 400);
    //     }

    //     $user->password = bcrypt($request->new_password);

    //     $user->save();

    //     return response()->json(['message' => 'Password Successfully Changed']);
    // }

    public function otpEmail (Request $request) {

    }

    public function update(UpdateUserRequest $request, User $user)
    {


        $userId = auth()->id();

        // Ambil objek pengguna dari database
        $user = User::findOrFail($userId);

        $data = $request->validated();


        // Periksa dan simpan file profile jika ada
        if (isset($data['profile'])) {
            if ($user->profile) {
                Storage::disk('public')->delete($user->profile);
            }
            $data['profile'] = $data['profile']->store('profiles', 'public');
        }

        // Periksa dan simpan file thumbnail jika ada
        if (isset($data['thumbnial'])) {
            if ($user->thumbnial) {
                Storage::disk('public')->delete($user->thumbnial);
            }
            $data['thumbnial'] = $data['thumbnial']->store('thumbnail', 'public');
        }

        // Perbarui user dengan data yang sudah divalidasi
        $user->update($data);


        return new UserResource($user);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response("", 204);
    }
}
