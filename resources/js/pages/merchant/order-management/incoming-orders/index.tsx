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
                <h1>Pesanan Masuk</h1>
            </MerchantLayout>
        </>
    );
}
