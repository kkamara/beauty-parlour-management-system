<?php

namespace App\Filament\Resources\V1;

use App\Filament\Resources\V1\UserResource\Pages;
use App\Filament\Resources\V1\UserResource\RelationManagers;
use App\Filament\Resources\V1\UserResource\RelationManagers\CartsRelationManager;
use App\Models\V1\User;
use Filament\Forms;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make("Details")->schema([
                    TextInput::make("name"),
                    TextInput::make("email"),
                ]),
                Section::make("Date & Time")->schema([
                    DateTimePicker::make("created_at")
                        ->readOnly(),
                    DateTimePicker::make("updated_at")
                        ->readOnly(),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make("name")
                    ->searchable(),
                TextColumn::make("email")
                    ->searchable(),
                TextColumn::make("created_at")
                    ->searchable(),
                TextColumn::make("updated_at")
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
            CartsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'view' => Pages\ViewUser::route('/{record}'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
