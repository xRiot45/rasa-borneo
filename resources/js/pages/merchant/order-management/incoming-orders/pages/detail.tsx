import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pesanan',
        href: '#',
    },
    {
        title: 'Pesanan Masuk',
        href: '/admin/order-management/incoming-order',
    },
    {
        title: 'Detail Pesanan',
        href: '#',
    },
];

export default function OrderDetailPage() {
    return (
        <>
            <Head title="Detail Pesanan" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <h1>Detail Pesanan</h1>
            </MerchantLayout>
        </>
    );
}
