<?php

use App\Http\Controllers\V1\Web\CheckoutController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\Web\UserController as WebUserController;
use App\Http\Controllers\V1\API\UserController;
use App\Http\Controllers\V1\Web\CartController;

Route::prefix('web')
    ->group(function () {
        // Add single page app api routes
        Route::prefix('/user')->group(function () {
            Route::post('/register', [WebUserController::class, 'register']);
            Route::post('/', [WebUserController::class, 'login']);
            Route::delete(
                '/logout',
                [WebUserController::class, 'logout'],
            )->middleware("auth:sanctum");
            Route::get(
                '/authorize',
                [WebUserController::class, 'authorizeUser'],
            )->middleware("auth:sanctum");
        });
        Route::prefix('/cart')->group(function () {
            Route::get("/", [CartController::class, "index"])
                ->middleware("auth:sanctum")
                ->name("cart.get");
            Route::delete("/{cart}", [CartController::class, "destroy"])
                ->middleware("auth:sanctum")
                ->name("cart.delete");
            Route::patch("/product/{product}", [CartController::class, "update"])
                ->middleware("auth:sanctum")
                ->name("cart.update");
            Route::post("/checkout", [CheckoutController::class, "checkout"])
                ->name("checkout");
        });
        Route::get(
            '/users',
            [WebUserController::class, 'getUsers'],
        )->middleware("auth:sanctum");
    });

Route::prefix('/user')->group(function () {
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/', [UserController::class, 'login'])->name('login');
    Route::delete(
        '/logout',
        [UserController::class, 'logout'],
    )->middleware("auth:sanctum");
    Route::get(
        '/authorize',
        [UserController::class, 'authorizeUser'],
    )->middleware("auth:sanctum");
});
