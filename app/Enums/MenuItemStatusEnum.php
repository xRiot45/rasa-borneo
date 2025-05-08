<?php

namespace App\Enums;

enum MenuItemStatusEnum: string
{
    case AVAILABLE = 'tersedia';
    case UNAVAILABLE = 'habis';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
