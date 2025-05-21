import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { OrderLocationEnum } from '@/enums/order-location';
import { OrderTypeEnum } from '@/enums/order-type';
import { PaymentMethodEnum } from '@/enums/payment-method';
import CustomerLayout from '@/layouts/customer/layout';
import { Coupon } from '@/models/coupon';
import { Fee } from '@/models/fee';
import { TableModel } from '@/models/table';
import { Transaction, TransactionForm } from '@/models/transactions';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
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
}

export default function CheckoutPage({ transaction, coupons, tables, fees }: Props) {
    const { flash } = usePage().props as unknown as { flash: { snap_token: string } };
    const [showPaymentMethodCashDialog, setShowPaymentMethodCashDialog] = useState<boolean>(false);
    const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
    const [couponDiscount, setCouponDiscount] = useState<number>(0);

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
