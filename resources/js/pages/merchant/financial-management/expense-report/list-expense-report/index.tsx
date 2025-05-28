import MerchantLayout from '@/layouts/merchant/layout';
import { ExpenseReport } from '@/models/financial-management/expense-report';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';
import ExpenseReportTable from './partials/table';
import { columns } from './partials/table/columns';

interface Props {
    expenseReports: ExpenseReport[];
}

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

export default function ExpenseReportPage({ expenseReports }: Props) {
    return (
        <>
            <Head title="Laporan Pengeluaran" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Laporan Pengeluaran</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua laporan pengeluaran anda</p>
                    </div>
                    <ButtonPartials />
                </div>

                <div className="p-4">
                    <ExpenseReportTable data={expenseReports} columns={columns} />
                </div>
            </MerchantLayout>
        </>
    );
}
