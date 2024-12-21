<?php

namespace App\Filament\Resources\V1\PreferredScheduleResource\Pages;

use App\Filament\Resources\V1\PreferredScheduleResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewPreferredSchedule extends ViewRecord
{
    protected static string $resource = PreferredScheduleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
