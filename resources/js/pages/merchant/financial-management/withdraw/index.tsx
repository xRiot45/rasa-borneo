import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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

export default function WithdrawPage() {
    return (
        <>
            <Head title="Penarikan Dana" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <h1>Penarikan dana</h1>
            </MerchantLayout>
        </>
    );
}
