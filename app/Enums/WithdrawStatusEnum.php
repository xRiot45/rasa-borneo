<?php

namespace App\Enums;

enum WithdrawStatusEnum: string
{
    case PENDING = 'menunggu';

    case APPROVED = 'disetujui';

    case REJECTED = 'ditolak';

    case CANCELED = 'dibatalkan';

    case TRANSFERED = 'ditransfer';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
