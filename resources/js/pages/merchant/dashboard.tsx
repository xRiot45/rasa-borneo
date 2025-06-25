import CardSummaryStatistics from '@/components/card-summary-statistic';
import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    totalMenu: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/merchant/dashboard',
    },
];

export default function DashboardPage(props: Props) {
    const { totalMenu } = props;
    console.log(totalMenu);
    return (
        <>
            <Head title="Dashboard Merchant" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <main className="p-4">
                    {/* Statistik Umum */}
                    <div className="rounded-xl border p-4">
                        <h2 className="text-md mb-4 font-semibold">Statistik Umum</h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <CardSummaryStatistics
                                data={totalMenu}
                                title="Total Menu"
                                subtitle="Menu"
                                description="Total menu yang terdaftar di aplikasi"
                                icon="mdi:food-fork-drink"
                            />
                        </div>
                    </div>
                </main>
            </MerchantLayout>
        </>
    );
}
