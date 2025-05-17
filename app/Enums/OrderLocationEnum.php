<?php

namespace App\Enums;

enum OrderLocationEnum: string
{
    case ON_PREMISE = 'di tempat';
    case OFF_PREMISE = 'di luar tempat';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
