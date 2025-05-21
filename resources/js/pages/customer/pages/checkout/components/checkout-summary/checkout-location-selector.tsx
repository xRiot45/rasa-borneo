import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OrderLocationEnum } from '@/enums/order-location';
import { Icon } from '@iconify/react';

interface Props {
    selectedOrderLocation: OrderLocationEnum | null;
    setSelectedOrderLocation: (value: OrderLocationEnum) => void;
}

const iconsPaymentMethod = {
    ON_PREMISE: <Icon icon="mingcute:location-line" width={24} height={24} />,
    OFF_PREMISE: <Icon icon="material-symbols:location-off-outline" width={24} height={24} />,
};

const CheckoutLocationSelector: React.FC<Props> = ({ selectedOrderLocation, setSelectedOrderLocation }) => {
    return (
        <div className="mt-2">
            <div className="mb-4">
                <h1 className="text-lg font-semibold">Lokasi Anda</h1>
                <p className="text-muted-foreground text-sm">Pilih Lokasi Anda Saat Ini</p>
            </div>
            <RadioGroup
                value={selectedOrderLocation || ''}
                onValueChange={(value) => setSelectedOrderLocation(value as OrderLocationEnum)}
                className="grid w-full md:grid-cols-2"
            >
                {Object.entries(OrderLocationEnum).map(([key, value]) => (
                    <Card
                        key={key}
                        className={`flex h-24 w-full cursor-pointer flex-row items-center gap-4 rounded-xl border px-8 py-6 shadow-none transition-colors ${selectedOrderLocation === value ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black dark:bg-black dark:text-white'} `}
                        onClick={() => setSelectedOrderLocation(value)}
                    >
                        <RadioGroupItem
                            value={value}
                            id={key}
                            className={`${selectedOrderLocation === value ? 'bg-white dark:bg-black' : 'bg-transparent'}`}
                        />
                        {iconsPaymentMethod[key as keyof typeof iconsPaymentMethod]}
                        <div>
                            {/* <p className="font-bold">{key.replace('_', ' ')}</p> */}
                            <h1 className="font-medium capitalize">{value}</h1>
                        </div>
                    </Card>
                ))}
            </RadioGroup>
        </div>
    );
};

export default CheckoutLocationSelector;
