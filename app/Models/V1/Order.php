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
        "price",
        "worker_assigned",
        "date_time",
        "queried",
    ];

    public function preferredSchedules() {
        return $this->hasMany(PreferredSchedule::class);
    }

    public function user() {
        return $this->belongsTo(User::class, "user_ordered");
    }
}
