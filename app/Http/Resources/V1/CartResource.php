<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "user" => $this->user,
            "product" => $this->product,
            "quantity" => $this->quantity,
            "price" => $this->price,
            "formattedPrice" => $this->formatted_price,
        ];
    }
}
