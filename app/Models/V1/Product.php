<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Traits\Tappable;

class Product extends Model
{
    use Tappable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'stripe_product_id',
        'stripe_price_id',
        'price',
        'description',
    ];
}
