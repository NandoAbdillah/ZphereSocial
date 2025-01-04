<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use App\Models\ZphereLibraries;
use Illuminate\Http\Request;

class BooksController extends Controller
{
    public function index()
    {
        $libraries = ZphereLibraries::all(); // Mengambil semua pengguna
        return response()->json($libraries);
    }
}
