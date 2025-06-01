<?php

namespace App\Enums;

enum CourierEarningStatusEnum: string
{
    case PENDING = 'menunggu';

    case AVAILABLE = 'tersedia';

    case WITHDRAWN = 'ditarik';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
