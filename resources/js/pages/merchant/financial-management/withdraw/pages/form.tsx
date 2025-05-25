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
    {
        title: 'Ajukan Penarikan Dana',
        href: '#',
    },
];

export default function FormPage() {
    return (
        <>
            <Head title="Ajukan Penarikan Dana" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <h1>Test</h1>
            </MerchantLayout>
        </>
    );
}
