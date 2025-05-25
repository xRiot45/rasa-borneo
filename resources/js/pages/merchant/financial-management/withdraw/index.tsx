import CardSummaryStatistics from '@/components/card-summary-statistic';
import MerchantLayout from '@/layouts/merchant/layout';
import { Withdraw } from '@/models/financial-management/withdraw';
import { BreadcrumbItem } from '@/types';
import { formatCurrency } from '@/utils/format-currency';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';
import WithdrawTable from './partials/table';
import { columns } from './partials/table/columns';

interface Props {
    data: Withdraw[];
    totalRevenue: number;
    totalWithdrawn: number;
    remainingBalance: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Keuangan',
        href: '#',
    },
    {
        title: 'Penarikan Dana',
        href: '/merchant/financial-management/withdraw',
    },
];

export default function WithdrawPage({ data, totalRevenue, totalWithdrawn, remainingBalance }: Props) {
    return (
        <>
            <Head title="Penarikan Dana" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Semua Penarikan Dana</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua penarikan dana anda</p>
                    </div>
                    <ButtonPartials />
                </div>

                <div className="grid gap-4 p-4 lg:grid-cols-3">
                    <CardSummaryStatistics
                        title="Total Pendapatan"
                        data={formatCurrency(totalRevenue)}
                        description="Total pendapatan bersih dari transaksi cashless yang telah dibayar (termasuk diskon yang dikurangi)"
                        icon="bx:money"
                    />

                    <CardSummaryStatistics
                        title="Total Penarikan"
                        data={formatCurrency(totalWithdrawn)}
                        description="Total dana yang telah diajukan dan berhasil ditarik oleh merchant"
                        icon="ph:hand-withdraw"
                    />

                    <CardSummaryStatistics
                        title="Sisa Saldo"
                        data={formatCurrency(remainingBalance)}
                        description="Saldo yang masih tersedia dan belum ditarik oleh merchant"
                        icon="ph:hand-withdraw"
                    />
                </div>

                <div className="p-4">
                    <WithdrawTable data={data} columns={columns} />
                </div>
            </MerchantLayout>
        </>
    );
}
