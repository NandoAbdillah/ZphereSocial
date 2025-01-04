<?php

namespace App\Http\Controllers;

use App\Events\Message;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    
    
    public function message(Request $request)
    {
        $username = $request->input('username');
        $message = $request->input('message');

        event(new Message($username, $message));

        return response()->json(['status' => 'Message sent successfully']);

    }
}
