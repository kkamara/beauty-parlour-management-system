<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Pagination\JSONStandardPaginatedResourceResponse;

class ProductCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }

    public function toResponse($request)
    {
        return (new JSONStandardPaginatedResourceResponse($this))
            ->toResponse($request);
    }
}