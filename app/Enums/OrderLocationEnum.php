<?php

namespace App\Enums;

enum OrderLocationEnum: string
{
    case ON_PREMISE = 'di lokasi';
    case OFF_PREMISE = 'di luar lokasi';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
