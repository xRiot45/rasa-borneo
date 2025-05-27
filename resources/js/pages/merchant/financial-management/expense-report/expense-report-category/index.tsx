import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Keuangan',
        href: '#',
    },
    {
        title: 'Kategori Laporan Pengeluaran',
        href: '/merchant/financial-management/expense-report-category',
    },
];

export default function ExpenseReportCategoryPage() {
    return (
        <>
            <Head title="Kategori Laporan Pengeluaran" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <h1>Kategori Laporan Pengeluaran</h1>
            </MerchantLayout>
        </>
    );
}
