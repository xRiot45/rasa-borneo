import CardSummaryStatistics from '@/components/card-summary-statistic';
import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    totalMenu: number;
    totalMenuRecommended: number;
    totalCouponActive: number;
    totalTransactions: number;
    totalTransactionByPaymentStatus: {
        [key: string]: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/merchant/dashboard',
    },
];

export default function DashboardPage(props: Props) {
    const { totalMenu, totalMenuRecommended, totalCouponActive, totalTransactions, totalTransactionByPaymentStatus } = props;

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

                    {/* Statistik Transaksi */}
                    <div className="mt-4 rounded-xl border p-4">
                        <h2 className="text-md mb-4 font-semibold">Statistik Transaksi</h2>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <CardSummaryStatistics
                                data={totalTransactionByPaymentStatus['menunggu'] || 0}
                                title="Transaksi Menunggu"
                                subtitle="Menunggu"
                                description="Jumlah transaksi yang menunggu pembayaran"
                                icon="mdi:clock-outline"
                            />
                            <CardSummaryStatistics
                                data={totalTransactionByPaymentStatus['dibayar'] || 0}
                                title="Transaksi Dibayar"
                                subtitle="Dibayar"
                                description="Jumlah transaksi yang sudah dibayar"
                                icon="mdi:check-circle-outline"
                            />
                            <CardSummaryStatistics
                                data={totalTransactionByPaymentStatus['gagal'] || 0}
                                title="Transaksi Gagal"
                                subtitle="Gagal"
                                description="Jumlah transaksi yang gagal"
                                icon="mdi:close-circle-outline"
                            />
                            <CardSummaryStatistics
                                data={totalTransactionByPaymentStatus['dibatalkan'] || 0}
                                title="Transaksi Dibatalkan"
                                subtitle="Dibatalkan"
                                description="Jumlah transaksi yang dibatalkan"
                                icon="mdi:cancel"
                            />
                        </div>
                    </div>
                </main>
            </MerchantLayout>
        </>
    );
}
