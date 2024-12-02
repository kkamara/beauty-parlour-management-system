<?php

namespace Database\Factories\V1;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\V1\Product;

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
            'product_id' => Product::inRandomOrder()
                ->first()
                ->id,
            "quantity" => 1,
        ];
    }
}
