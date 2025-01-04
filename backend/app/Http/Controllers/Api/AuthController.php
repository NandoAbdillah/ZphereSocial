<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Group;
use App\Models\Friend;
use App\Mail\VerifyEmail;
use App\Models\GroupMember;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use App\Models\Purchase;
use App\Models\ShopItem;
use App\Models\ZpherePay;
use Fiber;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password;


class AuthController extends Controller
{
    // public function signup(SignupRequest $request)
    // {


    //     $data = $request->validated();
    //     /** @var \App\Models\User $user */

    //     $profile="";
    //     if($data['profile']) {
    //         $profile= $data["profile"]->store("profiles", "public");
    //     }

    //     $thumbnail="";
    //     if($data['thumbnail']) {
    //         $thumbnail = $data['thumbnail']->store("thumbnail", "public");
    //     }


    //     $user = User::create([
    //         'uuid' => Str::uuid(),
    //         'first_name' => $data['first_name'],
    //         'last_name' => $data['last_name'],
    //         'username' => $data['username'],
    //         'email' => $data['email'],
    //         'profile' => $profile ?? "",
    //         'thumbnial' => $thumbnail ?? "",
    //         'gender' => $data['gender'],
    //         'password' => bcrypt($data['password']),
    //     ]);

    //     $token = $user->createToken('main')->plainTextToken;
    //     return response(compact('user', 'token'));
    // }

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        $profile = $data['profile'] ? $data['profile']->store("profiles", "public") : '';
        $thumbnail = $data['thumbnail'] ? $data['thumbnail']->store("thumbnail", "public") : '';

        $verificationToken = mt_rand(100000, 999999);

        $user = User::create([
            'uuid' => Str::uuid(),
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'username' => $data['username'],
            'email' => $data['email'],
            'profile' => $profile,
            'thumbnial' => $thumbnail,
            'nik' => $data['nik'], // Menambahkan NIK ke database
            'dob' => $data['dob'], // Menambahkan tanggal lahir ke database
            'gender' => $data['gender'],
            'password' => bcrypt($data['password']),
            'email_verification_code' => $verificationToken,
        ]);

        try {
            Mail::to($user->email)->send(new VerifyEmail($verificationToken));
        } catch (\Exception $e) {
            return response(['message' => 'Gagal mengirim email verifikasi, coba lagi nanti.'], 500);
        }

        return response(['message' => 'Silahkan cek email untuk verifikasi'], 201);
    }

    public function resendVerificationCode(Request $request)
    {
        $user = User::where([
            'username' => $request->username,
        ])->first();

        if (!$user) {
            return response(['message' => 'User tidak ditemukan'], 404);
        }

        $verificationToken = mt_rand(100000, 999999);
        $user->update(['email_verification_code' => $verificationToken]);

        try {
            Mail::to($user->email)->send(new VerifyEmail($verificationToken));
        } catch (\Exception $e) {
            return response(['message' => 'Gagal mengirim email verifikasi, coba lagi nanti.'], 500);
        }

        return response(['message' => 'Kode verifikasi telah dikirim ulang di email anda'], 200);
    }

    public function verifyEmail($token)
    {
        $user = User::where('email_verification_code', $token)->first();

        if (!$user) {
            return response(['message' => 'Token tidak valid'], 404);
        }

        $user->update([
            'email_verified_at' => now(),
            'email_verification_code' => null
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($user->role === 'user' && $user->email_verified_at) {
            if ($user->is_banned === 0) {
                $token = $user->createToken('main')->plainTextToken;
                return response(compact('user', 'token'));
            } else {
                return response(['message' => 'Your account has been banned '], 500);
            }
        } else if ($user->role === 'admin' && $user->email_verified_at) {
            $token = $user->createToken('main')->plainTextToken;
            return response(compact('user', 'token'));
        } else {
            $verificationToken = mt_rand(100000, 999999);
            $user->update(['email_verification_code' => $verificationToken]);
            Mail::to($user->email)->send(new VerifyEmail($verificationToken));


            return response(['message' => 'You need verificate your email'], 401);
        }
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

    public function deactivate(Request $request)
    {
        $id = auth()->id();
        $user = User::findOrFail($id);

        // Check Incoming Order
        $incomingOrder = Purchase::where('owner_id', $id)
            ->whereNotIn('status', ['rejected_by_owner', 'canceled_by_user', 'order_completed'])
            ->pluck('id');

        // Check ZpherePay Account
        $zpherepayAcc = ZpherePay::where('user_id', $id)->first();
        $accStatus = 'notregist';

        if ($zpherepayAcc) {
            $saldo = (float) $zpherepayAcc->saldo;

            $accStatus = $saldo !== 0.00 ? 'active' : 'nonactive';
        }


        if (sizeof($incomingOrder) == 0 && $accStatus != 'active') {
            try {
                // Find Join Group
                $groupMembers = GroupMember::where('user_id', $id)->get();
                $groupIds = $groupMembers->pluck('group_id');
                $groups = Group::whereIn('id', $groupIds)->get();

                foreach ($groups as $group) {
                    $group->members -= 1;
                    $group->save();

                    GroupMember::where([
                        'user_id' => $id,
                        'group_id' => $group->id,
                    ])->delete();
                }

                // Find Friends
                $FriendFromMyRequest = Friend::where([
                    'user_id' => $id,
                    'status' => 'accepted'
                ])->pluck('friend_id');

                $FriendFromMyConfirm = Friend::where([
                    'friend_id' => $id,
                    'status' => 'accepted'
                ])->pluck('user_id');

                $friendIds = $FriendFromMyRequest->merge($FriendFromMyConfirm)->unique();

                foreach ($friendIds as $friendId) {
                    Friend::findOrFail($friendId)->delete();
                }

                // Find ShopItem
                $shops = ShopItem::where('user_id', $id)->pluck('id');
                foreach ($shops as $shop) {
                    ShopItem::findOrFail($shop)->delete();
                }

                // Delete ZpherePay if nonactive
                if ($accStatus == 'nonactive') {
                    $zpherepayAcc->delete();
                }


                auth()->user()->currentAccessToken()->delete(); // Hapus token

                $user->delete();

                return response()->json(['message' => 'Successfully deactivated account'], 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'An error occurred: ' . $th->getMessage()], 500);
            }
        } else {
            return response()->json([
                'message' => "Can't deactivate because you still have incoming orders or an active ZpherePay account"
            ], 422);
        }
    }
}
