<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\Purchase;
use App\Models\ShopItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\ItemPublicResource;
use App\Http\Requests\StoreShopItemRequest;
use App\Http\Requests\UpdateShopItemRequest;
use Illuminate\Database\Eloquent\Casts\Json;

class ShopItemController extends Controller
{
    // ShopItemController.php


    public function index()
    {
        $userId = auth()->id();

        $items = ShopItem::where('user_id', '!=', $userId)
            ->where(['available' => '1', 'deleted' => '0'])
            ->with('user')
            ->paginate(6);

        return ItemPublicResource::collection($items)
            ->additional([
                'meta' => [
                    'current_page' => $items->currentPage(),
                    'last_page' => $items->lastPage(),
                    'total' => $items->total(),
                ]
            ]);
    }

    public function searchItems(Request $request)
    {
        $search = $request->input('search', '');

        $items = ShopItem::where('user_id', '!=', auth()->id())
            ->where(['available' => '1', 'deleted' => '0'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where("item", "like", "%" . $search . "%")
                        ->orWhere("description", "like", "%" . $search . "%")
                        ->orWhere("category", "like", "%" . $search . "%");
                });
            })
            ->get();

        return ItemPublicResource::collection($items);
    }


    public function mostPurchases()
    {
        $items = ShopItem::where('user_id', '!=', auth()->id())
            ->where(['available' => '1', 'deleted' => '0'])
            ->orderByDesc('sold')
            ->take(2)
            ->get();

        return ItemPublicResource::collection($items);
    }
    public function create(StoreShopItemRequest $request)
    {
        $data = $request->validated();

        $user = User::find(auth()->id());

        if ($user && $user->address != null && $user->location != null) {
            try {

                $pictures = [];

                if (isset($data['picture'])) {
                    Log::info('Processing pictures');
                    foreach ($data['picture'] as $picture) {
                        $pictures[] = $picture->store("zphereshop/item", "public");
                    }
                }
                $product = ShopItem::create([
                    "user_id" => auth()->id(),
                    "item" =>  $data['item'],
                    "stock" => (int) $data['stock'],
                    "category" => $data['category'],
                    "price" => (float) $data['price'],
                    "picture" => json_encode($pictures),
                    "description" => $data['description']
                ]);

                return response()->json([
                    'message' => 'Product Item created successfully!'
                ], 200);
            } catch (\Throwable $th) {

                return response()->json([
                    'message' => "There was an error creating the product item!" . $th->getMessage()
                ], 500);
            }
        }

        return response()->json([
            'message' => 'User location is not set!'
        ], 400);
    }

    public function single(Request $request)
    {
        $id = $request->id;
        $item = ShopItem::where("id", $id)
            ->where(['available' => '1', 'deleted' => '0'])

            ->with("user")
            ->get();

        return ItemPublicResource::collection($item);
    }

    public function userProduct()
    {
        $item = ShopItem::where('user_id', auth()->id())
            ->where(['available' => '1', 'deleted' => '0'])
            ->get();


        return ItemPublicResource::collection($item);
    }

    public function userProductItem()
    {
        $userId = auth()->id();

        $items = ShopItem::where('user_id', [$userId])
            ->where(['available' => '1', 'deleted' => '0'])
            ->with('user')
            ->paginate(10);

        return ItemPublicResource::collection($items)
            ->additional([
                'meta' => [
                    'current_page' => $items->currentPage(),
                    'last_page' => $items->lastPage(),
                    'total' => $items->total(),
                ]
            ]);
    }

    public function editProduct(Request $request)
    {
        $id = $request->id;

        // Mengambil item shop milik user
        $item = ShopItem::where([
            'user_id' => auth()->id(),
            'id' => $id,
        ])->get(); // gunakan first() agar hanya satu yang diambil, bukan collection

        // Memeriksa apakah terdapat pesanan aktif di sebuah shop item
        // Cek apakah ada status selain 'rejected_by_owner' atau 'canceled_by_user'
        $activePurchaseExists = Purchase::where('item_id', $id)
            ->whereNotIn('status', ['rejected_by_owner', 'canceled_by_user', 'order_completed'])
            ->exists();

        // Jika ada pesanan aktif, maka 'denied', jika tidak ada maka 'allowed'
        $status = $activePurchaseExists ? 'denied' : 'allowed';

        if ($item) {
            return response()->json([
                'data' => ItemPublicResource::collection($item),
                'permission' => $status,
            ]);
        } else {
            return response()->json([
                'message' => 'Access Denied !'
            ], 403);
        }
    }



    public function update(UpdateShopItemRequest $request)
    {
        try {
            $data = $request->validated();
            $id = $request->id;

            // Mencari item dengan ID tersebut
            $shopItem = ShopItem::find($id);

            if (!$shopItem) {
                return response()->json(['message' => 'Item not found'], 404);
            } else {

                $shopItem->item = $data['item'];
                $shopItem->stock = $data['stock'];
                $shopItem->category = $data['category'];
                $shopItem->description = $data['description'];
                $shopItem->price = $data['price'];

                if (isset($data['picture'])) {

                    foreach ($data['picture'] as $picture) {
                        $pictures[] = $picture->store("zphereshop/item", "public");
                    }

                    $shopItem->picture = json_encode($pictures);
                }

                $shopItem->save();

                return response()->json([
                    'message' => 'Product Item info updated successfully!'
                ], 200);
            }
        } catch (\Throwable $th) {

            return response()->json([
                'message' => 'There was an error updating the product item!'
            ], 500);
        }
    }

    public function userProfileProduct(Request $request)
    {
        $uuid = $request->uuid;

        try {
            // Mencari user berdasarkan UUID
            $user = User::where('uuid', $uuid)->firstOrFail(); // Menggunakan firstOrFail untuk mengatasi kasus user tidak ditemukan

            // Mengambil ID user
            $id = $user->id;

            // Mengambil produk yang dimiliki user

            $products = ShopItem::where('user_id', $id)->where(['available' => '1', 'deleted' => '0'])->get();

            // Mereturn koleksi produk dengan resource
            return ItemPublicResource::collection($products);
        } catch (\Throwable $th) {
            // Menangani error dan mereturn pesan kesalahan
            return response()->json(['message' => 'Error: Failed to load user products. ' . $th->getMessage()], 500);
        }
    }

    public function unavailiblingItem(Request $request)
    {
        $id = $request->id;
        try {
            $item = ShopItem::where('id', $id)->first();
            $item->available = '0';
            $item->save();

            return response()->json([
                'message' => 'Successfully change product availibility '
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occured ' . $th->getMessage()
            ], 500);
        }
    }
    public function availiblingItem(Request $request)
    {
        $id = $request->id;
        try {
            $item = ShopItem::where('id', $id)->first();
            $item->available = '1';
            $item->save();

            return response()->json([
                'message' => 'Successfully change product availibility '
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occured ' . $th->getMessage()
            ], 500);
        }
    }

    public function deletingItem(Request $request)
    {
        $id = $request->id;


        $item = ShopItem::where('id', $id)->first();
        $purchaseExists = Purchase::where('item_id', $id)->exists(); // Cek apakah pesanan ada

        // echo $status;

        if (!$purchaseExists) {
            $item->deleted = '1';
            $item->save();

            return response()->json([
                'message' => 'Successfully deleted product '
            ], 200);
        } else {
            return response()->json([
                'message' => 'Your Product still have an active transactions '
            ], 500);
        }
    }
}
