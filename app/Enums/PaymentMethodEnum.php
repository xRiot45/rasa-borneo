<?php

namespace App\Enums;

enum PaymentMethodEnum: string
{
    case CASH = 'tunai';

    case CASHLESS = 'non tunai';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
