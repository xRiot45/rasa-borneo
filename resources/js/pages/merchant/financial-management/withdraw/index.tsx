import MerchantLayout from '@/layouts/merchant/layout';
import { Withdraw } from '@/models/financial-management/withdraw';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';

interface Props {
    data: Withdraw[];
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

export default function WithdrawPage({ data }: Props) {
    console.log(data);
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
            </MerchantLayout>
        </>
    );
}
