<?php

namespace App\Filament\Resources\V1;

use App\Filament\Resources\V1\PreferredScheduleResource\Pages;
use App\Filament\Resources\V1\PreferredScheduleResource\RelationManagers;
use App\Models\V1\PreferredSchedule;
use Filament\Forms;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PreferredScheduleResource extends Resource
{
    protected static ?string $model = PreferredSchedule::class;

    protected static ?string $navigationIcon = 'heroicon-o-clock';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make("order")
                    ->relationship("order", "id")
                    ->required()
                    ->preload()
                    ->searchable(),
                DateTimePicker::make("date_time"),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make("order.user.name")
                    ->searchable(),
                TextColumn::make("order.id")
                    ->searchable(),
                TextColumn::make("date_time")
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPreferredSchedules::route('/'),
            'create' => Pages\CreatePreferredSchedule::route('/create'),
            'view' => Pages\ViewPreferredSchedule::route('/{record}'),
            'edit' => Pages\EditPreferredSchedule::route('/{record}/edit'),
        ];
    }
}
