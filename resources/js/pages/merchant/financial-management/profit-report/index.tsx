import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Keuangan',
        href: '#',
    },
    {
        title: 'Laporan Laba',
        href: '/merchant/financial-management/profit-report',
    },
];

export default function ProfitReportPage() {
    return (
        <>
            <Head title="Laporan Laba" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <h1>Laporan Laba</h1>
            </MerchantLayout>
        </>
    );
}
