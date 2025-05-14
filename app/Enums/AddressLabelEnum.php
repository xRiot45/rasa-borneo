<?php

namespace App\Enums;

enum AddressLabelEnum: string
{
    case HOME = 'rumah';

    case OFFICE = 'kantor';

    case APARTEMENT = 'apartemen';

    case BOARDINGHOUSE = 'kos';

    case OTHERS = 'lainnya';

    public static function values(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
