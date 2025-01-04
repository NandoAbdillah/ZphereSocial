<?php

namespace App\Http\Controllers\AdminController;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::all(); // Mengambil semua pengguna
        return response()->json($users);
    }

    // app/Http/Controllers/UserController.php

    public function ban($userId)
    {
        $user = User::find($userId);
        $user->is_banned = 1;
        $user->save();

        return response()->json(['message' => 'User has been banned']);
    }

    public function unban($userId)
    {
        $user = User::find($userId);
        $user->is_banned = 0;
        $user->save();

        return response()->json(['message' => 'User has been unbanned']);
    }
}
