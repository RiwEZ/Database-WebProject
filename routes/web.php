<?php

use App\Http\Controllers\CartController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'products' => Product::all(),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/cart', [CartController::class, 'cartView'])->middleware(['auth', 'verified'])->name('cartView');
Route::post('/add-to-cart', [CartController::class, 'addToCart'])->middleware(['auth', 'verified'])->name('addToCart');
Route::get('/remove-from-cart/{productCode}', [CartController::class, 'removeCart'])->middleware(['auth', 'verified'])->name('removeCart');

require __DIR__.'/auth.php';
