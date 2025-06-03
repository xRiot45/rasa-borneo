import FileDropzone from '@/components/file-dropzone';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { OrderStatusEnum } from '@/enums/order-status';
import { PaymentMethodEnum } from '@/enums/payment-method';
import CourierLayout from '@/layouts/courier/layout';
import { MyDeliveries } from '@/models/courier-assignment';
import { formatCurrency } from '@/utils/format-currency';
import { orderStatusMap } from '@/utils/order-status-map';
import { Icon } from '@iconify/react';
import { Head, useForm } from '@inertiajs/react';
import { StickyNote } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    data: MyDeliveries;
}

type UploadProofOfDeliveryForm = {
    proof_of_delivery: string | File | null;
};

export default function MyDeliveriesDetailPage({ data }: Props) {
    const {
        data: formData,
        setData,
        post,
        processing,
    } = useForm<UploadProofOfDeliveryForm>({
        proof_of_delivery: null,
    });

    const [showDialogConfirmOrderReadyToDelivery, setShowDialogConfirmOrderReadyToDelivery] = useState<boolean>(false);
    const [showDialogConfirmOrderCompleteDelivery, setShowDialogConfirmOrderCompleteDelivery] = useState<boolean>(false);

    const transaction = data.transaction;
    const merchant = transaction.merchant;
    const items = transaction.transaction_items;

    const latitude = merchant?.store_profile?.latitude ? parseFloat(merchant?.store_profile?.latitude) : 0;
    const longitude = merchant?.store_profile?.longitude ? parseFloat(merchant?.store_profile?.longitude) : 0;

    const handleFileChange = (file: File | null) => {
        setData('proof_of_delivery', file);
    };

    const handleOrderCompleteDelivery = (e: React.FormEvent) => {
        e.preventDefault();
        setShowDialogConfirmOrderCompleteDelivery(false);

        const formDataAction = new FormData();
        if (formData.proof_of_delivery) {
            formDataAction.append('proof_of_delivery', formData.proof_of_delivery);
        }

        post(route('courier.orderCompleteDelivery', { transactionCode: transaction.transaction_code }), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Success', {
                    description: 'Pengantaran Pesanan Selesai',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
            },
            onError: () => {
                toast.error('Error', {
                    description: 'Pengantaran Pesanan Gagal',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
            },
        });
    };

    const handleOrderReadyToDelivery = () => {
        setShowDialogConfirmOrderReadyToDelivery(false);

        post(route('courier.orderReadyToDelivery', { transactionCode: transaction.transaction_code }), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Success', {
                    description: 'Pesanan siap untuk diantar',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
            },
            onError: () => {
                toast.error('Error', {
                    description: 'Permintaan pengantaran gagal diterima',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
            },
        });
    };

    return (
        <>
            <Head title="Detail Pengantaran" />
            <CourierLayout>
                <main className="mt-22 px-4 md:px-8">
                    <Button onClick={() => window.history.back()}>
                        <Icon icon={'material-symbols:arrow-back-rounded'} className="mr-2" />
                        Kembali ke halaman sebelumnya
                    </Button>

                    <div className="my-6">
                        <h2 className="text-lg font-bold">Detail Pengantaran</h2>
                        <p className="text-muted-foreground text-sm">Lihat detail lengkap pesanan yang sedang kamu antar ke pelanggan.</p>

                        {/* Tambahkan di sini */}
                        <div className="mt-2 flex items-center justify-between gap-4">
                            <p className="font-medium">
                                <span className="text-primary">{transaction.transaction_code}</span>
                            </p>
                            <Badge
                                variant="outline"
                                className={`rounded-sm capitalize ${orderStatusMap[transaction.latest_order_status.status as OrderStatusEnum].className}`}
                            >
                                {transaction.latest_order_status.status}
                            </Badge>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Informasi Penerima */}
                        <Card className="shadow-none">
                            <CardContent className="space-y-5 p-6">
                                <h2 className="text-lg font-semibold">Informasi Penerima</h2>
                                <div className="space-y-1">
                                    <p className="font-medium">{transaction.recipient_name}</p>
                                    <p className="text-muted-foreground text-sm">{transaction.recipient_phone_number}</p>
                                    <p className="text-muted-foreground text-sm">{transaction.recipient_email}</p>
                                </div>
                                <div>
                                    <p className="text-sm">{transaction.recipient_address}</p>
                                    <p className="text-muted-foreground text-sm italic">{transaction.delivery_note}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Informasi Merchant */}
                        <Card className="shadow-none">
                            <CardContent className="space-y-4 p-6">
                                <h2 className="text-lg font-semibold">Dari Merchant</h2>
                                <div className="flex items-start gap-3">
                                    <img src={`${merchant.store_profile.logo_photo}`} className="h-20 w-20 rounded-md object-cover" />
                                    <div className="space-y-1">
                                        <p className="font-medium">{merchant.business_name}</p>
                                        <p className="text-muted-foreground text-sm">{merchant.business_phone}</p>
                                        <p className="text-muted-foreground text-sm">{merchant.business_address}</p>
                                        <p className="text-muted-foreground text-sm">
                                            Berdiri sejak {merchant.store_profile.founded_year} • {merchant.store_profile.number_of_employees} pegawai
                                        </p>
                                    </div>
                                </div>

                                <Dialog>
                                    <DialogTrigger className="w-full">
                                        <Button className="w-full cursor-pointer py-5.5 text-sm">
                                            Lihat Lokasi Toko <Icon icon="mdi:map-marker" className="mr-1 h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-4xl">
                                        <DialogHeader className="text-start">
                                            <DialogTitle>Lokasi Toko</DialogTitle>
                                            <DialogDescription>{merchant?.business_address}</DialogDescription>
                                        </DialogHeader>

                                        <div className="h-[500px] w-full">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                title="Peta Lokasi"
                                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.005}%2C${latitude - 0.005}%2C${longitude + 0.005}%2C${latitude + 0.005}&layer=mapnik&marker=${latitude}%2C${longitude}`}
                                            ></iframe>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Menu Pesanan */}
                    <Card className="mt-4 shadow-none">
                        <CardContent className="p-4 sm:p-6">
                            <h2 className="mb-4 text-lg font-semibold">Menu Pesanan</h2>
                            <div className="space-y-6 pr-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        {/* Kiri: Gambar & detail */}
                                        <div className="flex w-full gap-4 sm:w-auto">
                                            <img
                                                src={item.menu_item_image_url}
                                                alt={item.menu_item_name}
                                                className="h-16 w-16 rounded-md border object-cover sm:h-20 sm:w-20"
                                            />
                                            <div className="flex flex-col gap-2">
                                                <p className="text-base leading-tight font-semibold">{item.menu_item_name}</p>
                                                <p className="text-muted-foreground text-sm">Harga: {formatCurrency(item.menu_item_price)}</p>
                                                <p className="text-muted-foreground text-sm">Jumlah: x{item.quantity}</p>

                                                {item.note && (
                                                    <div className="mt-2 flex items-start gap-2 rounded-sm border-l-4 border-yellow-400 bg-yellow-50 px-3 py-2">
                                                        <StickyNote className="h-4 w-4 text-yellow-700" />
                                                        <p className="text-sm font-semibold text-yellow-700 italic">{item.note}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Kanan: Subtotal */}
                                        <div className="w-full self-end sm:w-auto sm:self-center sm:text-right">
                                            <p className="text-primary text-sm font-semibold">{formatCurrency(item.subtotal)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rincian Pembayaran */}
                    <Card className="mt-4 shadow-none">
                        <CardContent className="space-y-3 p-6">
                            <h2 className="text-lg font-semibold">Rincian Pembayaran</h2>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span>Metode Pembayaran</span>
                                    <Badge
                                        variant="default"
                                        className={`rounded-sm font-bold text-white capitalize ${PaymentMethodEnum.CASH === transaction?.payment_method ? 'text-gren-600 border-green-600 bg-green-100' : 'border-blue-600 bg-blue-100 text-blue-600'}`}
                                    >
                                        {transaction?.payment_method}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(transaction?.subtotal_transaction_item)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Biaya Pengiriman</span>
                                    <span>{formatCurrency(transaction?.delivery_fee)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Biaya Layanan</span>
                                    <span>{formatCurrency(transaction?.application_service_fee)}</span>
                                </div>
                                {data?.transaction?.discount_total > 0 && (
                                    <div className="flex justify-between">
                                        <span>Diskon</span>
                                        <span>{formatCurrency(data.transaction.discount_total)}</span>
                                    </div>
                                )}

                                <Separator />
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>{formatCurrency(transaction?.final_total)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {data?.transaction?.latest_order_status?.status !== OrderStatusEnum.COMPLETED && (
                        <div className="mt-6 flex items-center justify-end">
                            {data?.transaction?.latest_order_status?.status === OrderStatusEnum.READY_FOR_DELIVERY ? (
                                <Button
                                    className="w-full cursor-pointer py-6 sm:w-auto"
                                    onClick={() => setShowDialogConfirmOrderCompleteDelivery(true)}
                                >
                                    Selesaikan Pesanan
                                    <Icon icon={'fluent-mdl2:completed-solid'} className="text-background" />
                                </Button>
                            ) : (
                                <Button
                                    className="w-full cursor-pointer py-6 sm:w-auto"
                                    onClick={() => setShowDialogConfirmOrderReadyToDelivery(true)}
                                >
                                    Pesanan Siap Diantar
                                    <Icon icon={'grommet-icons:deliver'} className="text-background" />
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Dialog konfirmasi Pesanan Siap Diantar */}
                    <Dialog open={showDialogConfirmOrderReadyToDelivery} onOpenChange={setShowDialogConfirmOrderReadyToDelivery}>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                                <DialogTitle>Konfirmasi Pengantaran</DialogTitle>
                                <DialogDescription>Apakah kamu yakin pesanan sudah siap untuk diantar ke pelanggan?</DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setShowDialogConfirmOrderReadyToDelivery(false)} className="cursor-pointer">
                                    Batal
                                </Button>
                                <Button onClick={handleOrderReadyToDelivery} className="cursor-pointer" disabled={processing}>
                                    Ya, Sudah Siap
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Dialog konfirmasi Pesanan Selesai */}
                    <Dialog open={showDialogConfirmOrderCompleteDelivery} onOpenChange={setShowDialogConfirmOrderCompleteDelivery}>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                                <DialogTitle>Konfirmasi Pengantaran Selesai</DialogTitle>
                                <DialogDescription>Apakah kamu yakin pesanan sudah selesai diantar ke pelanggan?</DialogDescription>
                            </DialogHeader>

                            <Label className="mt-4">
                                Upload Bukti Pengiriman <strong className="text-red-500">*</strong>
                            </Label>
                            <FileDropzone onFileChange={handleFileChange} />

                            <DialogFooter>
                                <Button variant="outline" onClick={() => setShowDialogConfirmOrderCompleteDelivery(false)} className="cursor-pointer">
                                    Batal
                                </Button>
                                <Button onClick={handleOrderCompleteDelivery} className="cursor-pointer" disabled={!formData.proof_of_delivery}>
                                    Ya, Selesaikan Pengantaran
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </main>
            </CourierLayout>
        </>
    );
}
