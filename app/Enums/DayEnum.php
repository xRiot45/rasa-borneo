<?php

namespace App\Enums;

enum DayEnum: string
{
    case MONDAY = 'MONDAY';

    case TUESDAY = 'TUESDAY';

    case WEDNESDAY = 'WEDNESDAY';

    case THURSDAY = 'THURSDAY';

    case FRIDAY = 'FRIDAY';

    case SATURDAY = 'SATURDAY';

    case SUNDAY = 'SUNDAY';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
