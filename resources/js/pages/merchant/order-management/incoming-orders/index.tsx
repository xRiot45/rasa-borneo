import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MerchantLayout from '@/layouts/merchant/layout';
import { Order } from '@/models/order';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    orders: Order[];
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

export default function IncomingOrderPage({ orders }: Props) {
    console.log(orders);
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
                            <TabsList className="border-muted border-b px-0">
                                <TabsTrigger value="dineIn" className="cursor-pointer">
                                    Makan Di Tempat
                                </TabsTrigger>
                                <TabsTrigger value="takeAway" className="cursor-pointer">
                                    Bungkus / Bawa Pulang
                                </TabsTrigger>
                                <TabsTrigger value="delivery" className="cursor-pointer">
                                    Antar Ke Rumah
                                </TabsTrigger>
                                <TabsTrigger value="pickup" className="cursor-pointer">
                                    Ambil Di Tempat
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </main>
            </MerchantLayout>
        </>
    );
}
