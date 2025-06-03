import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PaymentMethodEnum } from '@/enums/payment-method';
import CourierLayout from '@/layouts/courier/layout';
import { MyDeliveries } from '@/models/courier-assignment';
import { formatCurrency } from '@/utils/format-currency';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';
import { StickyNote } from 'lucide-react';

interface Props {
    data: MyDeliveries;
}

export default function MyDeliveriesDetailPage({ data }: Props) {
    const transaction = data.transaction;
    const merchant = transaction.merchant;
    const items = transaction.transaction_items;

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

                                <Button className="w-full cursor-pointer py-5.5 text-sm">
                                    Lihat Lokasi Toko <Icon icon="mdi:map-marker" className="ml-2 h-4 w-4" />
                                </Button>
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
                                <Separator />
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>{formatCurrency(transaction?.final_total)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </CourierLayout>
        </>
    );
}
