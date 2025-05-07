import AdminLayout from '@/layouts/admin/layout';
import { Merchant } from '@/models/merchant';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';
import MerchantsTable from './partials/table';
import { columns } from './partials/table/columns';

interface MerchantPageProps {
    data: Merchant[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pengguna',
        href: '#',
    },
    {
        title: 'Merchant / Penjual',
        href: '/admin/users-management/merchants',
    },
];

export default function MerchantsPage({ data }: MerchantPageProps) {
    console.log(data);
    return (
        <>
            <AdminLayout breadcrumbs={breadcrumbs}>
                <Head title="Merchants" />
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Semua Penjual</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua penjual yang terdaftar di aplikasi anda</p>
                    </div>
                    <ButtonPartials />
                </div>

                <div className="p-4">
                    <MerchantsTable data={data} columns={columns} />
                </div>
            </AdminLayout>
        </>
    );
}
