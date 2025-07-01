import AdminLayout from '@/layouts/admin/layout';
import { Order } from '@/models/order';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import OrderHistoryTable from './partials/table';
import { columns } from './partials/table/columns';

interface Props {
    orders: Order[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pesanan',
        href: '#',
    },
    {
        title: 'Riwayat Pesanan',
        href: '/admin/order-management/order-history',
    },
];

export default function OrderHistory({ orders }: Props) {
    return (
        <>
            <Head title="Riwayat Pesanan" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <main className="p-4">
                    <div className="mb-2 flex flex-wrap justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Riwayat Pesanan</h2>
                            <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua riwayat pesanan</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <OrderHistoryTable data={orders} columns={columns} />
                    </div>
                </main>
            </AdminLayout>
        </>
    );
}
