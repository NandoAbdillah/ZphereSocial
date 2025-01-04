<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Purchase;
use App\Models\ShopItem;
use App\Models\ZpherePay;
use App\Models\Notification;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\PurchaseResource;
use App\Http\Requests\StorePurchaseRequest;
use App\Http\Resources\PurchasePublicResource;

class PurchaseController extends Controller
{
    public function store(StorePurchaseRequest $request)
    {
        $data = $request->validated();
        $user_id = Auth::id();

        try {
            Log::info('Store Purchase Request Data: ', $data); // Logging data yang diterima


            $item = ShopItem::where('id', $data['item_id'])->where('stock', '>', 0)->where(['available' => '1', 'deleted' => '0'])->first();

            if ($item) {
                $purchase = Purchase::create([
                    'owner_id' => $data['owner_id'],
                    'user_id' => $user_id,
                    'item_id' => $data['item_id'],
                    'order_name' => $data['order_name'],
                    'total_item' => $data['total_item'],
                    'messages' => $data['messages'],
                    'payment' => $data['payment'],
                    'subtotal' => $data['subtotal'],
                    'shipping' => $data['shipping'],
                    'total_pays' => $data['total_pays'],
                    'order_total' => $data['order_total'],
                    'specific_location' => $data['specific_location'],
                    'postal_code' => $data['postal_code'],
                ]);

                $item->stock = $item->stock - (int) $data['total_item'];
                $item->save();

                if ($purchase) {
                    $cart = ShoppingCart::find($data['cart_id']);
                    if ($cart) {
                        $cart->delete();
                        Log::info('Cart deleted successfully: ', ['cart_id' => $data['cart_id']]);
                    } else {
                        Log::warning('Cart not found for deletion: ', ['cart_id' => $data['cart_id']]);
                    }
                }

                if ($data['payment'] == 'zpherepay') {
                    $zpherepay = ZpherePay::where('user_id', $user_id)->first();

                    if ($zpherepay) {
                        $zpherepay->saldo = $zpherepay->saldo - floatval($data['total_pays']);
                        $zpherepay->save();
                    }
                }

                $item = ShopItem::find($data['item_id']);
                $user = User::find(auth()->id());

                Notification::create([
                    'user_id' => auth()->id(),
                    'receiver_id' => $data['owner_id'],
                    'context' => 'newcheckout',
                    'type' => 'shops',
                    'url' => "",
                    'message' => "@" . $user->username . " ordered your product \"" . $item->item . "\"",

                ]);


                return response()->json(['message' => 'Checkout successful', 'purchase' => $purchase], 201);
            } else {
                return response()->json(['message' => 'Stok Item Habis'], 500);
            }
        } catch (\Throwable $th) {
            Log::error('Checkout Error: ' . $th->getMessage()); // Logging error yang terjadi
            return response()->json(['message' => 'Tidak dapat checkout barang', 'error' => $th->getMessage()], 500);
        }
    }


    public function checkout()
    {

        try {
            $checkoutItem = Purchase::where('user_id', auth()->id())->get();

            return PurchasePublicResource::collection($checkoutItem);
        } catch (\Throwable $th) {
            return response()->json(['message' => "error " . $th->getMessage()], 500);
        }
    }

    public function incomingOrder()
    {
        try {
            $incomingOrder = Purchase::where('owner_id', auth()->id())->where('status', '!=', 'order_completed')->get();

            return PurchasePublicResource::collection($incomingOrder);
        } catch (\Throwable $th) {

            return response()->json(['message' => "error " . $th->getMessage()], 500);
        }
    }

    public function incomingOrders()
    {
        try {

            $incomingOrders = Purchase::where('owner_id', auth()->id())->where('status', '!=', 'order_completed')->with(['item', 'user'])->get();

            return  PurchaseResource::collection($incomingOrders);
        } catch (\Throwable $th) {
        }
    }

    public function orderCompletedConfirmed()
    {
        try {

            $completedOrders = Purchase::where(['owner_id' => auth()->id(), 'status' => 'order_completed'])->with(['item', 'user'])->get();

            return  PurchaseResource::collection($completedOrders);
        } catch (\Throwable $th) {
        }
    }

    public function purchaseDetailOwner(Request $request)
    {
        try {
            $id = $request->id;

            $purchases = Purchase::where(['id' => $id, 'owner_id' => auth()->id()])->with(['item', 'user'])->get();

            return PurchaseResource::collection($purchases);
        } catch (\Throwable $th) {
            echo "Gagal";
        }
    }

    public function purchaseDetailUser(Request $request)
    {
        try {
            $id = $request->id;

            $purchases = Purchase::where(['id' => $id, 'user_id' => auth()->id()])->with(['item', 'user'])->get();

            return PurchaseResource::collection($purchases);
        } catch (\Throwable $th) {
            echo "Gagal";
        }
    }

    public function delivery()
    {
        try {
            $deliveries = Purchase::where(['user_id' => auth()->id(), 'status' => 'on_delivery'])->get();

            return PurchasePublicResource::collection($deliveries);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'error ' . $th->getMessage()]);
        }
    }

    public function rejectedByOwner(Request $request)
    {
        try {

            $purchaseId = $request->id;

            $purchase = Purchase::where(['owner_id' => auth()->id(), 'id' => $purchaseId])->first();

            $purchase->status = "rejected_by_owner";
            $purchase->save();

            if ($purchase->payment == 'zpherepay') {
                $totalPays = $purchase->total_pays;

                $zpherepayUserAcc = ZpherePay::where(['user_id' => $purchase->user_id])->first();
                $zpherepayUserAcc->saldo += $totalPays;
                $zpherepayUserAcc->save();
            }

            $user = User::find(auth()->id());
            $item = ShopItem::find($purchase->item_id);
            $item->update(['stock' => (int) $item->stock +  (int) $purchase->total_item]);
            Notification::create([
                'user_id' => auth()->id(),
                'receiver_id' => $purchase->user_id,
                'context' => 'reject_order',
                'type' => 'shops',
                'url' => "",
                'message' => "@" . $user->username . " the owner of \"" .  $item->item . "\" reject your ordered",

            ]);

            return response()->json(['message' => 'Pesanan berhasil ditolak'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Tidak berhasil ditolak' . $th->getMessage()], 500);
        }
    }

    public function cancelOrderByUser(Request $request)
    {
        try {

            $purchaseId = $request->id;

            $purchase = Purchase::where(['user_id' => auth()->id(), 'id' => $purchaseId])->first();

            $purchase->status = "canceled_by_user";
            $purchase->save();

            if ($purchase->payment == 'zpherepay') {
                $totalPays = $purchase->total_pays;

                $zpherepayUserAcc = ZpherePay::where(['user_id' => $purchase->user_id])->first();
                $zpherepayUserAcc->saldo += $totalPays;
                $zpherepayUserAcc->save();
            }

            $user = User::find(auth()->id());
            $item = ShopItem::find($purchase->item_id);
            $item->update(['stock' =>(int) $item->stock +  (int) $purchase->total_item]);

            Notification::create([
                'user_id' => auth()->id(),
                'receiver_id' => $purchase->owner_id,
                'context' => 'cancel_order',
                'type' => 'shops',
                'url' => "",
                'message' => "@" . $user->username . " cancel purchase on your product \"" .  $item->item . "\" ",

            ]);

            return response()->json(['message' => 'Berhasil dibatalkan'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Tidak dapat dibatalkann ' . $th->getMessage()], 500);
        }
    }

    public function deliveredByOwner(Request $request)
    {
        try {
            $purchaseId = $request->id;

            $purchase = Purchase::where(['owner_id' => auth()->id(), 'id' => $purchaseId])->first();

            $purchase->status  = "on_delivery";
            $purchase->save();

            $user = User::find(auth()->id());
            $item = ShopItem::find($purchase->item_id);
            Notification::create([
                'user_id' => auth()->id(),
                'receiver_id' => $purchase->user_id,
                'context' => 'delivered_order',
                'type' => 'shops',
                'url' => "",
                'message' => "@" . $user->username . " the owner of \"" .  $item->item . "\" delivered your ordered",

            ]);

            return response()->json(['message' => 'Pesanan berhasil dikirim ', 200]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Pesanan gagal dikirim ' . $th->getMessage()], 500);
        }
    }

    public function arrivedByOwner(Request $request)
    {
        try {
            $purchaseId = $request->id;

            $purchase = Purchase::where(['owner_id' => auth()->id(), 'id' => $purchaseId])->first();

            $purchase->status  = "order_arrived";
            $purchase->save();

            $user = User::find(auth()->id());
            $item = ShopItem::find($purchase->item_id);
            Notification::create([
                'user_id' => auth()->id(),
                'receiver_id' => $purchase->user_id,
                'context' => 'arrived_order',
                'type' => 'shops',
                'url' => "",
                'message' => "@" . $user->username . " the owner of \"" .  $item->item . "\" says your ordered has been arrived pleace check and do confirmation ",

            ]);

            return response()->json(['message' => 'Pesanan belum sampai', 200]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Pesanan sudah sampai ' . $th->getMessage()], 500);
        }
    }


    public function placeOrder(Request $request)
    {
        try {

            $purchaseId = $request->id;
            $purchaseDescription = $request->description;

            $purchase = Purchase::where(['owner_id' => auth()->id(), 'id' => $purchaseId])->first();

            $purchase->status = "on_packed";
            $purchase->description = $purchaseDescription;
            $purchase->save();

            $user = User::find(auth()->id());
            $item = ShopItem::find($purchase->item_id);
            Notification::create([
                'user_id' => auth()->id(),
                'receiver_id' => $purchase->user_id,
                'context' => 'place_order',
                'type' => 'shops',
                'url' => "",
                'message' => "@" . $user->username . " the owner of \"" .  $item->item . "\" place your ordered ",

            ]);
            return response()->json(['message' => 'Pesanan berhasil diterima'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Tidak berhasil di ubah' . $th->getMessage()], 500);
        }
    }


    public function checkoutItems()
    {
        try {

            $items = Purchase::where('user_id', auth()->id())->with(['item', 'item.user'])->get();

            return PurchaseResource::collection($items);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Tidak dapat menggambil data' . $th->getMessage()], 500);
        }
    }

    public function arrivedConfirmedReviewedByUser(Request $request)
    {
        DB::beginTransaction();

        try {
            $purchaseId = $request->id;
            $purchaseReview = $request->review;
            $rating = $request->rating;

            // Mendapatkan data pembelian yang sesuai
            $purchase = Purchase::where(['user_id' => auth()->id(), 'id' => $purchaseId])->first();

            if (!$purchase) {
                return response()->json(['message' => 'Data pembelian tidak ditemukan'], 404);
            }

            // Memperbarui status pembelian
            $purchase->status = "order_completed";
            $purchase->arrived_confirmed = '1';
            $purchase->reviews = $purchaseReview;
            $purchase->save();

            // Memeriksa pengiriman dana ZpherePay dari user ke owner

            if ($purchase->payment == 'zpherepay') {
                $totalPays = $purchase->total_pays;

                $zpherepayOwnerAcc = ZpherePay::where(['user_id' => $purchase->owner_id])->first();
                $zpherepayOwnerAcc->saldo += $totalPays;
                $zpherepayOwnerAcc->save();
            }

            // Mendapatkan data item yang sesuai
            $itemId = $purchase->item_id;
            $shopItem = ShopItem::where('id', $itemId)->first();

            if (!$shopItem) {
                return response()->json(['message' => 'Item tidak ditemukan'], 404);
            }

            // Memperbarui jumlah penjualan, ulasan, dan bintang
            $totalRatings = $shopItem->reviews;
            $newAverage = (($shopItem->stars * $totalRatings) + $rating) / ($totalRatings + 1);
            $shopItem->sold += (int) $purchase->total_item;
            $shopItem->reviews += 1;
            $shopItem->stars = $newAverage;
            $shopItem->save();

            DB::commit();

            $user = User::find(auth()->id());
            $item = ShopItem::find($purchase->item_id);

            Notification::create([
                'user_id' => auth()->id(),
                'receiver_id' => $purchase->owner_id,
                'context' => 'confirm_order_arrived',
                'type' => 'shops',
                'url' => "",
                'message' => "@" . $user->username . " confirm arrived on your product \"" .  $item->item . "\" , the transaction is completed successfully",

            ]);

            return response()->json(['message' => 'Pesanan berhasil diterima'], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => 'Tidak berhasil di ubah: ' . $th->getMessage()], 500);
        }
    }

    public function orderCompletedUser()
    {
        try {

            $completedOrders = Purchase::where('user_id', auth()->id())->where('status', 'order_arrived')->collecorWhere('status', 'order_completed')->with(['item', 'item.user'])->get();

            return  PurchaseResource::tion($completedOrders);
        } catch (\Throwable $th) {
        }
    }
}
