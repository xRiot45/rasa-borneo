import { Button } from '@/components/ui/button';
import MerchantLayout from '@/layouts/merchant/layout';
import { ExpenseReport } from '@/models/financial-management/expense-report';
import { BreadcrumbItem } from '@/types';
import { formatDate } from '@/utils/format-date';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';
import DetailExpenseReportTable from './partials/table';
import { columns } from './partials/table/columns';

interface Props {
    expenseReport: ExpenseReport;
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
    {
        title: 'Detail Laporan Pengeluaran',
        href: '#',
    },
];

export default function DetailReportPage({ expenseReport }: Props) {
    return (
        <>
            <Head title="Detail Laporan Pengeluaran" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-2 p-4">
                    <Button onClick={() => window.history.back()} className="mb-6">
                        <Icon icon={'famicons:arrow-back'} className="mr-2 h-4 w-4" />
                        Kembali ke halaman sebelumnya
                    </Button>

                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Detail Laporan Pengeluaran</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">
                            Tanggal Laporan Pengeluaran : <strong className="italic">{formatDate(expenseReport.report_date)}</strong>
                        </p>
                    </div>

                    <div className="pt-4">
                        <DetailExpenseReportTable data={expenseReport?.expense_report_items} columns={columns} />
                    </div>
                </div>
            </MerchantLayout>
        </>
    );
}
