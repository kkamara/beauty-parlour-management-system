<?php

namespace Database\Factories\V1;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\V1\Product;
use App\Models\V1\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\V1\Cart>
 */
class CartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()
                ->first()
                ->id,
            'product_id' => Product::inRandomOrder()
                ->first()
                ->id,
            "quantity" => 1,
        ];
    }
}
