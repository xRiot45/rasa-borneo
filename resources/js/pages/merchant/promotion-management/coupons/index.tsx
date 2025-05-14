import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Promosi',
        href: '#',
    },
    {
        title: 'Kupon',
        href: '/admin/promotion-management/coupons',
    },
];

export default function CouponPage() {
    return (
        <>
            <Head title="Kupon" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <h1>Kupon</h1>
            </MerchantLayout>
        </>
    );
}
