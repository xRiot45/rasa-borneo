import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin/layout';

import { RevenueReport } from '@/models/financial-management/revenue-report';
import { Transaction } from '@/models/transactions';
import { BreadcrumbItem } from '@/types';
import { formatDate } from '@/utils/format-date';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';
import TransactionTable from './partials/table';
import { columns } from './partials/table/columns';

interface DetailRevenueReportPageProps {
    report: RevenueReport;
    transactions: Transaction[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Keuangan',
        href: '#',
    },
    {
        title: 'Laporan Pendapatan',
        href: '/merchant/financial-management/revenue-report',
    },
    {
        title: 'Detail Laporan Pendapatan',
        href: '#',
    },
];

export default function DetailRevenueReportPage({ report, transactions }: DetailRevenueReportPageProps) {
    return (
        <>
            <AdminLayout breadcrumbs={breadcrumbs}>
                <Head title="Detail Laporan Pemasukan" />
                <div className="space-y-2 p-4">
                    <Button onClick={() => window.history.back()} className="mb-6">
                        <Icon icon={'famicons:arrow-back'} className="mr-2 h-4 w-4" />
                        Kembali ke halaman sebelumnya
                    </Button>
                    <div className="mt-6 mb-2 flex flex-wrap justify-between">
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Detail Laporan Pendapatan</h2>
                            <p className="text-muted-foreground mt-1.5 text-[14px]">
                                Tanggal Laporan Pemasukan : <strong className="italic">{formatDate(report.report_date)}</strong>
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <TransactionTable data={transactions} columns={columns} />
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
