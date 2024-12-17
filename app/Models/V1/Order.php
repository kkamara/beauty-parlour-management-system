<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Traits\Tappable;

class Order extends Model
{
    use Tappable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "user_ordered",
        "status",
        "price",
        "worker_assigned",
        "date_time",
        "queried",
    ];

    public function getFormattedPriceAttribute() {
        return "£".number_format(
            $this->price,
            2
        );
    }

    public function preferredSchedules() {
        return $this->hasMany(PreferredSchedule::class);
    }

    public function user() {
        return $this->belongsTo(User::class, "user_ordered");
    }

    public function orderProducts() {
        return $this->hasMany(OrderProduct::class);
    }
}
