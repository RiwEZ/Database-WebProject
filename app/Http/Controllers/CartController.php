<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function cartView()
    {
        $cartBox = session()->get('cart');
        return inertia('Cart', compact('cartBox'));
    }

    public function addToCart($productCode)
    {
        $product = Product::findOrFail($productCode);
        $cart = session()->get('cart');
        if (!$cart) {
           $cart = [
            $product->productCode => [
                'id' => $product->productCode,
                'name' => $product->productName,
                'scale' => $product->productScale,
                'buyPrice' => $product->buyPrice,
                'quantity' => 1,
            ]
            ];
            session()->put('cart', $cart);
            // return redirect()->route('cartView');
        }
        if (isset($cart[$productCode])) {
            $cart[$productCode]['quantity']++;
            session()->put('cart', $cart);
            // return redirect()->route('cartView');
        }

        if (isset($cart)) {
            $cart[$productCode] = [
                'id' => $product->productCode,
                'name' => $product->productName,
                'scale' => $product->productScale,
                'buyPrice' => $product->buyPrice,
                'quantity' => 1,
            ];
            session()->put('cart', $cart);
            // return redirect()->route('cartView');
        }
    }

    public function removeCart($productCode)
    {
        $cart = Session::get('cart');
        if (isset($cart[$productCode])) {
            unset($cart[$productCode]);
            session()->put('cart', $cart);
            return redirect()->route('cartView');
        }
    }
}
