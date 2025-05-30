<?php

namespace App\Enums;

enum ReportTypeEnum: string
{
    case DAILY  = 'harian';

    case WEEKLY = 'mingguan';

    case MONTHLY = 'bulanan';

    case CUSTOM = 'custom';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
