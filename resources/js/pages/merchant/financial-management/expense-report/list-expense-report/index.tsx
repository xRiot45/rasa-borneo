import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Keuangan',
        href: '#',
    },
    {
        title: 'Laporan Pengeluaran',
        href: '/merchant/financial-management/expense-report',
    },
];

export default function ExpenseReportPage() {
    return (
        <>
            <Head title="Laporan Pengeluaran" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <h1>Laporan Pengeluaran</h1>
            </MerchantLayout>
        </>
    );
}
