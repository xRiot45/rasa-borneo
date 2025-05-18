import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PaymentMethodEnum } from '@/enums/payment-method';
import { Icon } from '@iconify/react';

interface Props {
    selectedPaymentMethod: PaymentMethodEnum | null;
    setSelectedPaymentMethod: (value: PaymentMethodEnum) => void;
}

const iconsPaymentMethod = {
    CASH: <Icon icon="mdi:cash" width={24} height={24} />,
    CASHLESS: <Icon icon="streamline:bill-cashless" width={24} height={24} />,
};

const PaymentTypeSelection: React.FC<Props> = ({ selectedPaymentMethod, setSelectedPaymentMethod }) => {
    return (
        <div className="mt-2 space-y-3">
            <div className="mb-4">
                <h1 className="text-lg font-semibold">Metode Pembayaran</h1>
                <p className="text-muted-foreground text-sm">Pilih Metode Pembayaran Yang Tersedia</p>
            </div>
            <RadioGroup
                value={selectedPaymentMethod || ''}
                onValueChange={(value) => setSelectedPaymentMethod(value as PaymentMethodEnum)}
                className="grid w-full space-y-4 md:grid-cols-2"
            >
                {Object.entries(PaymentMethodEnum).map(([key, value]) => (
                    <Card
                        key={key}
                        className={`flex h-24 w-full cursor-pointer flex-row items-center gap-4 rounded-xl border px-8 py-6 shadow-none transition-colors ${selectedPaymentMethod === value ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black dark:bg-black dark:text-white'} `}
                        onClick={() => setSelectedPaymentMethod(value)}
                    >
                        <RadioGroupItem
                            value={value}
                            id={key}
                            className={`${selectedPaymentMethod === value ? 'bg-white dark:bg-black' : 'bg-transparent'}`}
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

export default PaymentTypeSelection;
