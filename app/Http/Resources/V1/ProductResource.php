<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "stripeProductId" => $this->stripe_product_id,
            "stripePriceId" => $this->stripe_price_id,
            "price" => $this->price,
            "formattedPrice" => $this->formatted_price,
            "description" => $this->description,
        ];
    }
}
