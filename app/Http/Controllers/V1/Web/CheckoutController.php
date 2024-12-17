<?php

namespace App\Http\Controllers\V1\Web;

use App\Http\Controllers\Controller;
use App\Models\V1\Cart;
use App\Models\V1\Order;
use App\Models\V1\OrderProduct;
use App\Models\V1\PreferredSchedule;
use App\Models\V1\Product;
use App\Models\V1\User;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    public function __construct() {
        Stripe::setApiKey(config("stripe.sk"));
    }

    public function checkout(Request $request) {
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
                'success_url' => config("app.url").'/checkout/result?success=true&orderId='.$order->id,
                'cancel_url' => config("app.url").'/checkout/result?cancelled=true&orderId='.$order->id,
                'automatic_tax' => [
                    'enabled' => true,
                ],
                'metadata' => [
                    "orderId" => $order->id,
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

    public function webhook() {
        if (config("app.env") !== "production") {
            Log::debug("Stripe webhook API route hit.");
        }

        $payload = @file_get_contents('php://input');
        $event = null;

        try {
            $event = \Stripe\Event::constructFrom(
                json_decode($payload, true)
            );
        } catch(\UnexpectedValueException $e) {
            if (config("app.env") !== "production") {
                Log::debug(
                    '⚠️  Webhook error while parsing basic request. '.$e->getMessage(),
                );
            }
            return response()->json([
                "message" => "Bad request."
            ], Response::HTTP_NOT_FOUND);
        }
        if (config("stripe.webhook")) {
            // Only verify the event if there is an endpoint secret defined
            // Otherwise use the basic decoded event
            $sigHeader = $_SERVER['HTTP_STRIPE_SIGNATURE'];
            try {
                $event = \Stripe\Webhook::constructEvent(
                    $payload, $sigHeader, config("stripe.webhook"),
                );
            } catch(\Stripe\Exception\SignatureVerificationException $e) {
                if (config("app.env") !== "production") {
                    Log::debug(
                        '⚠️  Webhook error while validating signature. '.$e->getMessage(),
                    );
                }
                return response()->json([
                    "message" => "Bad request."
                ], Response::HTTP_NOT_FOUND);
            }
        }

        // Handle the event
        switch ($event->type) {
            case 'payment_intent.succeeded':
                $paymentIntent = $event->data->object; // contains a \Stripe\PaymentIntent
                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded($paymentIntent);
                if (config("app.env") !== "production") {
                    Log::debug(
                        "Stripe payment succeeded. Object: ".print_r($paymentIntent, true),
                    );
                }
            break;
            case 'payment_method.attached':
                $paymentMethod = $event->data->object; // contains a \Stripe\PaymentMethod
                // Then define and call a method to handle the successful attachment of a PaymentMethod.
                // handlePaymentMethodAttached($paymentMethod);
                if (config("app.env") !== "production") {
                    Log::debug(
                        "Stripe payment method added. Object: ".print_r($paymentMethod, true),
                    );
                }
            break;
            case "checkout.session.completed":
                $checkout = $event->data->object;
                if (config("app.env") !== "production") {
                    Log::debug(
                        "Stripe payment checkout completed. Object: ".print_r($checkout, true),
                    );
                }
                $metadata = $checkout = $event->data
                    ->object
                    ->metadata;
                if (isset($metadata->orderId)) {
                    $orderId = $metadata->orderId;
                    if (config("app.env") !== "production") {
                        Log::debug(
                            message: "Stripe metadata orderId: ".$orderId,
                        );
                    }
                    $order = Order::find($orderId);
                    if (null === $order) {
                        if (config("app.env") !== "production") {
                            Log::debug(
                                message: "Order not found: ".$orderId,
                            );
                        }
                    } else {
                        $order->status = "PAID";
                        $order->save();
                        if (config("app.env") !== "production") {
                            Log::debug(
                                message: "Completed Stripe Checkout for order: ".$orderId,
                            );
                        }

                        Cart::where("user_id", $order->user->id)->delete();
                    }
                }
            break;
            default:
                // Unexpected event type
                if (config("app.env") !== "production") {
                    Log::debug(
                        '⚠️  Unexpected event type.',
                    );
                }
            break;
        }
        return response()->json([
            "message" => "Success",
        ], Response::HTTP_OK);
    }
}
