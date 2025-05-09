import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Toko',
        href: '#',
    },
    {
        title: 'Profile Toko',
        href: '/admin/store-management/store-profile',
    },
];

export default function StoreProfile() {
    return (
        <>
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <Head title="Profile Toko" />
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Profile Toko</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola profile toko anda di sini</p>
                    </div>
                    <ButtonPartials />
                </div>
            </MerchantLayout>
        </>
    );
}
