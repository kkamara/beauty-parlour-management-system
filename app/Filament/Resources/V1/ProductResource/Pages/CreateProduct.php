<?php

namespace App\Filament\Resources\V1\ProductResource\Pages;

use App\Filament\Resources\V1\ProductResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateProduct extends CreateRecord
{
    protected static string $resource = ProductResource::class;
}
