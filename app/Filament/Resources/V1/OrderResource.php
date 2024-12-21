<?php

namespace App\Filament\Resources\V1;

use App\Filament\Resources\V1\OrderResource\Pages;
use App\Filament\Resources\V1\OrderResource\RelationManagers;
use App\Filament\Resources\V1\OrderResource\RelationManagers\OrderProductsRelationManager;
use App\Filament\Resources\V1\OrderResource\RelationManagers\PreferredSchedulesRelationManager;
use App\Models\V1\Order;
use Filament\Forms;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-credit-card';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Group::make()->schema([
                    Section::make("User")->schema([
                        Select::make("user")
                            ->relationship("user", "name")
                            ->searchable()
                            ->required()
                            ->preload()
                            ->searchable(),
                    ]),
                ]),
                Group::make()->schema([
                    Section::make("Order")->schema([
                        TextInput::make("status")
                            ->required(),
                        TextInput::make("price")
                            ->required(),
                        TextInput::make("created_at")
                            ->required(),
                    ]),
                ]),
                Group::make()->schema([
                    Section::make("Assigned")->schema([
                        TextInput::make("worker_assigned"),
                        TextInput::make("date_time"),
                    ]),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make("user.name")
                    ->searchable(),
                TextColumn::make("status")
                    ->searchable(),
                TextColumn::make("price")
                    ->searchable(),
                TextColumn::make("worker_assigned")
                    ->searchable(),
                TextColumn::make("date_time")
                    ->searchable(),
                TextColumn::make("created_at")
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
            PreferredSchedulesRelationManager::class,
            OrderProductsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'view' => Pages\ViewOrder::route('/{record}'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
