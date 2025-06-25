import CardSummaryStatistics from '@/components/card-summary-statistic';
import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    totalMenu: number;
    totalMenuRecommended: number;
    totalCouponActive: number;
    totalTransactions: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/merchant/dashboard',
    },
];

export default function DashboardPage(props: Props) {
    const { totalMenu, totalMenuRecommended, totalCouponActive, totalTransactions } = props;

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

                            <CardSummaryStatistics
                                data={totalMenuRecommended}
                                title="Total Menu Direkomendasikan"
                                subtitle="Menu"
                                description="Total menu yang direkomendasikan di aplikasi"
                                icon="material-symbols:recommend"
                            />

                            <CardSummaryStatistics
                                data={totalCouponActive}
                                title="Total Kupon Aktif"
                                subtitle="Kupon"
                                description="Total kupon yang aktif di aplikasi"
                                icon="mdi:coupon"
                            />

                            <CardSummaryStatistics
                                data={totalTransactions}
                                title="Total Transaksi"
                                subtitle="Transaksi"
                                description="Total semua transaksi di aplikasi"
                                icon="mdi:currency-usd"
                            />
                        </div>
                    </div>
                </main>
            </MerchantLayout>
        </>
    );
}
