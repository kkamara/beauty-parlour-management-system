<?php

namespace App\Filament\Resources\V1\PreferredScheduleResource\Pages;

use App\Filament\Resources\V1\PreferredScheduleResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPreferredSchedule extends EditRecord
{
    protected static string $resource = PreferredScheduleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
