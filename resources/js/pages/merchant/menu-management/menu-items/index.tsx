import MerchantLayout from '@/layouts/merchant/layout';
import { MenuItem } from '@/models/menu-item';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';
import MenuItemTable from './partials/table';
import { columns } from './partials/table/columns';

interface MenuItemPageProps {
    data: MenuItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Menu',
        href: '#',
    },
    {
        title: 'Menu',
        href: '/admin/menu-management/menu-items',
    },
];

export default function MenuItemsPage({ data }: MenuItemPageProps) {
    return (
        <>
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <Head title="Menu" />
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Semua Menu</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua menu anda</p>
                    </div>
                    <ButtonPartials />
                </div>

                <div className="p-4">
                    <MenuItemTable data={data} columns={columns} />
                </div>
            </MerchantLayout>
        </>
    );
}
