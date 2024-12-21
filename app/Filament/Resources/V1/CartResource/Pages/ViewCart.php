<?php

namespace App\Filament\Resources\V1\CartResource\Pages;

use App\Filament\Resources\V1\CartResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewCart extends ViewRecord
{
    protected static string $resource = CartResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
