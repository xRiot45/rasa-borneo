<?php

namespace App\Enums;

enum DayEnum: string
{
    case MONDAY = 'senin';

    case TUESDAY = 'selasa';

    case WEDNESDAY = 'rabu';

    case THURSDAY = 'kamis';

    case FRIDAY = 'jumat';

    case SATURDAY = 'sabtu';

    case SUNDAY = 'minggu';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
