import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { OrderTypeEnum } from '@/enums/order-type';
import { PaymentMethodEnum } from '@/enums/payment-method';
import { PaymentStatusEnum } from '@/enums/payment-status';
import CustomerLayout from '@/layouts/customer/layout';
import { cn } from '@/lib/utils';
import { Order } from '@/models/order';
import { ReviewForm } from '@/models/reviews/merchant_review';
import { TransactionItem } from '@/models/transactions';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { paymentStatusColorMap } from '@/utils/payment-status-color';
import { Icon } from '@iconify/react';
import { Head, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'sonner';
import ButtonPartials from '../components/button-partials';

interface Props {
    order: Order;
}

export default function OrderDetailPage({ order }: Props) {
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [showDialogReviewOrder, setShowDialogReviewOrder] = useState<boolean>(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState<number>(0);

    const {
        data: formData,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm<Required<ReviewForm>>({
        rating: 0,
        comment: '',
    });

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
    } = order;

    const contentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({ contentRef, documentTitle: `Invoice - ${transaction_code}` });

    const statusKey = payment_status as PaymentStatusEnum;
    const badgeClass = paymentStatusColorMap[statusKey] ?? 'bg-gray-300 text-black';

    const handleReviewOrder = (menuItemId: number) => {
        setSelectedMenuItem(menuItemId);
        setShowDialogReviewOrder(true);
    };

    const handleOrderReview = () => {
        post(route('menu_item.review.storeReview', { menuItemId: selectedMenuItem }), {
            onSuccess: () => {
                reset();
                setShowDialogReviewOrder(false);
                toast.success('Success', {
                    description: 'Ulasan berhasil dikirim',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
            },
            onError: (errors) => {
                reset();
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

    return (
        <>
            <Head title="Detail Pesanan" />
            <CustomerLayout>
                <main className="mt-24 space-y-6">
                    <ButtonPartials handlePrint={handlePrint} />

                    <div className="grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-x-6">
                        <div className="col-span-3 grid space-y-6">
                            <section ref={contentRef} className="space-y-6">
                                {/* Informasi Pemesanan */}
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
                                                        className={`rounded-sm font-bold text-white capitalize ${PaymentMethodEnum.CASH === payment_method ? 'border-green-600 bg-green-100 text-green-600' : 'border-blue-600 bg-blue-100 text-blue-600'}`}
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
                                                <TableHeader className="bg-gray-100 dark:bg-neutral-800">
                                                    <TableRow>
                                                        <TableHead className="whitespace-nowrap">Menu</TableHead>
                                                        <TableHead className="text-center whitespace-nowrap">Kategori</TableHead>
                                                        <TableHead className="text-center whitespace-nowrap">Jumlah</TableHead>
                                                        <TableHead className="text-center whitespace-nowrap">Harga</TableHead>
                                                        <TableHead className="text-center whitespace-nowrap">Subtotal</TableHead>
                                                        <TableHead className="text-center whitespace-nowrap">Catatan</TableHead>
                                                        <TableHead className="text-center whitespace-nowrap">Ulasan</TableHead>
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
                                                            <TableCell className="text-center text-sm">
                                                                <Button className="py-4" onClick={() => handleReviewOrder(item.menu_item_id)}>
                                                                    Beri Ulasan
                                                                    <Icon icon="material-symbols:rate-review-outline" className="h-5 w-5" />
                                                                </Button>
                                                            </TableCell>
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
                    </div>

                    {/* Dialog Review Order */}
                    <Dialog open={showDialogReviewOrder} onOpenChange={setShowDialogReviewOrder}>
                        <DialogContent className="sm:max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>Tambah Ulasan untuk Pesanan Ini</DialogTitle>
                                <DialogDescription>
                                    Berikan pendapatmu tentang pengalaman pesanan ini. Ulasanmu akan membantu pembeli lain dalam membuat keputusan.
                                </DialogDescription>
                            </DialogHeader>

                            {/* Rating */}
                            <div className="mt-4 flex items-center space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setData('rating', star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="focus:outline-none"
                                    >
                                        <Icon
                                            icon="material-symbols:star"
                                            className={cn(
                                                'h-8 w-8 cursor-pointer transition-colors',
                                                (hoverRating || formData.rating) >= star ? 'text-yellow-400' : 'text-gray-300',
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                            {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating}</p>}

                            {/* Textarea */}
                            <div className="mt-4">
                                <Label>Ulasan Anda</Label>
                                <Textarea
                                    placeholder="Tulis ulasanmu di sini..."
                                    value={formData.comment}
                                    onChange={(e) => setData('comment', e.target.value)}
                                    className="mt-2 min-h-[120px]"
                                />
                                {errors.comment && <p className="mt-1 text-sm text-red-500">{errors.comment}</p>}
                            </div>

                            {/* Submit Button */}
                            <DialogFooter className="mt-4 flex justify-end">
                                <DialogTrigger asChild>
                                    <Button variant="outline">Batal</Button>
                                </DialogTrigger>
                                <Button onClick={handleOrderReview} disabled={processing}>
                                    {processing ? 'Mengirim...' : 'Kirim Ulasan'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </main>
            </CustomerLayout>
        </>
    );
}
