import SummaryRow from '@/components/summary-row';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { OrderLocationEnum } from '@/enums/order-location';
import { OrderTypeEnum } from '@/enums/order-type';
import { PaymentMethodEnum } from '@/enums/payment-method';
import CustomerLayout from '@/layouts/customer/layout';
import { cn } from '@/lib/utils';
import { Coupon } from '@/models/coupon';
import { Fee } from '@/models/fee';
import { TableModel } from '@/models/table';
import { Transaction, TransactionForm } from '@/models/transactions';
import { formatCurrency } from '@/utils/format-currency';
import { Icon } from '@iconify/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import OrderLocationSelection from './components/order-location-selection';
import OrderTypeSelection from './components/order-type-selection';
import PaymentTypeSelection from './components/payment-method-selection';

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

    console.log(flash);

    const {
        data: formData,
        setData,
        processing,
    } = useForm<Required<TransactionForm>>({
        order_type: OrderTypeEnum.DINEIN,
        order_location: OrderLocationEnum.ON_PREMISE,
        payment_method: PaymentMethodEnum.CASH,
        cash_received_amount: 0,
        dine_in_table_id: 0,
        dine_in_table_label: '',
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

    const handlePayWithCash = () => {
        router.put(route('transaction.payWithCash', { transactionCode: transaction?.transaction_code }), formData, {
            preserveScroll: true,
            onSuccess: () => {
                setShowPaymentMethodCashDialog(false);
                toast.success('Success', {
                    description: 'Transaksi Berhasil',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
            },
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    toast.error('Error', {
                        description: errors[key],
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                });
            },
        });
    };

    const handlePayWithMidtrans = () => {
        router.put(route('transaction.payWithMidtrans', { transactionCode: transaction?.transaction_code }), formData, {
            preserveScroll: true,
            onSuccess: () =>
                toast.success('Success', {
                    description: 'Silahkan melakukan pembayaran melalui midtrans',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                }),
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    toast.error('Error', {
                        description: errors[key],
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                });
            },
        });
    };

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
                                                <div className="flex flex-col items-end">
                                                    <Badge className="rounded-sm bg-gray-200 text-black">{item?.menu_item_category}</Badge>
                                                    <p className="text-md mt-4 font-bold">{formatCurrency(item?.menu_item_price * item.quantity)}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="space-y-8">
                                {/* Lokasi Anda */}
                                <OrderLocationSelection
                                    selectedOrderLocation={formData.order_location}
                                    setSelectedOrderLocation={handleOrderLocationChange}
                                />

                                {/* Metode Pemesanan */}
                                <OrderTypeSelection
                                    selectedOrderType={formData.order_type}
                                    setSelectedOrderType={handleOrderTypeChange}
                                    selectedOrderLocation={formData.order_location}
                                />

                                {/* Metode Pembayaran */}
                                <PaymentTypeSelection
                                    selectedPaymentMethod={formData.payment_method}
                                    setSelectedPaymentMethod={handlePaymentMethodChange}
                                />
                            </div>
                        </Card>

                        <Card className="sticky top-20 mt-4 h-fit w-full border p-6 shadow-none lg:mt-18">
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
                                    <span className="text-sm">{transaction?.transaction_code}</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                {/* Nomor Meja Select */}
                                {formData?.order_type === OrderTypeEnum.DINEIN && (
                                    <div>
                                        <Label>Pilih Meja</Label>
                                        <Select onValueChange={(value) => setData('dine_in_table_id', parseInt(value))}>
                                            <SelectTrigger className={cn('mt-2 w-full cursor-pointer rounded-lg py-6 shadow-none')}>
                                                <SelectValue placeholder="Pilih Meja" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {tables.map((item: TableModel) => {
                                                    return (
                                                        <SelectItem
                                                            key={item.id}
                                                            value={String(item.id)}
                                                            disabled={!item.is_available}
                                                            className="cursor-pointer p-4"
                                                        >
                                                            <Icon icon="material-symbols:table-restaurant" className="mr-2" />
                                                            {item.name} ({item.capacity} orang)
                                                            {!item.is_available && ' - Tidak tersedia'}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {/* Nama Pemesan & Nomor Telepon Pemesan */}
                                {formData?.order_type !== OrderTypeEnum.DELIVERY && (
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-3">
                                            <Label>Nama Pemesan</Label>
                                            <Input
                                                type="text"
                                                placeholder="Nama Pemesan"
                                                value={formData.orderer_name}
                                                onChange={(e) => setData('orderer_name', e.target.value)}
                                                className="w-full border py-6 shadow-none"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <Label>Nomor Telepon Pemesan</Label>
                                            <Input
                                                type="number"
                                                placeholder="Nomor Telepon Pemesan"
                                                value={formData.orderer_phone_number}
                                                onChange={(e) => setData('orderer_phone_number', e.target.value)}
                                                className="w-full border py-6 shadow-none"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Kupon Select */}
                                <div>
                                    <Label>Pilih Kupon Diskon</Label>
                                    <Select onValueChange={handleSelectCoupon} value={selectedCouponId ? String(selectedCouponId) : undefined}>
                                        <SelectTrigger className={cn('mt-2 w-full cursor-pointer rounded-lg py-6 shadow-none')}>
                                            <SelectValue placeholder="Pilih Kupon Diskon" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {coupons.map((item: Coupon) => {
                                                const isPercentage = item.type === 'percentage';
                                                const discountText = isPercentage ? `${item.discount}%` : `${formatCurrency(item?.discount)}`;
                                                const minPurchaseText = `Min. Belanja ${formatCurrency(item?.minimum_purchase)}`;
                                                const isDisabled = transaction?.subtotal_transaction_item < item.minimum_purchase;

                                                return (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={String(item.id)}
                                                        className="cursor-pointer p-4"
                                                        disabled={isDisabled}
                                                    >
                                                        <Icon icon="mdi:percent-circle-outline" className="mr-2" />
                                                        {`Diskon ${discountText} (${minPurchaseText})`}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Jumlah Uang Diterima */}
                                {formData?.payment_method === PaymentMethodEnum.CASH && (
                                    <div className="flex flex-col gap-3">
                                        <Label>Jumlah Uang yang Anda Bayarkan</Label>
                                        <Input
                                            type="number"
                                            placeholder="Jumlah Uang Diterima"
                                            value={formData.cash_received_amount}
                                            onChange={(e) => setData('cash_received_amount', parseInt(e.target.value))}
                                            className="w-full border py-6 shadow-none"
                                        />
                                    </div>
                                )}

                                {/* Note */}
                                <div className="flex flex-col gap-2">
                                    <Label>Tambahkan Catatan</Label>
                                    <Textarea
                                        className="mt-2 h-30 shadow-none"
                                        placeholder="Cth : Tambahkan sendok"
                                        onChange={(e) => setData('note', e.target.value)}
                                        value={formData.note}
                                    />
                                </div>
                            </div>

                            {formData.payment_method === PaymentMethodEnum.CASH && (
                                <p className="text-sm font-semibold text-red-500 italic">
                                    *Jika Anda memilih pembayaran tunai, pastikan untuk menyiapkan uang pas sesuai total akhir.
                                </p>
                            )}

                            <Separator />

                            {/* Rincian Pembayaran */}
                            <div className="space-y-4">
                                <SummaryRow label="Subtotal" value={formatCurrency(transaction?.subtotal_transaction_item)} />
                                {formData.order_type === OrderTypeEnum.DELIVERY && (
                                    <SummaryRow label="Biaya Pengiriman" value={formatCurrency(deliveryFee)} />
                                )}

                                <SummaryRow label="Biaya Layanan Aplikasi" value={formatCurrency(transaction?.application_service_fee)} />
                                <SummaryRow
                                    label="Diskon"
                                    value={couponDiscount > 0 ? `- ${formatCurrency(couponDiscount)}` : '- Rp. 0'}
                                    className="text-red-500"
                                />

                                <SummaryRow label="Total Akhir" value={formatCurrency(finalTotal)} />
                                {formData?.payment_method === PaymentMethodEnum.CASH && (
                                    <SummaryRow
                                        label="Kembalian"
                                        value={
                                            (formData.cash_received_amount ?? 0) >= finalTotal
                                                ? formatCurrency((formData.cash_received_amount ?? 0) - finalTotal)
                                                : formatCurrency(0)
                                        }
                                    />
                                )}
                            </div>

                            <Dialog open={showPaymentMethodCashDialog} onOpenChange={setShowPaymentMethodCashDialog}>
                                <Button
                                    type="submit"
                                    className="mt-4 w-full py-6 text-sm"
                                    disabled={processing}
                                    onClick={() => {
                                        if (formData.payment_method === PaymentMethodEnum.CASH) {
                                            setShowPaymentMethodCashDialog(true);
                                        } else {
                                            handlePayWithMidtrans();
                                        }
                                    }}
                                >
                                    <Icon icon={formData.payment_method === PaymentMethodEnum.CASH ? 'mdi:cash' : 'streamline:bill-cashless'} />
                                    {formData.payment_method === PaymentMethodEnum.CASH ? 'Bayar dengan Cash / Tunai' : 'Bayar dengan Midtrans'}
                                </Button>

                                <DialogContent>
                                    <AlertDialogHeader>
                                        <DialogTitle>Bayar dengan Tunai</DialogTitle>
                                    </AlertDialogHeader>
                                    <DialogDescription className="text-sm">
                                        Cek semua data pembayaran diatas dan pastikan sudah benar. Jika sudah benar, klik tombol dibawah ini untuk
                                        melanjutkan proses nya
                                    </DialogDescription>
                                    <AlertDialogFooter className="mt-4">
                                        <Button
                                            onClick={() => {
                                                handlePayWithCash();
                                                setShowPaymentMethodCashDialog(false);
                                            }}
                                        >
                                            Saya Mengerti & Lanjutkan Proses
                                        </Button>
                                    </AlertDialogFooter>
                                </DialogContent>
                            </Dialog>
                        </Card>
                    </div>
                </main>
            </CustomerLayout>
        </>
    );
}
