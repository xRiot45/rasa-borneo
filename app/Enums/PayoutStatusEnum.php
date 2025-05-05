<?php

namespace App\Enums;

enum PayoutStatusEnum: string
{
    case QUEUED = 'queued';
    case PROCESSED = 'processed';
    case COMPLETED = 'completed';
    case FAILED = 'failed';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
