<?php

namespace App\Filament\Resources\V1\OrderResource\Pages;

use App\Filament\Resources\V1\OrderResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateOrder extends CreateRecord
{
    protected static string $resource = OrderResource::class;
}
