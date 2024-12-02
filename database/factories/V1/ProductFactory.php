<?php

namespace Database\Factories\V1;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\V1\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => "Service",
            'stripe_product_id' => "prod_RGqFvnujmBg6hu",
            'stripe_price_id' => "price_1QOIZFD8jILs1cs66eW1k7lk",
            'price' => 50.00,
            'description' => $this->faker->sentences(
                asText: true,
            ),
        ];
    }
}
