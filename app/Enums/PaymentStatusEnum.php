<?php

namespace App\Enums;

enum PaymentStatusEnum: string
{
    case PENDING = 'menunggu';

    case PAID = 'dibayar';

    case FAILED = 'gagal';

    case CANCELLED = 'dibatalkan';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
