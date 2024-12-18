<?php

namespace App\Http\Controllers\V1\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\OrderCollection;
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

    public function getOrders(Request $request) {
        $orders = Order::where(
            "user_ordered", auth()->user()->id,
        );
        $query = $request->input("query");
        if (null !== $query) {
            $orders->where(
                "orders.id", "LIKE", "%".$query."%",
            );
            $orders->orWhere(
                "status", "LIKE", "%".$query."%",
            );
            $orders->orWhere(
                "orders.price", "LIKE", "%".$query."%",
            );
            $orders->orWhere(
                "worker_assigned", "LIKE", "%".$query."%",
            );
            $orders->leftJoin(
                "order_products",
                "order_products.order_id",
                "=",
                "orders.id",
            )->orWhere(
                "order_products.name", "LIKE", "%".$query."%",
            );
        } else {
            $orders->where("status", "PAID");
        }
        return new OrderCollection(
            $orders->paginate(8)
                ->appends($request->query()));
    }
}
