import AdminLayout from '@/layouts/admin/layout';
import { Admin } from '@/models/admin';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';
import AdminTable from './partials/table';
import { columns } from './partials/table/columns';

interface Props {
    admins: Admin[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pengguna',
        href: '#',
    },
    {
        title: 'Admin',
        href: '/admin/users-management/admins',
    },
];

export default function AdminPage({ admins }: Props) {
    return (
        <>
            <Head title="Admin" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Semua Admin</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua admin yang terdaftar di aplikasi anda</p>
                    </div>
                    <ButtonPartials />
                </div>

                <div className="p-4">
                    <AdminTable data={admins} columns={columns} />
                </div>
            </AdminLayout>
        </>
    );
}
