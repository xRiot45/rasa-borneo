import DefaultPhotoProfile from '@/assets/images/default-image.png';
import EmptyData from '@/components/empty-img';
import OrderStatusBadge from '@/components/order-status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { OrderStatusEnum } from '@/enums/order-status';
import CourierLayout from '@/layouts/courier/layout';
import { MyDeliveries } from '@/models/courier-assignment';
import { formatDate } from '@/utils/format-date';
import { Icon } from '@iconify/react';
import { Head, Link } from '@inertiajs/react';

interface Props {
    deliveryHistory: MyDeliveries[];
}

export default function DeliveryHistoryPage({ deliveryHistory }: Props) {
    return (
        <>
            <Head title="Riwayat Pengiriman Saya" />
            <CourierLayout>
                <main className="mt-22">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Riwayat Pengantaran Saya</h2>
                            <p className="text-muted-foreground text-sm">Lihat dan kelola pesanan yang sudah kamu antar ke pelanggan.</p>
                        </div>

                        <Button onClick={() => window.location.reload()} className="cursor-pointer">
                            <span>Refresh</span>
                            <Icon icon={'material-symbols:refresh'} className="text-background" />
                        </Button>
                    </div>

                    {deliveryHistory?.length > 0 ? (
                        <div className="mt-8">
                            {deliveryHistory?.map((delivery) => (
                                <Card key={delivery.id} className="mb-4 py-6 shadow-none">
                                    <CardHeader className="flex flex-col">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="flex items-start gap-4">
                                                <img
                                                    src={`${delivery?.transaction?.merchant?.store_profile?.logo_photo}` || DefaultPhotoProfile}
                                                    alt="Logo Merchant"
                                                    className="h-20 w-20 rounded-lg border object-cover"
                                                />
                                                <div className="flex flex-col items-start space-y-1">
                                                    <p className="text-muted-foreground text-sm font-medium">
                                                        {delivery?.transaction?.transaction_code}
                                                    </p>
                                                    <h3 className="text-md font-bold">{delivery?.transaction?.merchant?.business_name}</h3>
                                                    <p className="text-muted-foreground text-sm">
                                                        {delivery?.transaction?.merchant?.business_category?.name}
                                                    </p>
                                                    <p className="text-muted-foreground text-sm">
                                                        {delivery?.transaction?.merchant?.business_address}
                                                    </p>
                                                    <Badge className="mt-1 rounded-sm">
                                                        {delivery?.transaction?.transaction_items?.length} Pesanan
                                                    </Badge>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 sm:mt-2 sm:items-end">
                                                <p className="mt-1 text-sm font-medium">{formatDate(delivery?.transaction?.checked_out_at ?? '')}</p>
                                                <OrderStatusBadge status={delivery?.transaction?.latest_order_status.status as OrderStatusEnum} />
                                                <Link
                                                    href={route('courier.detailDeliveryHistory', delivery?.transaction?.transaction_code ?? '')}
                                                    className="cursor-pointer"
                                                >
                                                    <Button variant="default" size="sm" className="mt-6 w-full cursor-pointer py-5">
                                                        Lihat Detail Pesanan
                                                        <Icon icon={'mdi:eye'} className="text-background" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <EmptyData
                            title="Tidak ada pengantaran saat ini"
                            description="Anda belum memiliki pengantaran, silahkan ambil permintaan pengantaran terlebih dahulu"
                        />
                    )}
                </main>
            </CourierLayout>
        </>
    );
}
