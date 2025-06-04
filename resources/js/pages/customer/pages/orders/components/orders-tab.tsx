import EmptyData from '@/components/empty-img';
import OrderProgressStatus from '@/components/order-progress-status';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { OrderStatusEnum } from '@/enums/order-status';
import { Order } from '@/models/order';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { orderStatusMap } from '@/utils/order-status-map';
import { Icon } from '@iconify/react';
import { Link, router } from '@inertiajs/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useState } from 'react';

interface Props {
    checkedOutOrders: Order[];
    notCheckedOutOrders: Order[];
}

const OrdersTabs: React.FC<Props> = ({ checkedOutOrders, notCheckedOutOrders }) => {
    const [showDialogOrderProgressStatus, setShowDialogOrderProgressStatus] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleTrackOrder = (order: Order) => {
        setSelectedOrder(order);
        setShowDialogOrderProgressStatus(true);
    };

    return (
        <>
            <Tabs defaultValue="ordersCheckout" className="w-full">
                <TabsList className="border-muted grid grid-cols-2 px-0">
                    <TabsTrigger
                        value="ordersCheckout"
                        className="data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-primary w-full cursor-pointer rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium data-[state=active]:border-b-2"
                    >
                        Pesanan Yang Sudah Diselesaikan
                    </TabsTrigger>
                    <TabsTrigger
                        value="ordersNotCheckout"
                        className="data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-primary w-full cursor-pointer rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium data-[state=active]:border-b-2"
                    >
                        Pesanan Yang Belum Diselesaikan
                    </TabsTrigger>
                </TabsList>

                {/* ✅ Pesanan Sudah Diselesaikan */}
                <TabsContent value="ordersCheckout" className="mt-10">
                    <div className="mt-6 grid gap-4">
                        {checkedOutOrders.length === 0 ? (
                            <EmptyData
                                title="Pesanan Yang Sudah Diselesaikan Kosong"
                                description="Pesanan yang sudah diselesaikan saat ini sedang kosong"
                            />
                        ) : (
                            checkedOutOrders.map((order) => {
                                const items = order.transaction_items;
                                const firstItem = items[0];
                                const otherItemsCount = items.length - 1;

                                const status = order?.latest_order_status?.status;
                                const statusInfo = status ? orderStatusMap[status as OrderStatusEnum] : undefined;

                                return (
                                    <Card key={order.id} className="rounded-2xl px-3 py-6 shadow-none">
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <div>
                                                <CardTitle className="text-base">{order.transaction_code}</CardTitle>
                                                <CardDescription className="text-muted-foreground mt-1 text-sm">
                                                    {formatDate(order.checked_out_at ?? '')}
                                                </CardDescription>
                                            </div>
                                            <Badge
                                                variant="default"
                                                className={`rounded-sm font-bold uppercase ${statusInfo?.className ?? 'bg-gray-300 text-black'}`}
                                            >
                                                {statusInfo?.label ?? status}
                                            </Badge>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                            {order?.merchant && (
                                                <div className="mb-4 flex items-center gap-4">
                                                    <img
                                                        src={`${order?.merchant?.store_profile?.logo_photo}`}
                                                        alt={order.merchant.business_name}
                                                        className="h-12 w-12 rounded-md border object-cover"
                                                    />
                                                    <Link href={route('merchant.show', order?.merchant?.slug)}>
                                                        <div className="flex flex-col">
                                                            <span className="text-base font-semibold">{order?.merchant?.business_name}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )}

                                            {firstItem && (
                                                <div className="flex gap-4">
                                                    <img
                                                        src={firstItem.menu_item_image_url}
                                                        alt={firstItem.menu_item_name}
                                                        className="h-18 w-18 rounded-lg border object-cover"
                                                    />
                                                    <div className="flex flex-col space-y-1 text-sm">
                                                        <span className="font-medium">{firstItem.menu_item_name}</span>
                                                        <span className="text-muted-foreground">Jumlah: {firstItem.quantity}</span>
                                                        <span className="text-primary font-semibold">{formatCurrency(firstItem.subtotal)}</span>
                                                        {otherItemsCount > 0 && (
                                                            <span className="text-muted-foreground mt-1 text-xs">
                                                                +{otherItemsCount} menu lainnya
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* ✅ Total Transaksi */}
                                            <div className="border-muted flex items-center justify-between border-t pt-4 text-sm">
                                                <span className="font-medium">Total Belanja Anda</span>
                                                <span className="font-semibold">{formatCurrency(order.final_total)}</span>
                                            </div>

                                            <div className="flex flex-col justify-end gap-3 pt-2 sm:flex-row">
                                                <Button
                                                    variant="default"
                                                    className="flex w-auto cursor-pointer items-center justify-center gap-2 px-6 text-sm font-medium"
                                                    onClick={() => router.visit(route('order-list.showOrderDetailCustomer', order?.transaction_code))}
                                                >
                                                    Lihat Detail Pesanan
                                                    <Icon icon="material-symbols:arrow-right-alt-rounded" className="h-5 w-5" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="flex w-auto cursor-pointer items-center justify-center gap-2 px-6 text-sm font-medium"
                                                    onClick={() => handleTrackOrder(order)}
                                                >
                                                    Lacak Status Pesanan
                                                    <Icon icon="pajamas:status-closed" className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })
                        )}
                    </div>
                </TabsContent>

                {/* ❌ Pesanan Belum Diselesaikan */}
                <TabsContent value="ordersNotCheckout" className="mt-10">
                    <div className="mt-6 grid gap-4">
                        {notCheckedOutOrders.length === 0 ? (
                            <EmptyData
                                title="Pesanan Yang Belum Diselesaikan Kosong"
                                description="Pesanan yang belum diselesaikan saat ini sedang kosong"
                            />
                        ) : (
                            notCheckedOutOrders.map((order) => {
                                const items = order.transaction_items;
                                const firstItem = items[0];
                                const otherItemsCount = items.length - 1;

                                return (
                                    <Card key={order.id} className="rounded-2xl border px-3 py-6 shadow-none">
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <div>
                                                <CardTitle className="text-base font-semibold">{order.transaction_code}</CardTitle>
                                            </div>
                                            <Badge variant="default" className="rounded-sm bg-red-600 font-bold text-white uppercase">
                                                Belum Selesai
                                            </Badge>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                            {order?.merchant && (
                                                <div className="mb-4 flex items-center gap-4">
                                                    <img
                                                        src={`${order?.merchant?.store_profile?.logo_photo}`}
                                                        alt={order.merchant.business_name}
                                                        className="h-12 w-12 rounded-md border object-cover"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-base font-semibold">{order?.merchant?.business_name}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {firstItem && (
                                                <div className="flex gap-4">
                                                    <img
                                                        src={firstItem.menu_item_image_url}
                                                        alt={firstItem.menu_item_name}
                                                        className="h-20 w-20 rounded-xl border object-cover"
                                                    />
                                                    <div className="flex flex-col space-y-1 text-sm">
                                                        <span className="text-foreground font-medium">{firstItem.menu_item_name}</span>
                                                        <span className="text-muted-foreground">Jumlah : {firstItem.quantity}</span>
                                                        <span className="text-primary font-semibold">{formatCurrency(firstItem.subtotal)}</span>
                                                        {otherItemsCount > 0 && (
                                                            <span className="text-muted-foreground mt-1 text-xs">
                                                                +{otherItemsCount} menu lainnya
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="text-right">
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    className="cursor-pointer bg-green-600 text-white hover:bg-green-700"
                                                    onClick={() => router.visit(route('checkout.index', order?.transaction_code))}
                                                >
                                                    Selesaikan Pesanan Sekarang
                                                    <Icon icon="material-symbols:arrow-right-alt-rounded" className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })
                        )}
                    </div>
                </TabsContent>

                {/* Dialog Order Progress Status */}
                <Dialog open={showDialogOrderProgressStatus} onOpenChange={setShowDialogOrderProgressStatus}>
                    <DialogContent className="sm:max-w-5xl">
                        <DialogHeader>
                            <DialogTitle>Lacak Status Pesanan</DialogTitle>
                        </DialogHeader>

                        <OrderProgressStatus
                            transactionCode={selectedOrder?.transaction_code ?? ''}
                            orderStatus={selectedOrder?.order_status ?? []}
                        />
                    </DialogContent>
                </Dialog>
            </Tabs>
        </>
    );
};

export default OrdersTabs;
