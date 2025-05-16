import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import ButtonPartials from './partials/buttons';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Toko',
        href: '#',
    },
    {
        title: 'Meja',
        href: '/admin/store-management/table',
    },
];

export default function TableMerchantPage() {
    return (
        <>
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Meja</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola meja yang terdaftar di aplikasi anda</p>
                    </div>
                    <ButtonPartials />
                </div>
            </MerchantLayout>
        </>
    );
}
