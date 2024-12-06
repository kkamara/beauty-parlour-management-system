<?php

namespace App\Http\Controllers\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\CartCollection;
use App\Models\V1\Cart;
use App\Models\V1\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cart = Cart::where("user_id", auth()->user()->id)
            ->get();
        return new CartCollection($cart);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, product $product)
    {
        $user = auth()->user();
        $cart = Cart::where([
            ["product_id", $product->id],
            ["user_id", $user->id],
        ])->first();
        if ($cart) {
            if ($cart->quantity > 1) {
                $cart->quantity -= 1;
                $cart->save();
            } else if ($cart->quantity === 1) {
                $cart->delete();
            }
        } else {
            $cart = new Cart();
            $cart->product_id = $product->id;
            $cart->user_id = $user->id;
            $cart->save();
        }
        return ["message" => "Success"];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        if ($cart->quantity > 1) {
            $cart->quantity -= 1;
            $cart->save();
        } else if ($cart->quantity === 1) {
            $cart->delete();
        }

        return ["message" => "Success"];
    }
}
