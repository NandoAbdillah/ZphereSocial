<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use App\Models\ZpherePay;
use Illuminate\Http\Request;

class ZpherepaysController extends Controller
{
    public function index()
    {
        $zpherepays = ZpherePay::all(); // Mengambil semua pengguna
        return response()->json($zpherepays);
    }
}
