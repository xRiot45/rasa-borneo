import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { OrderLocationEnum } from '@/enums/order-location';
import { OrderTypeEnum } from '@/enums/order-type';
import { PaymentMethodEnum } from '@/enums/payment-method';
import CustomerLayout from '@/layouts/customer/layout';
import { Coupon } from '@/models/coupon';
import { Transaction, TransactionForm } from '@/models/transactions';
import { formatCurrency } from '@/utils/format-currency';
import { Head, useForm } from '@inertiajs/react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import OrderLocationSelection from './components/order-location-selection';
import OrderTypeSelection from './components/order-type-selection';
import PaymentTypeSelection from './components/payment-method-selection';

interface Props {
    transaction: Transaction;
    coupons: Coupon[];
}

export default function CheckoutPage({ transaction }: Props) {
    // const { flash } = usePage().props as unknown as { flash: { snap_token: string } };

    const { data: formData, setData } = useForm<Required<TransactionForm>>({
        order_type: OrderTypeEnum.DINEIN,
        order_location: OrderLocationEnum.ON_PREMISE,
        payment_method: PaymentMethodEnum.CASH,
        cash_received_amount: 0,
        delivery_note: '',
        dine_in_table_id: 0,
        dine_in_table_label: '',
        orderer_name: '',
        orderer_phone_number: '',
        coupon_id: 0,
        note: '',
    });

    const handleOrderLocationChange = (orderLocation: OrderLocationEnum) => {
        setData('order_location', orderLocation);
    };

    const handleOrderTypeChange = (orderType: OrderTypeEnum) => {
        setData('order_type', orderType);
        if (orderType === OrderTypeEnum.DINEIN) setData('dine_in_table_id', 0);
    };

    const handlePaymentMethodChange = (paymentMethod: PaymentMethodEnum) => {
        setData('payment_method', paymentMethod);
        if (paymentMethod !== PaymentMethodEnum.CASH) setData('cash_received_amount', 0);
    };

    return (
        <>
            <Head title="Checkout" />
            <CustomerLayout>
                <main className="mt-22">
                    <div>
                        <h2 className="text-lg font-bold">Checkout Pesanan</h2>
                        <p className="text-muted-foreground text-sm">
                            Tinjau pesanan anda dan pilih metode pembayaran serta metode pemesanan yang sesuai
                        </p>
                    </div>

                    <Alert variant="destructive" className="mt-8 rounded-lg py-6">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle className="mt-[-4px] text-lg">Perhatian</AlertTitle>
                        <AlertDescription>
                            Jika sudah menyelesaikan pesanan maka pesanan tidak dapat dilakukan refund kembali, harap cek dengan baik pesanan anda
                            sebelum menyelesaikan pesanan.
                        </AlertDescription>
                    </Alert>

                    <div className="mt-8 grid min-h-screen grid-cols-1 lg:grid-cols-3 lg:gap-4">
                        <div className="col-span-2 space-y-8">
                            {/* Menu Yang Dipesan */}
                            <div className="mt-2 space-y-4">
                                <div className="mb-4">
                                    <h1 className="text-lg font-semibold">Menu Yang Dipesan</h1>
                                    <p className="text-muted-foreground text-sm font-medium">Total Menu : {transaction.transaction_items?.length}</p>
                                </div>
                                {transaction.transaction_items?.map((item) => (
                                    <Card key={item.id} className="px-2 shadow-none">
                                        <CardContent className="flex items-center gap-4 p-4">
                                            <img
                                                src={item.menu_item_image_url}
                                                alt={item.menu_item_name}
                                                className="h-20 w-20 rounded-lg border object-cover"
                                            />
                                            <div className="flex w-full items-center justify-between">
                                                <div className="space-y-1">
                                                    <h3 className="text-lg font-semibold">{item.menu_item_name}</h3>
                                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-200">Jumlah : {item.quantity}</p>
                                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                                        {formatCurrency(item.menu_item_price)} / Menu
                                                    </p>
                                                </div>
                                                <div>
                                                    <Badge className="rounded-sm bg-gray-200 text-black">{item.menu_item_category}</Badge>
                                                    <p className="text-md mt-4 font-bold">{formatCurrency(item.menu_item_price * item.quantity)}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Lokasi Anda */}
                            <OrderLocationSelection
                                selectedOrderLocation={formData.order_location}
                                setSelectedOrderLocation={handleOrderLocationChange}
                            />

                            {/* Metode Pemesanan */}
                            <OrderTypeSelection selectedOrderType={formData.order_type} setSelectedOrderType={handleOrderTypeChange} />

                            {/* Metode Pembayaran */}
                            <PaymentTypeSelection
                                selectedPaymentMethod={formData.payment_method}
                                setSelectedPaymentMethod={handlePaymentMethodChange}
                            />
                        </div>

                        <Card className="sticky top-20 mt-4 h-fit w-full border p-7 shadow-none lg:mt-18">
                            <div className="flex items-center justify-between">
                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-md mb-1 font-bold">Rincian Pembayaran</h1>
                                        <span className="text-sm">
                                            {new Date().toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <span className="text-sm font-semibold">{transaction?.transaction_code}</span>
                                </div>
                            </div>

                            <Separator />
                        </Card>
                    </div>
                </main>
            </CustomerLayout>
        </>
    );
}
