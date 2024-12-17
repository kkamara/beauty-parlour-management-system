<?php

namespace App\Http\Controllers\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\OrderResource;
use App\Models\V1\Order;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends Controller
{
    public function getOrder(Order $order) {
        if ($order->user->id !== auth()->user()->id) {
            return response()->json([
                "message" => "Resource not found.",
            ], Response::HTTP_BAD_REQUEST);
        }
        return new OrderResource($order);
    }
}
