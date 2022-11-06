<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Log;
use App\Http\Controllers\Inertia;
use App\Models\Product;
use App\Models\Orders;
use App\Models\OrdersDetail;
Use \Carbon\Carbon;

class CartController extends Controller
{
  

    public function getUserCart()
    {
        $userId = Auth::id();
        $userCart = DB::table('user_cart')
            ->where('userId', $userId);

        $allUserProducts = DB::table('products')
            ->joinSub($userCart, 'user_cart', function ($join) {
                $join->on('products.productCode', '=', 'user_cart.productCode');
            })->get();

        return $allUserProducts;
    }

    public function cartView()
    {
        $allUserProducts = $this->getUserCart();
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

    public function editCartQuantity(Request $request)
    {
        $productCode = $request->input('productCode');
        $newQuantity = $request->input('newQuantity');

        $inStock = DB::table('products')
            ->select('quantityInStock')
            ->where('productCode', '=', $productCode)
            ->first()
            ->quantityInStock;
        if ($newQuantity > $inStock || $newQuantity <= 0) {
            return response()->json(
                ['productCode' => $productCode, 'newQuantity' => $newQuantity],
                422
            );
        }

        $userId = Auth::id();

        $userProduct = DB::table('user_cart')
            ->where('userId', $userId)
            ->where('productCode', $productCode);

        $userProduct->update(['productQuantity' => $newQuantity]);


        return response()->json($userProduct->get());
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

    public function checkout()
    {

        DB::transaction(function () {
            $time = Carbon::now();
            

            $userCart = $this->getUserCart();
            foreach ($userCart as $p) {
                $matchedProduct = Product::where('productCode', $p->productCode)->first();
                $qty = $p->productQuantity;
                if( $p->productQuantity <= 0) $qty = 0;
                $matchedProduct->quantityInStock = $matchedProduct->quantityInStock - $qty;
                $matchedProduct->save();
            }
            $userId = Auth::id();
            DB::table('user_cart')->where('userId', $userId)->delete();

            // INSERT INTO orders AUTO_INCREMENT( orderDate, requiredDate, status,customerNumber )
            // VALUES (2003-05-29 , 2003-05-29 , Unshipped, userId);

            $maxKey = Orders::max('orderNumber')+1;

            $Orders = new Orders;
            $Orders->orderNumber = $maxKey;
            $Orders->orderDate = $time->toDateString();
            $Orders->requiredDate = $time->addDays(5)->toDateString();
            $Orders->shippedDate = $time->addDays(7)->toDateString();
            $Orders->status = 'Unshipped';
            $Orders->customerNumber = $userId;
            $Orders->save();

            // orderNumber 
            // productCode 
            // quantityOrdered
            // priceEach
            // orderLineNumber
            
            $i = 1;
          foreach ($userCart as $p) {
            $stockProduct = Product::where('productCode', $p->productCode)->first();
            $OrdersDD = new OrdersDetail();
            $OrdersDD->orderNumber = $maxKey;
            $OrdersDD->productCode =  $p->productCode;
            $qty = $p->productQuantity;
            if( $stockProduct->quantityInStock <  $qty) $qty = $stockProduct->quantityInStock;
            $OrdersDD->quantityOrdered = $qty;
            $OrdersDD->priceEach = Product::where('productCode', $p->productCode)->select('MSRP')->first()->MSRP;
            $OrdersDD->orderLineNumber = $i;
            $i = $i + 1;
            $OrdersDD->save();
            }
            
    
        });
    }
}
