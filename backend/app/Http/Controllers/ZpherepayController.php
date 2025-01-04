<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\ZpherePay;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\ZpherepayRegisterRequest;
use App\Http\Resources\ZpherepayResource;
use App\Models\Purchase;
use App\Models\Topup;
use Twilio\Rest\Client;


class ZpherepayController extends Controller
{


    public function register(ZpherepayRegisterRequest $request)
    {
        $credentials = $request->validated();

        $user = Auth::user();

        if ($user && Hash::check($credentials['password'], $user->password)) {
            // Pastikan nomor telepon belum terdaftar
            $existingAccount = ZpherePay::where('telp', $credentials['telp'])->first();
            if ($existingAccount) {
                return response(['message' => 'Nomor telepon sudah terdaftar di ZpherePay'], 422);
            }

            // Membuat akun ZpherePay baru
            $zpherepay = ZpherePay::create([
                'uuid' => Str::uuid(),
                'user_id' => $user->id,
                'telp' => $credentials['telp'],
            ]);

            return response(['message' => 'Identitas Valid, Buat Pin Anda'], 200);
        }

        return response()->json(['message' => 'Nomor telepon atau password tidak benar'], 422);
    }



    public function setPin(Request $request)
    {
        // Menggunakan user_id untuk mendapatkan ZpherePay
        $zpherepay = ZpherePay::where('user_id', auth()->id())->first();
        $pin = $request->pin;

        // Cek apakah nilai pin diterima
        if (!$pin) {
            return response()->json(['message' => 'PIN tidak ditemukan'], 400);
        }

        if ($zpherepay) {
            // Mengenkripsi PIN sebelum menyimpan
            $zpherepay->pin = bcrypt($pin);
            $zpherepay->save();

            return response()->json(['message' => 'Anda berhasil membuat akun ZpherePay!'], 200);
        }

        return response()->json(['message' => 'Gagal membuat akun ZpherePay!'], 500);
    }


    public function checkPin(Request $request)
    {
        $userId = auth()->id();

        // Ambil objek ZpherePay dari database berdasarkan user_id
        $zpherepay = ZpherePay::where('user_id', $userId)->first();

        // Cek apakah input PIN pengguna cocok dengan hash PIN yang disimpan
        if (!Hash::check($request->pin, $zpherepay->pin)) {
            return response()->json(['message' => "Current Pin doesn't match"], 400);
        }

        return response()->json(['message' => 'Pin is match'], 200);
    }


    public function accountDetail()
    {
        $account = ZpherePay::where('user_id', auth()->id())->with('user')->get();
        if ($account->isNotEmpty()) {
            return ZpherepayResource::collection($account);
        }

        return response()->json(['message' => 'Data Not Found'], 500);
    }

    public function topupUserToken(Request $request)
    {
        $zpherepayId = $request->id;
        $account = ZpherePay::findOrFail($zpherepayId);

        if ($account) {
            $token = Str::random(6);
            $uuid = Str::uuid();

            $topup = Topup::create([
                'uuid' => $uuid,
                'account_id' => $account->id,
                'user_token' => $token,
                'agen' => $request->agen,
                'balance' => $request->balance,
            ]);

            $message = "Zphere ⚡ \n Kode verifikasi untuk topup anda adalah *" . $token . "*";
            $phoneNumber = $account->telp;

            $this->sendWhatsAppMessage($phoneNumber, $message);

            return response()->json(['message' => 'Succesfull send code to your WA', 'uuid' => $uuid], 200);
        }

        return response()->json(['message' => 'Cannot send code to your WA'], 500);
    }



    public function sendWhatsAppMessage($phoneNumber, $message)
    {
        $phone = "+" . $phoneNumber;
        $sid    = env('TWILIO_SID') ;
        $token  = env('TWILIO_TOKEN');
        $twilio = new Client($sid, $token);
        $message = $twilio->messages
            ->create(
                $phone, // to
                array(
                    "from" => env('TWILIO_PHONE'),
                    "body" => $message,
                )
            );
    }



    public function topupAgenToken(Request $request)
    {
        $user_token = $request->code;
        $uuid = $request->uuid;
        $agen_token = Str::random(6);

        $topupRequest = Topup::where(['uuid' => $uuid, 'user_token' => $user_token])->first();

        if ($topupRequest) {
            $topupRequest->agen_token = $agen_token;
            $topupRequest->save();

            // Fungsi sementara jika user berhasil top up di agen dengan menyerahkan uang dan agen token
            $this->topupAgentRequestReceivedAnonym($topupRequest);

            return response()->json(['message' => 'Berhasil mendapatkan agen token', 'agen_token' => $agen_token], 200);
        }

        return response()->json(['message' => 'Agen token tidak berhasil dikirim'], 422);
    }

    public function topupAgentRequestReceivedAnonym($topupRequest)
    {
        $topupRequest->status = '1';
        $topupRequest->save();

        $zpherepay = ZpherePay::where('id', $topupRequest->account_id)->firstOrFail();

        if ($zpherepay->status == 0) {
            $zpherepay->status = '1';
            $zpherepay->verified_at = now();
        }

        $zpherepay->saldo += $topupRequest->balance;
        $zpherepay->save();
    }

    public function customerAccountDetail(Request $request)
    {
        $customerId = $request->id;

        $account = ZpherePay::where('user_id', $customerId)->get();
        if ($account->isNotEmpty()) {
            return ZpherepayResource::collection($account);
        }

        return response()->json(['message' => 'Data Not Found'], 500);
    }

    public function history()
    {
        // Ketika user top up maka saldo bertambah (status 'increase')
        $account = ZpherePay::where('user_id', auth()->id())->first('id');
        // echo "Ini idnya ".$account;
        $topUpHistory = Topup::where(['account_id' => $account->id, 'status' => '1'])
            ->select('agen as identifier', 'balance', 'updated_at')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => uniqid(), // Buat ID manual baru
                    'identifier' => $item->identifier,
                    'balance' => $item->balance,
                    'status' => 'increase', // Karena top-up berarti saldo bertambah
                    'updated_at' => $item->updated_at,
                    'context' => 'Balance Topup' // Tambahkan context 'topup'
                ];
            });

        // Ketika user checkout maka uang berkurang (status 'decrease')
        $purchaseInHistory = Purchase::where('user_id', auth()->id())
            ->where('payment', 'zpherepay')
            ->where('status', '!=', 'canceled_by_user')
            ->where('status', '!=', 'rejected_by_owner')
            ->select('item_id as identifier', 'order_total as balance', 'updated_at')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => uniqid(),
                    'identifier' => $item->identifier,
                    'balance' => $item->balance,
                    'status' => 'decrease', // Karena pembelian berarti saldo berkurang
                    'updated_at' => $item->updated_at,
                    'context' => 'Checkout Item' // Tambahkan context 'checkout'
                ];
            });

        // Ketika user membatalkan checkout (status 'increase')
        $purchaseDecHistory = Purchase::where('user_id', auth()->id())
            ->where('payment', 'zpherepay')
            ->where(function ($query) {
                $query->where('status', 'canceled_by_user')
                    ->orWhere('status', 'rejected_by_owner');
            })
            ->select('item_id as identifier', 'order_total as balance', 'updated_at')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => uniqid(),
                    'identifier' => $item->identifier,
                    'balance' => $item->balance,
                    'status' => 'increase', // Karena pembatalan berarti saldo bertambah
                    'updated_at' => $item->updated_at,
                    'context' => 'Cancel Checkout' // Tambahkan context 'cancel_checkout'
                ];
            });

        // Ketika user mendapatkan pesanan dari user lain (status 'increase')
        $purchaseOwInHistory = Purchase::where('owner_id', auth()->id())
            ->where('payment', 'zpherepay')
            ->where('status', 'order_completed')
            ->where('arrived_confirmed', '1')
            ->select('item_id as identifier', 'order_total as balance', 'updated_at')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => uniqid(),
                    'identifier' => $item->identifier,
                    'balance' => $item->balance,
                    'status' => 'increase', // Karena mendapatkan pesanan berarti saldo bertambah
                    'updated_at' => $item->updated_at,
                    'context' => 'Order Completed' // Tambahkan context 'shops'
                ];
            });

        // Gabungkan semua data
        $history = collect()
            ->merge($topUpHistory)
            ->merge($purchaseInHistory)
            ->merge($purchaseDecHistory)
            ->merge($purchaseOwInHistory)
            ->sortByDesc('updated_at') // Urutkan berdasarkan 'updated_at' yang terbaru
            ->values(); // Reset index array

        return response()->json($history);
    }
}
