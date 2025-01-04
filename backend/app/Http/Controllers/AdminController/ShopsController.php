<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use App\Models\ShopItem;
use Illuminate\Http\Request;

class ShopsController extends Controller
{
    public function index()
    {
        $zpherepays = ShopItem::all(); // Mengambil semua pengguna
        return response()->json($zpherepays);
    }
}
