<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\Web\CheckoutController;

Route::post("/cart/checkout", [CheckoutController::class, "checkout"])
    ->middleware("auth:sanctum")
    ->name("checkout");

Route::view('/{path?}', 'layouts.app')->where('path', '.*');
