<?php

namespace App\Enums;

enum OrderStatusEnum: string
{
    case PENDING = 'menunggu';                 // Order baru

    case CONFIRMED = 'dikonfirmasi';             // Order dikonfirmasi

    case PROCESSING = 'diproses';             // Order dikonfirmasi & diproses

    case READY_FOR_DELIVERY = 'siap diantar';   // Makanan siap diantar

    case READY_TO_SERVE = 'siap disajikan';     // Makanan siap disajikan

    case DELIVERING = 'diantar';             // Kurir sedang mengantar

    case COMPLETED = 'selesai';               // Order selesai (sudah diterima customer)

    case CANCELLED = 'dibatalkan';               // Order dibatalkan

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
