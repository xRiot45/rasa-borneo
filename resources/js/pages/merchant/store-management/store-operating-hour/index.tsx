import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Toko',
        href: '#',
    },
    {
        title: 'Jam Operasional Toko',
        href: '/admin/store-management/store-opeating-hour',
    },
];

export default function StoreOperatingHour() {
    return (
        <>
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <Head title="Jam Operasional Toko" />
                <h1>Paghe Store operation hour</h1>
            </MerchantLayout>
        </>
    );
}
