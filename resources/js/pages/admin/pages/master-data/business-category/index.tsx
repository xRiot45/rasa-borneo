import AdminLayout from '@/layouts/admin/layout';
import { BusinessCategory } from '@/models/business-category';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';
import BusinessCategoryTable from './partials/table';
import { columns } from './partials/table/columns';

interface BusinessCategoryPageProps {
    data: BusinessCategory[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: '#',
    },
    {
        title: 'Kategori Bisnis',
        href: '/admin/master-data/business-categories',
    },
];

export default function BusinessCategoryPage({ data }: BusinessCategoryPageProps) {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Kategori Bisnis" />
            <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Kategori Bisnis</h2>
                    <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola kategori bisnis yang terdaftar di aplikasi anda</p>
                </div>
                <ButtonPartials />
            </div>

            <div className="p-4">
                <BusinessCategoryTable data={data} columns={columns} />
            </div>
        </AdminLayout>
    );
}
