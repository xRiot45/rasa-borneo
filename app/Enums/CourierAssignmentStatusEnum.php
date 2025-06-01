<?php

namespace App\Enums;

enum CourierAssignmentStatusEnum: string
{
    case PENDING = 'menunggu';

    case ACCEPTED = 'diterima';

    case REJECTED = 'ditolak';

    case CANCELED = 'dibatalkan';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
