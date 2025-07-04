import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import MerchantLayout from '@/layouts/merchant/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan',
        href: '#',
    },
    {
        title: 'Tampilan Web',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <MerchantLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Tampilan" />

            <main className="space-y-6 p-4">
                <HeadingSmall title="Tampilan" description="Perbarui pengaturan tampilan akun Anda" />
                <AppearanceTabs />
            </main>
        </MerchantLayout>
    );
}
