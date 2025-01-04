<?php

use App\Http\Controllers\AdminController\BooksController;
use App\Http\Controllers\AdminController\GroupsController;
use App\Http\Controllers\AdminController\PostsController;
use App\Http\Controllers\AdminController\ProductsController;
use App\Http\Controllers\AdminController\ShopsController;
use App\Http\Controllers\AdminController\UsersController;
use App\Http\Controllers\AdminController\ZpherepaysController;
use App\Http\Controllers\LibrariesController;
use App\Models\Friend;
use App\Models\ShopItem;
use App\Models\SavedPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\ShopItemController;
use App\Http\Controllers\SavedPostController;
use App\Http\Controllers\GroupMemberController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ShoppingCartController;
use App\Http\Controllers\ZpherepayController;
use App\Http\Middleware\AdminMiddleware;
use App\Models\ZphereLibraries;

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Account Api
    Route::post('/deactivate-account', [AuthController::class, 'deactivate']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/update-user', [UserController::class, 'update']);
    Route::post('change-password', [UserController::class, 'changePassword']);
    Route::post('forgot-password', [UserController::class, 'forgotPassword']);




    // Home  Api
    Route::get('/', [PostController::class, 'index']);
    Route::apiResource('/home', PostController::class);
    Route::get('/videos', [PostController::class, 'videos']);
    Route::post('/create-post', [PostController::class, 'store']);
    Route::post('/create-stories', [StoryController::class, 'store']);
    Route::get('/notifications', [NotificationController::class, 'index']);


    // Posts Api
    Route::post('/like', [PostController::class, 'like']);
    Route::post('/dislike', [PostController::class, 'dislike']);
    Route::post('/save-post', [SavedPostController::class, 'store']);
    Route::post('/remove-post', [SavedPostController::class, 'remove']);
    Route::get('/bookmarks', [SavedPostController::class, 'index']);
    Route::post('/edit-post', [PostController::class, 'edit']);
    Route::post('/delete-post', [PostController::class, 'delete']);
    Route::post('/create-comment', [CommentController::class, 'store']);
    Route::post('/delete-comment', [CommentController::class, 'destroy']);


    // Peoples Api
    Route::get('/peoples', [UserController::class, 'index']);
    Route::get('/search-user', [UserController::class, 'searchUser']);
    Route::get('/stories', [StoryController::class, 'index']);
    Route::get('/single-post', [PostController::class, 'single']);
    Route::get('/user-profile', [UserController::class, 'profile']);
    Route::get('/user-product', [ShopItemController::class, 'userProfileProduct']);

    // Group Api
    Route::post('/create-group', [GroupController::class, 'store']);
    Route::get('edit-group', [GroupController::class, 'editGroup']);
    Route::post('update-group', [GroupController::class, 'updateGroup']);

    Route::get('/groups', [GroupController::class, 'index']);
    Route::get('/get-groups', [GroupController::class, 'searchGroup']);
    Route::get('/suggested-group', [GroupController::class, 'suggest']);
    Route::get('/group/{group_id}/join', [GroupMemberController::class, 'joinGroup']);
    Route::get('/group/{group_id}/leave', [GroupMemberController::class, 'leaveGroup']);
    Route::get('/group/{group_id}/status', [GroupMemberController::class, 'getGroupStatus']);
    Route::get('/group-profile', [GroupController::class, 'profile']);
    Route::post('/create-group-post', [PostController::class, 'store']);
    Route::get('/group-member/{group_id}/status', [GroupMemberController::class, 'index']);

    Route::get('/group-members', [GroupController::class, 'groupMember']);


    // Add Friend Api
    Route::post('/friends/{user_id}/add', [FriendController::class, 'addFriend']);
    Route::post('/friends/{friend_id}/accept', [FriendController::class, 'acceptFriend']);
    Route::post('/friends/{friend_id}/remove', [FriendController::class, 'removeFriend']);
    Route::get('/friends/{user_id}/status', [FriendController::class, 'getFriendStatus']);
    Route::get('/friends-request', [FriendController::class, 'getPendingFriend']);
    Route::get('/friends-accepted', [FriendController::class, 'getAcceptedFriend']);
    Route::get('/friends', [FriendController::class, 'myFriends']);


    // ZphereShop Product
    Route::post('/create-product', [ShopItemController::class, 'create']);
    Route::get('/shop-items', [ShopItemController::class, 'index']);
    Route::get('/single-product', [ShopItemController::class, 'single']);
    Route::get('/search-items', [ShopItemController::class, 'searchItems']);
    Route::get('/most-purchases', [ShopItemController::class, 'mostPurchases']);
    Route::get('/product', [ShopItemController::class, 'userProduct']);
    Route::get('/product-item', [ShopItemController::class, 'userProductItem']);
    Route::get('/edit-product', [ShopItemController::class, 'editProduct']);
    Route::post('/update-product', [ShopItemController::class, 'update']);

    Route::post('/unavailibling-item', [ShopItemController::class, 'unavailiblingItem']);
    Route::post('/availibling-item', [ShopItemController::class, 'availiblingItem']);
    Route::post('/deleting-item', [ShopItemController::class, 'deletingItem']);


    // ZphereShop Cart
    Route::post('add-to-cart', [ShoppingCartController::class, 'store']);
    Route::post('update-cart', [ShoppingCartController::class, 'updateCart']);
    Route::get('/shopping-cart-status', [ShoppingCartController::class, 'cartStatus']);
    Route::post('/remove-from-cart', [ShoppingCartController::class, 'remove']);
    Route::post('/remove-from-cart-many', [ShoppingCartController::class, 'removeCart']);
    Route::get('/cart', [ShoppingCartController::class, 'cart']);
    Route::get('/user-cart', [ShoppingCartController::class, 'userCart']);
    


    // Checkout
    Route::get('/checkout-item', [ShoppingCartController::class, 'checkout']);
    Route::post('/checkout-purchase', [PurchaseController::class, 'store']);

    // Checkout Status for Owner
    Route::post('/reject-order-by-owner', [PurchaseController::class, 'rejectedByOwner']);
    Route::post('/delivered-by-owner', [PurchaseController::class, 'deliveredByOwner']);
    Route::post('/arrived-order', [PurchaseController::class, 'arrivedByOwner']);
    Route::post('/place-order', [PurchaseController::class, 'placeOrder']);


    // Checkout Status by User or Buyer
    Route::post('/cancel-order-by-user', [PurchaseController::class, 'cancelOrderByUser']);
    Route::post('/arrived-confirmed-reviewed-by-user', [PurchaseController::class, 'arrivedConfirmedReviewedByUser']);
    Route::get('/completed-orders', [PurchaseController::class, 'orderCompletedUser']);





    // Num
    Route::get('/checkout-amount', [PurchaseController::class, 'checkout']);
    Route::get('/incoming-order-amount', [PurchaseController::class, 'incomingOrder']);
    Route::get('/delivery-amount', [PurchaseController::class, 'delivery']);

    // ZphereShop Owner
    Route::get('/incoming-orders', [PurchaseController::class, 'incomingOrders']);
    Route::get('/completed-orders', [PurchaseController::class, 'orderCompletedConfirmed']);
    Route::get('/purchase-detail-owner', [PurchaseController::class, 'purchaseDetailOwner']);
    Route::get('/purchase-detail-user', [PurchaseController::class, 'purchaseDetailUser']);
    Route::get('/checkout-items', [PurchaseController::class, 'checkoutItems']);


    // Location Api
    Route::get('/provinces', [LocationController::class, 'getProvinces']);
    Route::get('/regencies', [LocationController::class, 'getRegencies']);
    Route::get('/districts', [LocationController::class, 'getDistricts']);
    Route::get('/villages', [LocationController::class, 'getVillages']);

    // ZpherePay
    Route::get('/zpherepay-histories', [ZpherepayController::class, 'history']);
    Route::post('/zpherepay-register', [ZpherepayController::class, 'register']);
    Route::post('/verify-pin', [ZpherepayController::class, 'setPin']);
    Route::post('/zpherepay-check-pin', [ZpherepayController::class, 'checkPin']);
    Route::get('/zpherepay-account', [ZpherepayController::class, 'accountDetail']);
    Route::post('/send-topup-verification', [ZpherepayController::class, 'topupUserToken']);
    Route::post('/send-agen-token-verification', [ZpherepayController::class, 'topupAgenToken']);
    Route::get('/zpherepay-customer-account', [ZpherepayController::class, 'customerAccountDetail']);


    // Zphere Libraries
    Route::post('/create-book', [LibrariesController::class, 'create']);
    Route::get('/libraries-books', [LibrariesController::class, 'index']);
    Route::get('/user-books', [LibrariesController::class, 'userBooks']);
    Route::get('/book', [LibrariesController::class, 'singleBook']);
});

// Action for Unsigned
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/resend-verification-code', [AuthController::class, 'resendVerificationCode']);
Route::get('/verify-email/{token}', [AuthController::class, 'verifyEmail']);


// guest get
Route::get('/guest', [PostController::class, 'index']);

// Routes yang boleh diakses oleh tamu (tanpa login)
Route::middleware('guest')->group(function () {
    Route::get('/', [PostController::class, 'index']);
});


// Tambahkan rute API untuk mendapatkan daftar pengguna (admin-only)
Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
    Route::get('/all-users', [UsersController::class, 'index']);
    Route::get('/all-posts', [PostsController::class, 'index']);
    Route::get('/all-zpherepays', [ZpherepaysController::class , 'index']);
    Route::get('/all-groups', [GroupsController::class, 'index']);
    Route::get('/all-books', [BooksController::class, 'index']);
    Route::get('/all-shops', [ShopsController::class, 'index']);

    
    Route::post('/users/{userId}/ban', [UsersController::class, 'ban']);
    Route::post('/users/{userId}/unban', [UsersController::class, 'unban']);



    // Route::get('/products', [ProductsController::class, 'index']);
    // Route::delete('/delete-product/{product}', [ProductsController::class, 'destroy']);

    // routes/api.php

    // Route::get('/transactions', [ZpherepaysController::class, 'index']);
});
