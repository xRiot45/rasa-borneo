import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import CourierLayout from '@/layouts/courier/layout';
import CourierSettingsLayout from '@/layouts/settings/courier-setting-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <CourierLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Tampilan" />

            <CourierSettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Tampilan" description="Perbarui pengaturan tampilan akun Anda" />
                    <AppearanceTabs />
                </div>
            </CourierSettingsLayout>
        </CourierLayout>
    );
}
