import DefaultPhotoProfile from '@/assets/images/default-image.png';
import OrderStatusBadge from '@/components/order-status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { OrderStatusEnum } from '@/enums/order-status';
import CourierLayout from '@/layouts/courier/layout';
import { Order } from '@/models/order';
import { formatCurrency } from '@/utils/format-currency';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';

interface Props {
    orders: Order[];
}

export default function OrderRequestPage({ orders }: Props) {
    console.log(orders);
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

                    {orders.map((order) => (
                        <Card key={order.id} className="mt-8 mb-4 py-6 shadow-none">
                            <CardHeader className="flex flex-col">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={`${order?.merchant?.store_profile?.logo_photo}` || DefaultPhotoProfile}
                                            alt="Logo Merchant"
                                            className="h-20 w-20 rounded-lg border object-cover"
                                        />
                                        <div className="flex flex-col items-start space-y-0.5">
                                            <h3 className="text-md font-bold">{order.merchant.business_name}</h3>
                                            <p className="text-muted-foreground text-sm">{order?.merchant?.business_category?.name}</p>
                                            <Badge className="mt-1 rounded-sm">{order.transaction_items.length} Pesanan</Badge>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 sm:mt-2 sm:flex-row sm:items-end">
                                        <OrderStatusBadge status={order.latest_order_status.status as OrderStatusEnum} />
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="text-muted-foreground space-y-6 text-sm">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                                    <div>
                                        <Label>Label Alamat</Label>
                                        <p className="text-primary mt-1 text-base font-semibold capitalize">{order.recipient_address_label || '-'}</p>
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
                                        <p className="text-primary mt-1 text-end text-base font-semibold">{formatCurrency(order?.final_total)}</p>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="flex gap-3 pt-2">
                                <Button variant="destructive" className="flex-1 cursor-pointer py-6 text-sm hover:bg-red-700">
                                    Tolak Pesanan
                                    <Icon icon={'material-symbols:cancel'} className="text-background ml-2" />
                                </Button>
                                <Button variant="default" className="flex-1 cursor-pointer py-6 text-sm">
                                    Terima Pesanan
                                    <Icon icon={'material-symbols:check'} className="text-background ml-2" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </main>
            </CourierLayout>
        </>
    );
}
