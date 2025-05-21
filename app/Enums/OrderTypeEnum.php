<?php

namespace App\Enums;

enum OrderTypeEnum: string
{
    case DINEIN = 'makan di tempat';
    case TAKEAWAY = 'pesan lalu dibawa pulang';
    case DELIVERY = 'antar ke rumah';
    case PICKUP = 'ambil di tempat';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
