<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            "userOrdered" => new UserResource($this->user),
            "status" => $this->status,
            "price" => $this->price,
            "workerAssigned" => $this->worker_assigned,
            "dateTime" => $this->date_time,
            "queried" => $this->queried,
            "orderProducts" => new OrderProductCollection($this->orderProducts),
            "formattedPrice" => $this->formatted_price,
            "preferredSchedules" => new PreferredScheduleCollection($this->preferredSchedules),
        ];
    }
}
