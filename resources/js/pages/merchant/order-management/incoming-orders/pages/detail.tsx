import OrderProgress from '@/components/order-status';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OrderStatusEnum } from '@/enums/order-status';
import { OrderTypeEnum } from '@/enums/order-type';
import { PaymentMethodEnum } from '@/enums/payment-method';
import { PaymentStatusEnum } from '@/enums/payment-status';
import MerchantLayout from '@/layouts/merchant/layout';
import { Order } from '@/models/order';
import { TransactionItem } from '@/models/transactions';
import { BreadcrumbItem } from '@/types';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { paymentStatusColorMap } from '@/utils/payment-status-color';
import { Icon } from '@iconify/react';
import { Head, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'sonner';
import ButtonPartials from './components/button-partials';

interface Props {
    order: Order;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pesanan',
        href: '#',
    },
    {
        title: 'Pesanan Masuk',
        href: '/admin/order-management/incoming-order',
    },
    {
        title: 'Detail Pesanan',
        href: '#',
    },
];

export default function OrderDetailPage({ order }: Props) {
    const {
        transaction_code,
        orderer_name,
        orderer_phone_number,
        recipient_address,
        recipient_phone_number,
        recipient_name,
        recipient_email,
        recipient_address_label,
        order_type,
        order_location,
        payment_method,
        payment_status,
        dine_in_table_label,
        note,
        cash_received_amount,
        change_amount,
        coupon_code,
        coupon_type,
        coupon_discount,
        transaction_items,
        subtotal_transaction_item,
        application_service_fee,
        discount_total,
        final_total,
        delivery_fee,
        checked_out_at,
        order_status,
    } = order;

    const contentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({ contentRef, documentTitle: `Invoice - ${transaction_code}` });

    const statusKey = payment_status as PaymentStatusEnum;
    const badgeClass = paymentStatusColorMap[statusKey] ?? 'bg-gray-300 text-black';

    const [latestStatus, setLatestStatus] = useState<string>(order_status?.[order_status.length - 1]?.status || '');
    const [showDialogUpdateOrderStatus, setShowDialogUpdateOrderStatus] = useState<boolean>(false);

    const availableStatuses = Object.values(OrderStatusEnum).filter((status) => {
        if (order_type !== OrderTypeEnum.DELIVERY && (status === OrderStatusEnum.READY_FOR_DELIVERY || status === OrderStatusEnum.DELIVERING)) {
            return false;
        }

        if (order_type === OrderTypeEnum.DELIVERY && status === OrderStatusEnum.READY_TO_SERVE) {
            return false;
        }

        return true;
    });

    const handleStatusChange = (value: string) => {
        setLatestStatus(value);
    };

    const confirmUpdateStatus = () => {
        if (!latestStatus) {
            toast.error('Pilih status terlebih dahulu!');
            return;
        }
        setShowDialogUpdateOrderStatus(true);
    };

    const handleUpdateStatus = () => {
        router.put(
            route('merchant.incoming-order.updateOrderStatus', transaction_code),
            { status: latestStatus },
            {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Status Pesanan Berhasil Diubah!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });

                    setShowDialogUpdateOrderStatus(false);
                },
                onError: (error) => {
                    Object.keys(error).forEach((key) => {
                        toast.error('Error', {
                            description: error[key],
                            action: {
                                label: 'Tutup',
                                onClick: () => toast.dismiss(),
                            },
                        });
                    });
                },
            },
        );
    };

    return (
        <>
            <Head title="Detail Pesanan" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-6 p-6">
                    <ButtonPartials handlePrint={handlePrint} />

                    <div className="grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-x-6">
                        <div className="col-span-2 grid space-y-6">
                            {/* Order Progress */}
                            <OrderProgress transactionCode={transaction_code} orderStatus={order_status} />

                            <section ref={contentRef} className="space-y-6">
                                <Card className="print p-4 shadow-none">
                                    <CardContent className="space-y-4 p-4">
                                        <h2 className="text-lg font-semibold">Informasi Pemesanan</h2>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-4">
                                                <p className="capitalize">
                                                    <strong>Kode Transaksi :</strong> {transaction_code}
                                                </p>
                                                {order_type !== OrderTypeEnum.DELIVERY && (
                                                    <>
                                                        <p className="capitalize">
                                                            <strong>Nama Pemesan :</strong> {orderer_name || '-'}
                                                        </p>
                                                        <p className="capitalize">
                                                            <strong>No. HP Pemesan :</strong> {orderer_phone_number || '-'}
                                                        </p>
                                                    </>
                                                )}

                                                <p className="capitalize">
                                                    <strong>Metode Pemesanan :</strong> {order_type || '-'} ({order_location || '-'})
                                                </p>
                                                {order_type === OrderTypeEnum.DINEIN && (
                                                    <p className="capitalize">
                                                        <strong>Nomor Meja :</strong> {dine_in_table_label || '-'}
                                                    </p>
                                                )}
                                                <p className="capitalize">
                                                    <strong>Catatan :</strong> {note || '-'}
                                                </p>

                                                <p>
                                                    <strong>Tanggal & Waktu Pemesanan :</strong> {formatDate(checked_out_at ?? '')}
                                                </p>
                                            </div>
                                            <div className="space-y-4">
                                                <p className="capitalize">
                                                    <strong>Metode Pembayaran : </strong>
                                                    <Badge
                                                        variant="default"
                                                        className={`rounded-sm font-bold capitalize ${PaymentMethodEnum.CASH === payment_method ? 'bg-green-600' : 'bg-blue-600'}`}
                                                    >
                                                        {payment_method?.toUpperCase()}
                                                    </Badge>
                                                </p>
                                                <p className="capitalize">
                                                    <strong>Status Pembayaran : </strong>
                                                    <Badge variant="default" className={`rounded-sm font-bold capitalize ${badgeClass}`}>
                                                        {payment_status?.toUpperCase() || 'UNKNOWN'}
                                                    </Badge>
                                                </p>

                                                {coupon_code && (
                                                    <p>
                                                        <strong>Kupon:</strong> {coupon_code} | Diskon (
                                                        {coupon_type === 'percentage' ? `${coupon_discount}%` : `${formatCurrency(coupon_discount)}`})
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {order_type === OrderTypeEnum.DELIVERY && (
                                    <Card className="print p-4 shadow-none">
                                        <CardContent className="space-y-4 p-4">
                                            <h2 className="text-lg font-semibold">Informasi Pengiriman</h2>

                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="space-y-4">
                                                    <p className="capitalize">
                                                        <strong>Nama Penerima :</strong> {recipient_name || '-'}
                                                    </p>
                                                    <p className="capitalize">
                                                        <strong>No. HP Penerima :</strong> {recipient_phone_number || '-'}
                                                    </p>
                                                    <p>
                                                        <strong>Alamat Email Penerima :</strong> {recipient_email || '-'}
                                                    </p>
                                                </div>

                                                <div className="space-y-4">
                                                    <p className="capitalize">
                                                        <strong>Alamat Penerima :</strong> {recipient_address || '-'}
                                                    </p>
                                                    <p className="capitalize">
                                                        <strong>Label Alamat Penerima :</strong> {recipient_address_label || '-'}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                <Card className="print p-4 shadow-none">
                                    <CardContent className="space-y-4 p-4">
                                        <h2 className="text-lg font-semibold">Item Pesanan</h2>

                                        <div className="grid grid-cols-1 rounded-md">
                                            <Table className="min-w-[750px]">
                                                <TableHeader className="bg-gray-100 dark:bg-gray-800">
                                                    <TableRow>
                                                        <TableHead className="whitespace-nowrap">Menu</TableHead>
                                                        <TableHead className="text-center whitespace-nowrap">Kategori</TableHead>
                                                        <TableHead className="text-center whitespace-nowrap">Jumlah</TableHead>
                                                        <TableHead className="text-center whitespace-nowrap">Harga</TableHead>
                                                        <TableHead className="text-center whitespace-nowrap">Subtotal</TableHead>
                                                        <TableHead className="text-center whitespace-nowrap">Catatan</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {transaction_items.map((item: TransactionItem) => (
                                                        <TableRow key={item.id}>
                                                            <TableCell className="min-w-[200px]">
                                                                <div className="flex items-center gap-3">
                                                                    <img
                                                                        src={item.menu_item_image_url}
                                                                        alt={item.menu_item_name}
                                                                        className="h-16 w-16 shrink-0 rounded-md object-cover"
                                                                    />
                                                                    <span className="text-sm font-medium">{item.menu_item_name}</span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-center text-sm">{item.menu_item_category}</TableCell>
                                                            <TableCell className="text-center text-sm">{item.quantity}</TableCell>
                                                            <TableCell className="text-center text-sm">
                                                                {formatCurrency(item.menu_item_price)}
                                                            </TableCell>
                                                            <TableCell className="text-center text-sm">{formatCurrency(item.subtotal)}</TableCell>
                                                            <TableCell className="text-center text-sm">{item.note || '-'}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="print p-4 shadow-none">
                                    <CardContent className="space-y-2 p-4">
                                        <h2 className="text-lg font-semibold">Rincian Biaya</h2>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span>Subtotal Item</span>
                                                <span>{formatCurrency(subtotal_transaction_item)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Biaya Layanan</span>
                                                <span>{formatCurrency(application_service_fee)}</span>
                                            </div>
                                            {discount_total > 0 && (
                                                <div className="flex justify-between text-red-600">
                                                    <span>Diskon</span>
                                                    <span>- {formatCurrency(discount_total)}</span>
                                                </div>
                                            )}
                                            {delivery_fee > 0 && (
                                                <div className="flex justify-between">
                                                    <span>Biaya Pengiriman</span>
                                                    <span>Rp{delivery_fee.toLocaleString()}</span>
                                                </div>
                                            )}
                                            <Separator />
                                            <div className="text-md flex justify-between font-bold">
                                                <span>Total Bayar</span>
                                                <span>{formatCurrency(final_total)}</span>
                                            </div>

                                            {payment_method === PaymentMethodEnum.CASH && (
                                                <>
                                                    <div className="text-md flex justify-between font-bold">
                                                        <span>Uang Diterima</span>
                                                        <span>{formatCurrency(cash_received_amount)}</span>
                                                    </div>
                                                    <div className="text-md flex justify-between font-bold">
                                                        <span>Kembalian</span>
                                                        <span>{formatCurrency(change_amount)}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </section>
                        </div>

                        {/* Sidebar (Update Status) */}
                        <div className="md:col-span-1">
                            <Card className="p-4 shadow-none">
                                <CardContent className="w-full space-y-4 p-4">
                                    <h2 className="text-lg font-semibold">Perbarui Status Pesanan</h2>
                                    <Select value={latestStatus} onValueChange={handleStatusChange}>
                                        <SelectTrigger className="w-full rounded-md py-6">
                                            <SelectValue placeholder="Pilih status pesanan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableStatuses.map((status) => (
                                                <SelectItem key={status} value={status} className="w-full cursor-pointer p-4 capitalize">
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button className="w-full cursor-pointer rounded-md py-6" onClick={confirmUpdateStatus}>
                                        <Icon icon="mdi:reload" className="mr-2 h-4 w-4" />
                                        Perbarui Status Pesanan
                                    </Button>
                                </CardContent>
                            </Card>

                            <Dialog open={showDialogUpdateOrderStatus} onOpenChange={setShowDialogUpdateOrderStatus}>
                                <DialogContent className="sm:max-w-xl">
                                    <DialogHeader>
                                        <DialogTitle>Apakah Kamu Yakin?</DialogTitle>
                                        <DialogDescription>Ingin mengubah status pesanan menjadi {latestStatus}?</DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="mt-6">
                                        <Button
                                            variant="destructive"
                                            className="cursor-pointer"
                                            onClick={() => setShowDialogUpdateOrderStatus(false)}
                                        >
                                            Batal
                                        </Button>
                                        <Button className="cursor-pointer" onClick={handleUpdateStatus}>
                                            Ya, Ubah Status Pesanan
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </MerchantLayout>
        </>
    );
}
