<?php

namespace App\Http\Controllers;

use App\Http\Resources\ShoppingCartResource;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;

class ShoppingCartController extends Controller
{
    public function store (Request $request) {
        $idItem = $request->idItem;
        $items = $request->items;

        
        try {
            ShoppingCart::create([
                "user_id" => auth()->id(),
                "item_id" => $idItem,
                "items" => $items,
            ]);

            return response()->json([
                'message' => 'Succesfully adding to your shopping cart'], 200);
        } catch(\Throwable $th) {
            return response()->json([
                'message' => 'There was an error'
            ], 500);
        }

    }

    public function updateCart(Request $request) 
    {
        $cartId = $request->id;
        $items = $request->counter;

        $cart = ShoppingCart::find($cartId);

        $cart->update(['items'=> $items]);

        return response()->json(['message' => 'succesfully update items'], 200);
    }

    public function remove(Request $request) {
        $idItem = $request->idItem;
        try {
            ShoppingCart::where([
                "user_id" => auth()->id(),
                "item_id" => $idItem,
            ])->delete();

            return response()->json(['message' => 'Succesfully removing from your shopping cart'], 200);
        } catch(\Throwable $th) {
            return response()->json([
                'message' => 'There was an error'. $th->getMessage()
            ], 500);
        }
    }

    public function removeCart (Request $request) {
       
          $ids = $request->ids; // Mengambil array ID dari request
            print_r($ids);
    if (empty($ids) || !is_array($ids)) {
        return response()->json([
            'message' => 'No valid items selected for removal'
        ], 400);
    }

    try {
        // Periksa apakah item yang ingin dihapus ada
        $cartItems = ShoppingCart::whereIn('id', $ids)
            ->where('user_id', auth()->id())
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'No items found for removal'
            ], 404);
        }

        // Hapus semua item yang dipilih dari cart
        ShoppingCart::whereIn('id', $ids)
            ->where('user_id', auth()->id())
            ->delete();

        return response()->json(['message' => 'Successfully removed items from your shopping cart'], 200);
    } catch (\Throwable $th) {
        return response()->json([
            'message' => 'There was an error while removing items'
        ], 500);
    }
        
        
    }


    public function cart() {
        $carts = ShoppingCart::where('user_id',auth()->id())->get();
        

        return ShoppingCartResource::collection($carts);
    }

    public function cartStatus(Request $request) {
        $idItem = $request->idItem;
        // echo statement should be removed or commented out
        // echo "id -> $idItem  user".auth()->id();
    
        $status = ShoppingCart::where([
            'user_id' => auth()->id(),
            'item_id' => $idItem,
        ])->exists(); // Use exists() to check if any record exists
    
        return response()->json([
            'status' => $status // 'status' will be a boolean
        ]);
    }
    

    public function userCart() 
    {
         try {
            $carts = ShoppingCart::where("user_id" , auth()->id())->with('item.user')->get();
        
            return ShoppingCartResource::collection($carts);

         }  catch (\Throwable $th) {
            
         }
    }

    public function checkout(Request $request)
    {
        try {
            $item = ShoppingCart::where([
                "id" => $request->id,
                "user_id" => auth()->id(),
            ])->with('item')->get();

            return ShoppingCartResource::collection($item);
        } catch(\Throwable $th) {
            
        }
    }
}
