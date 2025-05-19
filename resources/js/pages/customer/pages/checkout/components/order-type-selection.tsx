import { CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OrderLocationEnum } from '@/enums/order-location';
import { OrderTypeEnum } from '@/enums/order-type';
import { Icon } from '@iconify/react';

interface Props {
    selectedOrderType: OrderTypeEnum | null;
    setSelectedOrderType: (value: OrderTypeEnum) => void;
    selectedOrderLocation: OrderLocationEnum | null;
}

const iconsOrderType = {
    DINEIN: <Icon icon="mdi:food" width={24} height={24} />,
    TAKEAWAY: <Icon icon="solar:bag-bold" width={24} height={24} />,
    DELIVERY: <Icon icon="mdi:truck-delivery" width={24} height={24} />,
    PICKUP: <Icon icon="tdesign:undertake-delivery-filled" width={24} height={24} />,
};

const OrderTypeSelection: React.FC<Props> = ({ selectedOrderType, setSelectedOrderType, selectedOrderLocation }) => {
    const getFilteredOrderTypes = (orderLocation: OrderLocationEnum | null): [string, OrderTypeEnum][] => {
        if (orderLocation === OrderLocationEnum.ON_PREMISE) {
            return Object.entries(OrderTypeEnum).filter(([key]) => key === 'DINEIN' || key === 'TAKEAWAY');
        } else if (orderLocation === OrderLocationEnum.OFF_PREMISE) {
            return Object.entries(OrderTypeEnum).filter(([key]) => key === 'DELIVERY' || key === 'PICKUP');
        }

        return [];
    };

    return (
        <div className="mt-2">
            <div className="mb-4">
                <h1 className="text-lg font-semibold">Metode Pemesanan</h1>
                <p className="text-muted-foreground text-sm">Pilih Metode Pemesanan Yang Tersedia Berdasarkan Lokasi Anda</p>
            </div>
            <RadioGroup
                value={selectedOrderType || ''}
                onValueChange={(value) => setSelectedOrderType(value as OrderTypeEnum)}
                className="grid w-full md:grid-cols-2"
            >
                {getFilteredOrderTypes(selectedOrderLocation).map(([key, value]) => (
                    <CardContent
                        key={key}
                        className={`flex h-24 w-full cursor-pointer flex-row items-center gap-4 rounded-xl border px-8 py-6 shadow-none transition-colors ${
                            selectedOrderType === value
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'bg-white text-black dark:bg-black dark:text-white'
                        }`}
                        onClick={() => setSelectedOrderType(value)}
                    >
                        <RadioGroupItem
                            value={value}
                            id={key}
                            className={`${selectedOrderType === value ? 'bg-white dark:bg-black' : 'bg-transparent'}`}
                        />
                        {iconsOrderType[key as keyof typeof iconsOrderType]}
                        <div>
                            <h1 className="font-medium capitalize">{value}</h1>
                        </div>
                    </CardContent>
                ))}
            </RadioGroup>
        </div>
    );
};

export default OrderTypeSelection;
