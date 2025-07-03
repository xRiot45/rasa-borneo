import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import AdminLayout from '@/layouts/admin/layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan',
        href: '#',
    },
    {
        title: 'Tampilan Web',
        href: '#',
    },
];

export default function Appearance() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Tampilan" />

            <main className="space-y-6 p-4">
                <HeadingSmall title="Tampilan" description="Perbarui pengaturan tampilan akun Anda" />
                <AppearanceTabs />
            </main>
        </AdminLayout>
    );
}
