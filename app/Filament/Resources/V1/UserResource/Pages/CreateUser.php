<?php

namespace App\Filament\Resources\V1\UserResource\Pages;

use App\Filament\Resources\V1\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateUser extends CreateRecord
{
    protected static string $resource = UserResource::class;
}