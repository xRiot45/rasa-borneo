import EmptyImage from '@/assets/errors/empty.svg';
import DefaultPhotoProfile from '@/assets/images/default-image.png';
import OrderStatusBadge from '@/components/order-status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { OrderStatusEnum } from '@/enums/order-status';
import CourierLayout from '@/layouts/courier/layout';
import { Order } from '@/models/order';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { Icon } from '@iconify/react';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    orders: Order[];
}

export default function OrderRequestPage({ orders }: Props) {
    const [showDialogAcceptedOrder, setShowDialogAcceptedOrder] = useState<boolean>(false);
    const [showDialogRejectedOrder, setShowDialogRejectedOrder] = useState<boolean>(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);

    const handleConfirmAcceptedOrder = (transactionId: number) => {
        setSelectedTransactionId(transactionId);
        setShowDialogAcceptedOrder(true);
    };

    const handleConfirmRejectedOrder = (transactionId: number) => {
        setSelectedTransactionId(transactionId);
        setShowDialogRejectedOrder(true);
    };

    const handleAcceptedOrder = () => {
        if (!selectedTransactionId) return;

        router.post(
            route('courier.acceptedRequest'),
            { transaction_id: selectedTransactionId },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Pesanan berhasil diterima',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                    setShowDialogAcceptedOrder(false);
                    setSelectedTransactionId(null);
                },
                onError: () => {
                    toast.error('Error', {
                        description: 'Permintaan pengantaran gagal diterima',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                    setShowDialogAcceptedOrder(false);
                    setSelectedTransactionId(null);
                },
            },
        );
    };

    const handleRejectedOrder = () => {
        if (!selectedTransactionId) return;

        router.post(
            route('courier.rejectedRequest'),
            { transaction_id: selectedTransactionId },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Permintaan pengantaran berhasil ditolak',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                    setShowDialogRejectedOrder(false);
                    setSelectedTransactionId(null);
                },
                onError: () => {
                    toast.error('Error', {
                        description: 'Permintaan pengantaran gagal ditolak',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                    setShowDialogRejectedOrder(false);
                    setSelectedTransactionId(null);
                },
            },
        );
    };

    return (
        <>
            <Head title="Permintaan Pesanan" />
            <CourierLayout>
                <main className="mt-22">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Daftar Permintaan Pengantaran</h2>
                            <p className="text-muted-foreground text-sm">Terima atau tolak permintaan pengantaran</p>
                        </div>

                        <Button onClick={() => window.location.reload()} className="cursor-pointer">
                            <span>Refresh</span>
                            <Icon icon={'material-symbols:refresh'} className="text-background" />
                        </Button>
                    </div>

                    {orders?.length > 0 ? (
                        <div className="mt-8">
                            {orders.map((order) => (
                                <Card key={order.id} className="mb-4 py-6 shadow-none">
                                    <CardHeader className="flex flex-col">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="flex items-start gap-4">
                                                <img
                                                    src={`${order?.merchant?.store_profile?.logo_photo}` || DefaultPhotoProfile}
                                                    alt="Logo Merchant"
                                                    className="h-20 w-20 rounded-lg border object-cover"
                                                />
                                                <div className="flex flex-col items-start space-y-1">
                                                    <h3 className="text-md font-bold">{order.merchant.business_name}</h3>
                                                    <p className="text-muted-foreground text-sm">{order?.merchant?.business_category?.name}</p>
                                                    <p className="text-muted-foreground text-sm">{order?.merchant?.business_address}</p>{' '}
                                                    {/* <- Tambahkan ini */}
                                                    <Badge className="mt-1 rounded-sm">{order.transaction_items.length} Pesanan</Badge>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 space-y-1 sm:mt-2 sm:flex-col sm:items-end">
                                                <p className="mt-1 text-sm font-medium">{formatDate(order.checked_out_at ?? '')}</p>
                                                <OrderStatusBadge status={order.latest_order_status.status as OrderStatusEnum} />
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="text-muted-foreground space-y-6 text-sm">
                                        <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                                            <div>
                                                <Label>Label Alamat</Label>
                                                <p className="text-primary mt-1 text-base font-semibold capitalize">
                                                    {order.recipient_address_label || '-'}
                                                </p>
                                            </div>

                                            <div>
                                                <Label>Penerima</Label>
                                                <p className="text-primary mt-1 text-base font-semibold">{order.recipient_name}</p>
                                                <p className="text-muted-foreground text-sm">{order.recipient_phone_number}</p>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <Label>Email</Label>
                                                <p className="text-primary mt-1 text-base font-semibold">{order.recipient_email || '-'}</p>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <Label>Alamat Lengkap</Label>
                                                <p className="text-primary mt-1 text-base font-semibold">{order.recipient_address}</p>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <Label>Catatan Pengiriman</Label>
                                                <p className="text-primary mt-1 text-base font-semibold">{order.delivery_note || '-'}</p>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="flex flex-wrap justify-between gap-4">
                                            <div>
                                                <Label>Kode Transaksi</Label>
                                                <p className="text-primary mt-1 text-base font-semibold">{order.transaction_code}</p>
                                            </div>

                                            <div>
                                                <Label>Total Pembayaran</Label>
                                                <p className="text-primary mt-1 text-end text-base font-semibold">
                                                    {formatCurrency(order?.final_total)}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex gap-3 pt-2">
                                        <Button
                                            variant="destructive"
                                            className="flex-1 cursor-pointer py-6 text-sm hover:bg-red-700"
                                            onClick={() => handleConfirmRejectedOrder(order?.id)}
                                        >
                                            Tolak Pesanan
                                            <Icon icon={'material-symbols:cancel'} className="text-background ml-2" />
                                        </Button>
                                        <Button
                                            variant="default"
                                            className="flex-1 cursor-pointer py-6 text-sm"
                                            onClick={() => handleConfirmAcceptedOrder(order?.id)}
                                        >
                                            Terima Pesanan
                                            <Icon icon={'material-symbols:check'} className="text-background ml-2" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <div className="flex grow items-center px-6 xl:px-10">
                                <div className="mx-auto text-center">
                                    <img src={EmptyImage} alt="Error" className="mx-auto mb-8 w-full max-w-lg lg:mb-12 2xl:mb-16" />
                                    <h1 className="text-xl font-bold">Tidak Ada Permintaan Pengantaran</h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Tidak ada permintaan pengantaran saat ini. Silakan coba lagi nanti.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Dialog Accepted Order */}
                    <Dialog open={showDialogAcceptedOrder} onOpenChange={setShowDialogAcceptedOrder}>
                        <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Konfirmasi Terima Pesanan</DialogTitle>
                                <DialogDescription>
                                    Apakah Anda yakin ingin menerima permintaan pengantaran ini? Setelah diterima, tugas ini akan tercatat sebagai
                                    milik Anda dan tidak bisa diambil oleh kurir lain.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="mt-4 flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setShowDialogAcceptedOrder(false)} className="cursor-pointer">
                                    Batal
                                </Button>
                                <Button onClick={handleAcceptedOrder} className="cursor-pointer">
                                    Ya, Terima Pesanan
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Dialog Rejected Order */}
                    <Dialog open={showDialogRejectedOrder} onOpenChange={setShowDialogRejectedOrder}>
                        <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Konfirmasi Tolak Pesanan</DialogTitle>
                                <DialogDescription>
                                    Apakah Anda yakin ingin menolak permintaan pengantaran ini? Setelah ditolak, pesanan ini akan tersedia kembali
                                    untuk kurir lain dan Anda tidak akan bisa mengambil tugas ini lagi.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="mt-4 flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setShowDialogRejectedOrder(false)} className="cursor-pointer">
                                    Batal
                                </Button>
                                <Button onClick={handleRejectedOrder} className="cursor-pointer">
                                    Ya, Tolak Pesanan
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </main>
            </CourierLayout>
        </>
    );
}
