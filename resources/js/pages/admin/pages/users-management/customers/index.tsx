import AdminLayout from '@/layouts/admin/layout';
import { Customer } from '@/models/customer';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';
import CustomerTable from './partials/table';
import { columns } from './partials/table/columns';

interface CustomersPageProps {
    data: Customer[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pengguna',
        href: '#',
    },
    {
        title: 'Customer / Pembeli',
        href: '/admin/users-management/customers',
    },
];

export default function CustomersPage({ data }: CustomersPageProps) {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Customer / Pembeli" />
            <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Semua Customer</h2>
                    <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua customer yang terdaftar di aplikasi anda</p>
                </div>
                <ButtonPartials />
            </div>

            <div className="p-4">
                <CustomerTable data={data} columns={columns} />
            </div>
        </AdminLayout>
    );
}
