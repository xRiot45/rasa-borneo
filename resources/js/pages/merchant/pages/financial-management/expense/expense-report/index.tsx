import CardSummaryStatistics from '@/components/card-summary-statistic';
import MerchantLayout from '@/layouts/merchant/layout';
import { ExpenseReport, ExpenseSummary } from '@/models/financial-management/expense-report';
import { BreadcrumbItem } from '@/types';
import { formatCurrency } from '@/utils/format-currency';
import { Head } from '@inertiajs/react';
import ButtonRefresh from './partials/button-refresh';
import ExpenseReportTable from './partials/table';
import { columns } from './partials/table/columns';

interface Props {
    expenseReports: ExpenseReport[];
    expenseSummary: ExpenseSummary;
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

export default function ExpenseReportPage({ expenseReports, expenseSummary }: Props) {
    return (
        <>
            <Head title="Laporan Pengeluaran" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Daftar Laporan Pengeluaran</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua laporan pengeluaran anda</p>
                    </div>
                    <ButtonRefresh />
                </div>

                <div>
                    <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                        <CardSummaryStatistics
                            data={formatCurrency(expenseSummary?.total_expense)}
                            title="Total Pengeluaran"
                            subtitle="Seluruh laporan"
                            description="Total dari semua laporan pengeluaran"
                            icon="mdi:currency-usd"
                        />

                        <CardSummaryStatistics
                            data={expenseSummary?.total_reports}
                            title="Jumlah Laporan"
                            subtitle="Laporan"
                            description="Total laporan pengeluaran yang tercatat"
                            icon="mdi:file-document-outline"
                        />

                        <CardSummaryStatistics
                            data={formatCurrency(expenseSummary?.highest_expense)}
                            title="Laporan Tertinggi"
                            subtitle="Pengeluaran"
                            description="Laporan dengan total pengeluaran terbesar"
                            icon="mdi:chart-bar"
                        />
                    </div>

                    <div className="grid gap-4 px-4 sm:grid-cols-2">
                        <CardSummaryStatistics
                            data={formatCurrency(expenseSummary?.lowest_expense)}
                            title="Laporan Terendah"
                            subtitle="Pengeluaran"
                            description="Laporan dengan total pengeluaran terkecil"
                            icon="mdi:chart-bar"
                        />

                        <CardSummaryStatistics
                            data={formatCurrency(expenseSummary?.average_expense)}
                            title="Rata-rata Pengeluaran"
                            subtitle="Per Laporan"
                            description="Rata-rata pengeluaran dari semua laporan"
                            icon="mdi:finance"
                        />
                    </div>
                </div>

                <div className="mt-10 p-4">
                    <ExpenseReportTable data={expenseReports} columns={columns} />
                </div>
            </MerchantLayout>
        </>
    );
}
