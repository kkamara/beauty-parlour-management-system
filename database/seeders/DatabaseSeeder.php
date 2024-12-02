<?php

namespace Database\Seeders;

use App\Models\V1\User;
use App\Models\V1\Product;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->count(30)->create();
        User::factory()->create([
            'name' => 'Jane Doe',
            'email' => 'jane@doe.com',
        ]);
        Product::factory()->create([
            "name" => "Hair Styling",
        ]);
        Product::factory()->create([
            "name" => "Hair Colouring",
        ]);
        Product::factory()->create([
            "name" => "Hair Treatment",
        ]);
    }
}
