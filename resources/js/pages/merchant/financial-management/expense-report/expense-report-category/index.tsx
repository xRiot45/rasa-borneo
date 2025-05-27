import MerchantLayout from '@/layouts/merchant/layout';
import { ExpenseReportCategory } from '@/models/financial-management/expense-report';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';
import ExpenseReportCategoryTable from './partials/table';
import { columns } from './partials/table/columns';

interface Props {
    data: ExpenseReportCategory[];
}

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

export default function ExpenseReportCategoryPage({ data }: Props) {
    return (
        <>
            <Head title="Kategori Laporan Pengeluaran" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Kategori Laporan Pengeluaran</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua kategori laporan pengeluaran</p>
                    </div>
                    <ButtonPartials />
                </div>

                <div className="p-4">
                    <ExpenseReportCategoryTable data={data} columns={columns} />
                </div>
            </MerchantLayout>
        </>
    );
}
