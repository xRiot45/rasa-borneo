<?php

namespace App\Enums;

enum VehicleTypeEnum: string
{
    case MOTORCYCLE = 'sepeda motor';
    case CAR = 'mobil';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
