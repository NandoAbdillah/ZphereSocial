<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;

class GroupsController extends Controller
{
    public function index()
    {
        $groups =Group::all(); // Mengambil semua pengguna
        return response()->json($groups);
    }
}
