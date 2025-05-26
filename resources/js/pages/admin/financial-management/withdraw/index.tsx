import AdminLayout from '@/layouts/admin/layout';
import { Withdraw } from '@/models/financial-management/withdraw';
import { BreadcrumbItem } from '@/types';
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
        href: '/admin/financial-management/withdraw',
    },
];

export default function WithdrawPage({ data }: Props) {
    console.log(data);
    return (
        <>
            <Head title="Penarikan Dana" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Semua Penarikan Dana</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua pengajuan penarikan dana yang telah diajukan</p>
                    </div>
                    <ButtonPartials />
                </div>

                <div className="p-4">
                    <WithdrawTable data={data} columns={columns} />
                </div>
            </AdminLayout>
        </>
    );
}
