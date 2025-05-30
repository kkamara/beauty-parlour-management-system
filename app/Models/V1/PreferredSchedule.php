<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Traits\Tappable;

class PreferredSchedule extends Model
{
    use Tappable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "order_id",
        "date_time",
    ];

    public function order() {
        return $this->belongsTo(Order::class);
    }
}
