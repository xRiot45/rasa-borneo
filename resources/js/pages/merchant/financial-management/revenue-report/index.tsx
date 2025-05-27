import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Keuangan',
        href: '#',
    },
    {
        title: 'Laporan Pendapatan',
        href: '/merchant/financial-management/revenue-report',
    },
];

export default function RevenueReportPage() {
    return (
        <>
            <Head title="Laporan Pendapatan" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <h1>Lapaoran pendapatan</h1>
            </MerchantLayout>
        </>
    );
}
