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
        title: 'Riwayat Pesanan',
        href: '/admin/order-management/order-history',
    },
];

export default function OrderHistory({ orders }: Props) {
    console.log(orders);
    return (
        <>
            <Head title="Riwayat Pesanan" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <h1>Riwayat pesanan</h1>
            </MerchantLayout>
        </>
    );
}
