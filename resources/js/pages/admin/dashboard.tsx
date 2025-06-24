import CardSummaryStatistics from '@/components/card-summary-statistic';
import AdminLayout from '@/layouts/admin/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    totalUsers: number;
    totalMerchants: number;
    totalCustomers: number;
    totalCouriers: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

export default function DashboardPage(props: Props) {
    const { totalUsers, totalMerchants, totalCustomers, totalCouriers } = props;

    return (
        <>
            <Head title="Dashboard Admin" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
                    <CardSummaryStatistics
                        data={totalUsers}
                        title="Total User"
                        subtitle="User"
                        description="Total user yang terdaftar di aplikasi"
                        icon="mdi:account-outline"
                    />

                    <CardSummaryStatistics
                        data={totalMerchants}
                        title="Total Merchant"
                        subtitle="Merchant"
                        description="Total merchant yang terdaftar di aplikasi"
                        icon="mdi:store-outline"
                    />

                    <CardSummaryStatistics
                        data={totalCustomers}
                        title="Total Customer"
                        subtitle="Customer"
                        description="Total customer yang terdaftar di aplikasi"
                        icon="mdi:account-outline"
                    />

                    <CardSummaryStatistics
                        data={totalCouriers}
                        title="Total Kurir"
                        subtitle="Kurir"
                        description="Total kurir yang terdaftar di aplikasi"
                        icon="mdi:truck-delivery-outline"
                    />
                </div>
            </AdminLayout>
        </>
    );
}
