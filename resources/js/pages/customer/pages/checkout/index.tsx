import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { OrderLocationEnum } from '@/enums/order-location';
import { OrderTypeEnum } from '@/enums/order-type';
import { PaymentMethodEnum } from '@/enums/payment-method';
import CustomerLayout from '@/layouts/customer/layout';
import { Coupon } from '@/models/coupon';
import { CustomerAddress } from '@/models/customer-address';
import { Fee } from '@/models/fee';
import { TableModel } from '@/models/table';
import { Transaction, TransactionForm } from '@/models/transactions';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { MapPin } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import CustomerAddressDialog from './components/checkout-payment-details/customer-address-dialog';
import Header from './components/checkout-payment-details/header';
import OrderDetailsForm from './components/checkout-payment-details/order-details-form';
import PaymentActionButton from './components/checkout-payment-details/payment-action-button';
import TransactionSummary from './components/checkout-payment-details/transaction-summary';
import CheckoutLocationSelector from './components/checkout-summary/checkout-location-selector';
import CheckoutMenuList from './components/checkout-summary/checkout-menu-list';
import CheckoutOrderTypeSelector from './components/checkout-summary/checkout-order-type-selector';
import CheckoutPaymentMethodSelector from './components/checkout-summary/checkout-payment-method-selector';

interface Props {
    transaction: Transaction;
    coupons: Coupon[];
    tables: TableModel[];
    fees: Fee;
    customerAddress: CustomerAddress[];
}

export default function CheckoutPage({ transaction, coupons, tables, fees, customerAddress }: Props) {
    const { flash } = usePage().props as unknown as { flash: { snap_token: string } };
    const [showPaymentMethodCashDialog, setShowPaymentMethodCashDialog] = useState<boolean>(false);
    const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
    const [couponDiscount, setCouponDiscount] = useState<number>(0);
    const [showAddressDialog, setShowAddressDialog] = useState(false);

    const {
        data: formData,
        put,
        setData,
        processing,
        errors,
    } = useForm<Required<TransactionForm>>({
        order_type: OrderTypeEnum.DINEIN,
        order_location: OrderLocationEnum.ON_PREMISE,
        payment_method: PaymentMethodEnum.CASH,
        cash_received_amount: 0,
        dine_in_table_id: null,
        orderer_name: '',
        orderer_phone_number: '',
        coupon_id: 0,
        note: '',
    });

    const deliveryFee = formData?.order_type === OrderTypeEnum.DELIVERY ? fees?.delivery_fee?.amount : 0;
    const finalTotal = transaction?.subtotal_transaction_item + deliveryFee + transaction?.application_service_fee - couponDiscount;

    const handleSelectCoupon = (value: string) => {
        const couponId = parseInt(value);
        setSelectedCouponId(couponId);
        setData('coupon_id', couponId);

        const selectedCoupon = coupons.find(
            (c) => c.id === couponId && c.is_active && new Date() >= new Date(c.start_date) && new Date() <= new Date(c.end_date),
        );

        if (selectedCoupon && transaction?.subtotal_transaction_item >= selectedCoupon.minimum_purchase) {
            const discountValue =
                selectedCoupon.type === 'percentage'
                    ? (transaction?.subtotal_transaction_item * selectedCoupon.discount) / 100
                    : selectedCoupon.discount;

            setCouponDiscount(discountValue);
        } else {
            setCouponDiscount(0);
        }
    };

    const handleOrderLocationChange = (orderLocation: OrderLocationEnum) => {
        setData('order_location', orderLocation);
    };

    const handleOrderTypeChange = (orderType: OrderTypeEnum) => {
        setData('order_type', orderType);
        if (orderType === OrderTypeEnum.DINEIN) {
            setData('dine_in_table_id', 0);
            setData('orderer_name', '');
            setData('orderer_phone_number', '');
        }
    };

    const handlePaymentMethodChange = (paymentMethod: PaymentMethodEnum) => {
        setData('payment_method', paymentMethod);
        if (paymentMethod !== PaymentMethodEnum.CASH) {
            setData('cash_received_amount', 0);
        }
    };

    const handlePay = useCallback(
        (method: PaymentMethodEnum) => {
            const routeName = method === PaymentMethodEnum.CASH ? 'transaction.payWithCash' : 'transaction.payWithMidtrans';

            put(route(routeName, { transactionCode: transaction.transaction_code }), {
                preserveScroll: true,
                onSuccess: () => {
                    if (method === PaymentMethodEnum.CASH) {
                        setShowPaymentMethodCashDialog(false);
                    }

                    toast.success('Success', {
                        description: method === PaymentMethodEnum.CASH ? 'Transaksi Berhasil' : 'Silahkan melakukan pembayaran melalui Midtrans',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                },
                onError: (errors) => {
                    Object.values(errors).forEach((err) =>
                        toast.error('Error', {
                            description: err,
                            action: {
                                label: 'Tutup',
                                onClick: () => toast.dismiss(),
                            },
                        }),
                    );
                },
            });
        },
        [put, transaction],
    );

    useEffect(() => {
        if (flash?.snap_token) {
            window.snap.pay(flash.snap_token);
        }
    }, [flash?.snap_token]);

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
                        <Card className="col-span-2 border-none shadow-none">
                            {/* Menu Yang Dipesan */}
                            <CheckoutMenuList transaction={transaction} />

                            <div className="space-y-8">
                                {/* Lokasi Anda */}
                                <CheckoutLocationSelector
                                    selectedOrderLocation={formData.order_location}
                                    setSelectedOrderLocation={handleOrderLocationChange}
                                />

                                {/* Metode Pemesanan */}
                                <CheckoutOrderTypeSelector
                                    selectedOrderType={formData.order_type}
                                    setSelectedOrderType={handleOrderTypeChange}
                                    selectedOrderLocation={formData.order_location}
                                />

                                {/* Metode Pembayaran */}
                                <CheckoutPaymentMethodSelector
                                    selectedPaymentMethod={formData.payment_method}
                                    setSelectedPaymentMethod={handlePaymentMethodChange}
                                />
                            </div>
                        </Card>

                        <Card className="sticky top-20 mt-4 h-fit w-full border p-6 shadow-none lg:mt-18">
                            {/* Header */}
                            <Header transaction={transaction} />

                            <Separator />

                            {/* Alamat Customer */}
                            {formData?.order_type === OrderTypeEnum.DELIVERY && (
                                <>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-semibold">Alamat Pengiriman</h3>

                                        {customerAddress?.length > 0 ? (
                                            <Button
                                                variant="ghost"
                                                className="text-primary text-sm underline"
                                                onClick={() => setShowAddressDialog(true)}
                                            >
                                                Pilih Alamat Lain
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                className="text-primary text-sm underline"
                                                onClick={() => router.visit(route('address-list.index'))}
                                            >
                                                Tambah Alamat
                                            </Button>
                                        )}
                                    </div>

                                    {customerAddress?.length > 0 ? (
                                        customerAddress.map((item, index) =>
                                            item.is_primary ? (
                                                <Card
                                                    key={index}
                                                    className="relative rounded-2xl border border-green-300 bg-green-50 shadow-none transition-all duration-300 dark:border-green-500 dark:bg-green-950"
                                                >
                                                    <CardContent className="space-y-5 p-6">
                                                        <div className="flex items-center gap-2">
                                                            <h1 className="text-md font-semibold text-black capitalize dark:text-white">
                                                                {item.address_label}
                                                            </h1>
                                                            <Badge className="rounded bg-gray-200 text-xs font-medium text-gray-600 dark:bg-green-500/10 dark:text-green-400">
                                                                Alamat Utama
                                                            </Badge>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                                {item.recipient_name}
                                                            </h3>
                                                            <p className="text-muted-foreground text-sm dark:text-zinc-400">{item.phone_number}</p>
                                                            <p className="text-muted-foreground text-sm dark:text-zinc-400">{item.email}</p>
                                                        </div>
                                                        <div className="text-muted-foreground flex items-start gap-2 text-sm dark:text-zinc-400">
                                                            <MapPin className="mt-0.5 h-4 w-4 text-green-600 dark:text-green-400" />
                                                            <p>{item.complete_address}</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ) : null,
                                        )
                                    ) : (
                                        <div className="text-muted-foreground mt-4 rounded-xl border border-dashed p-4 text-center text-sm dark:border-zinc-700 dark:text-zinc-400">
                                            Alamat belum tersedia. Silakan tambahkan alamat terlebih dahulu.
                                        </div>
                                    )}

                                    <CustomerAddressDialog open={showAddressDialog} onOpenChange={setShowAddressDialog} addresses={customerAddress} />
                                </>
                            )}

                            <Separator />

                            {/* Form Tambahan */}
                            <OrderDetailsForm
                                formData={formData}
                                errors={errors}
                                setData={setData}
                                transaction={transaction}
                                tables={tables}
                                coupons={coupons}
                                handleSelectCoupon={handleSelectCoupon}
                                selectedCouponId={selectedCouponId}
                                finalTotal={finalTotal}
                            />

                            <Separator />

                            {/* Rincian Pembayaran */}
                            <TransactionSummary
                                transaction={transaction}
                                formData={formData}
                                couponDiscount={couponDiscount}
                                deliveryFee={deliveryFee}
                                finalTotal={finalTotal}
                            />

                            {/* Tombol Bayar */}
                            <PaymentActionButton
                                processing={processing}
                                formData={formData}
                                handlePay={handlePay}
                                setShowPaymentMethodCashDialog={setShowPaymentMethodCashDialog}
                                showPaymentMethodCashDialog={showPaymentMethodCashDialog}
                            />
                        </Card>
                    </div>
                </main>
            </CustomerLayout>
        </>
    );
}
