import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MerchantLayout from '@/layouts/merchant/layout';
import { Order } from '@/models/order';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TabsContent } from '@radix-ui/react-tabs';
import TabDineInOrderContent from './partials/tab-dineIn-orders';

interface Props {
    dineInOrders: Order[];
    takeAwayOrders: Order[];
    deliveryOrders: Order[];
    pickupOrders: Order[];
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
];

export default function IncomingOrderPage({ dineInOrders, takeAwayOrders, deliveryOrders, pickupOrders }: Props) {
    console.log(dineInOrders);
    console.log(takeAwayOrders);
    console.log(deliveryOrders);
    console.log(pickupOrders);

    const newOrders: Record<string, number> = {
        dineIn: 3,
        takeAway: 1,
        delivery: 0,
        pickup: 5,
    };

    return (
        <>
            <Head title="Pesanan Masuk" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <main className="p-4">
                    <div className="mb-2 flex flex-wrap justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Semua Pesanan Masuk</h2>
                            <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua pesanan yang sudah masuk</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <Tabs defaultValue="dineIn">
                            <TabsList className="border-muted gap-4 border-b px-0">
                                {[
                                    { value: 'dineIn', label: 'Makan di Tempat' },
                                    { value: 'takeAway', label: 'Bungkus / Bawa Pulang' },
                                    { value: 'delivery', label: 'Antar ke Rumah' },
                                    { value: 'pickup', label: 'Ambil di Tempat' },
                                ].map((tab) => (
                                    <div key={tab.value} className="relative">
                                        {newOrders[tab.value] > 0 && (
                                            <Badge variant="destructive" className="absolute -top-2 left-1/1 -translate-x-1/2 px-1.5 py-0.5 text-xs">
                                                {newOrders[tab.value]}
                                            </Badge>
                                        )}
                                        <TabsTrigger value={tab.value} className="cursor-pointer">
                                            {tab.label}
                                        </TabsTrigger>
                                    </div>
                                ))}
                            </TabsList>

                            <TabsContent value="dineIn" className="mt-10">
                                <TabDineInOrderContent data={dineInOrders} />
                            </TabsContent>

                            <TabsContent value="takeAway">
                                <p>Take Away Content</p>
                            </TabsContent>

                            <TabsContent value="delivery">
                                <p>Delivery Content</p>
                            </TabsContent>

                            <TabsContent value="pickup">
                                <p>Pickup Content</p>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </MerchantLayout>
        </>
    );
}
