<?php

namespace App\Enums;

enum CouponTypeEnum: string
{
    case PERCENTAGE = 'percentage';
    case FIXED = 'fixed';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
