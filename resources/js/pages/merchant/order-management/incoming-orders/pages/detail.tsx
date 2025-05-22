import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
import { Head } from '@inertiajs/react';

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
    console.log(order);
    const {
        transaction_code,
        orderer_name,
        orderer_phone_number,
        order_type,
        order_location,
        payment_method,
        payment_status,
        dine_in_table_label,
        note,
        cash_received_amount,
        change_amount,
        coupon_code,
        coupon_discount,
        transaction_items,
        subtotal_transaction_item,
        application_service_fee,
        discount_total,
        final_total,
        delivery_fee,
        checked_out_at,
    } = order;

    const statusKey = payment_status as PaymentStatusEnum;
    const badgeClass = paymentStatusColorMap[statusKey] ?? 'bg-gray-300 text-black';

    return (
        <>
            <Head title="Detail Pesanan" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-6 p-6">
                    <Button onClick={() => window.history.back()} className="cursor-pointer">
                        <Icon icon="bx:arrow-back" />
                        Kembali Ke Halaman Sebelumnya
                    </Button>
                    <h1 className="text-2xl font-bold">Detail Pesanan</h1>

                    <Card className="p-4 shadow-none">
                        <CardContent className="space-y-4 p-4">
                            <h2 className="text-lg font-semibold">Informasi Pemesanan</h2>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-4">
                                    <p className="capitalize">
                                        <strong>Kode Transaksi :</strong> {transaction_code}
                                    </p>
                                    <p className="capitalize">
                                        <strong>Nama Pemesan :</strong> {orderer_name}
                                    </p>
                                    <p className="capitalize">
                                        <strong>No. HP :</strong> {orderer_phone_number}
                                    </p>
                                    <p className="capitalize">
                                        <strong>Metode Pemesanan :</strong> {order_type} ({order_location})
                                    </p>
                                    <p className="capitalize">
                                        <strong>Meja :</strong> {dine_in_table_label}
                                    </p>
                                    <p className="capitalize">
                                        <strong>Catatan :</strong> {note}
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
                                    {payment_method === PaymentMethodEnum.CASH && (
                                        <>
                                            <p>
                                                <strong>Uang Diterima :</strong> {formatCurrency(cash_received_amount)}
                                            </p>
                                            <p>
                                                <strong>Kembalian :</strong> {formatCurrency(change_amount)}
                                            </p>
                                        </>
                                    )}

                                    {coupon_code && (
                                        <p>
                                            <strong>Kupon :</strong> {coupon_code} ({coupon_discount}%)
                                        </p>
                                    )}
                                    <p>
                                        <strong>Tanggal & Waktu Pesanan :</strong> {formatDate(checked_out_at ?? '')}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="p-4 shadow-none">
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
                                                <TableCell className="text-center text-sm">{formatCurrency(item.menu_item_price)}</TableCell>
                                                <TableCell className="text-center text-sm">{formatCurrency(item.subtotal)}</TableCell>
                                                <TableCell className="text-center text-sm">{item.note || '-'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="p-4 shadow-none">
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
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total Bayar</span>
                                    <span>{formatCurrency(final_total)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </MerchantLayout>
        </>
    );
}
