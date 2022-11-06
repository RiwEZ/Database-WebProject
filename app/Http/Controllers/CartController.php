<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Log;
use App\Http\Controllers\Inertia;

class CartController extends Controller
{

    public function cartView()
    {
        $userId = Auth::id();
        $userCart = DB::table('user_cart')
            ->where('userId', $userId);

        $allUserProducts = DB::table('products')
            ->joinSub($userCart, 'user_cart', function ($join) {
                $join->on('products.productCode', '=', 'user_cart.productCode');
            })->get();
        return inertia('Cart', compact('allUserProducts'));
    }

    public function addToCart(Request $request)
    {
        $productCode = $request->input('productCode');
        $userId = Auth::id();
        $userProduct = DB::table('user_cart')
            ->where('userId', $userId)
            ->where('productCode', $productCode);

        if ($userProduct->exists()) {
            $userProduct->increment('productQuantity');
        } else {
            DB::table('user_cart')->insert([
                'userId' => $userId,
                'productCode' => $productCode,
                'productQuantity' => 1
            ]);
        }

        return response()->json("OK");
    }

    public function removeCart($productCode)
    {
        $userId = Auth::id();
        $userProduct = DB::table('user_cart')
            ->where('userId', $userId)
            ->where('productCode', $productCode);

        if ($userProduct->exists()) {
            $userProduct->delete();
        }
        return redirect()->route('cartView');
    }
}
