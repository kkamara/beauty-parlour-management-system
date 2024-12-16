<?php

namespace App\Http\Controllers\V1\Web;

use App\Http\Controllers\Controller;
use App\Models\V1\Order;
use App\Models\V1\OrderProduct;
use App\Models\V1\PreferredSchedule;
use App\Models\V1\Product;
use App\Models\V1\User;
use Exception;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    public function checkout(Request $request) {
        Stripe::setApiKey(config("stripe.sk"));

        // dd($request->all());
        $productId      = $request->input("productId");
        $userId         = $request->input("userId");
        $preferredDates = $request->input("preferredDate");
        $preferredTimes = $request->input("preferredTime");

        $product = Product::find($productId);
        $user    = User::find($userId);
        if (null === $product || null === $user) {
            if (config("app.env") !== "production") {
                Log::debug("Invalid or missing product or user id field.");
            }
            return redirect()->to(
                config("app.url")."/404",
            );
        }

        $order = new Order();
        $order->user_ordered = $user->id;
        $order->price = $product->price;
        $order->save();

        if (
            null !== $preferredDates &&
            null !== $preferredTimes &&
            count($preferredDates) === count($preferredTimes)
        ) {
            for ($i=0; $i < count($preferredDates); $i++) {
                $date = $preferredDates[$i];
                $time = $preferredTimes[$i];

                if (!isset($date) || !isset($time)) {
                    continue;
                }
                try {
                    $carbonDateTime = Carbon::parse($date." ".$time);

                    $formattedDateTime = $carbonDateTime->format("Y-m-d H:i:s");
                    $ps = new PreferredSchedule();
                    $ps->order_id = $order->id;
                    $ps->date_time = $formattedDateTime;
                    $ps->save();
                } catch (Exception $e) {
                    if (config("app.env") !== "production") {
                        Log::debug($e->getMessage());
                    }
                    return redirect()->to(
                        config("app.url")."/404",
                    );
                }
            }
        }
        try {
            $checkoutSession = Session::create([
                'line_items' => [[
                    'price' => $product->stripe_price_id,
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => config("app.url") . '/checkout/result?success=true',
                'cancel_url' => config("app.url") . '/checkout/result?cancelled=true',
                'automatic_tax' => [
                    'enabled' => true,
                ],
            ]);

            $order->queried = true;
            $order->save();

            $orderProduct = new OrderProduct();
            $orderProduct->order_id = $order->id;
            $orderProduct->name = $product->name;
            $orderProduct->stripe_product_id = $product->stripe_product_id;
            $orderProduct->stripe_price_id = $product->stripe_price_id;
            $orderProduct->price = $product->price;
            $orderProduct->description = $product->description;
            $orderProduct->save();

            return redirect()->away($checkoutSession->url);
        } catch (Exception $e) {
            if (config("app.env") !== "production") {
                Log::debug($e->getMessage());
            }
            return redirect()->to(
                config("app.url")."/404",
            );
        }
    }

    public function webhook(Request $request) {
        if (config("app.env") !== "production") {
            Log::debug("Stripe webhook API route hit.");
        }
        return ["message" => "Success"];
    }
}
