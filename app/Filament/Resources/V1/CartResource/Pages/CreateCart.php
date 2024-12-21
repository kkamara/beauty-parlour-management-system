<?php

namespace App\Filament\Resources\V1\CartResource\Pages;

use App\Filament\Resources\V1\CartResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateCart extends CreateRecord
{
    protected static string $resource = CartResource::class;
}
