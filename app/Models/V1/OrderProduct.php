<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Traits\Tappable;

class OrderProduct extends Model
{
    use Tappable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "order_id",
        "name",
        "stripe_product_id",
        "stripe_price_id",
        "price",
        "description",
    ];

    public function order() {
        return $this->belongsTo(Order::class);
    }
}
