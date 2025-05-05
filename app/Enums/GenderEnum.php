<?php

namespace App\Enums;

enum GenderEnum: string
{
    case MALE = 'laki-laki';
    case FEMALE = 'perempuan';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
