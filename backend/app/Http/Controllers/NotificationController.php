<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Http\Requests\StoreNotificationRequest;
use App\Http\Requests\UpdateNotificationRequest;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = Notification::where('receiver_id', auth()->id())->with('user')->orderByDesc('created_at')->get(); // Mengambil semua pengguna
        return response()->json([
            "message" => "successfully get user notifications",
            "data" => $notifications
        ], 200);
    }

   
}
