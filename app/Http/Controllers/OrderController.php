<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public static  function getall_detail()
    {   
        $a = DB::table('orders')
        ->crossJoin('orderdetails')
        ->crossJoinSub(function ($query) {
            $query->from('products')
                ->select('products.productCode', 'products.productName');
        },'p')
        ->select('*')
        ->where('orders.orderNumber','=',DB::raw('orderdetails.orderNumber'))
        ->where('p.productCode','=',DB::raw('orderdetails.productCode'))
        ->get();
        // $a = DB::table('orderdetails')->get();
        $array = (array) $a;
        return $a;
    }
}
