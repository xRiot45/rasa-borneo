import CardSummaryStatistics from '@/components/card-summary-statistic';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import MerchantLayout from '@/layouts/merchant/layout';
import { MenuItem } from '@/models/menu-item';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';
import OrderTypePieChart from './components/order-type-pie-chart';
import PaymentMethodPieChart from './components/payment-method-pie-chart';
import ProfitChart from './components/profit-bar-chart';
import RevenueChart from './components/revenue-line-chart';

interface Props {
    totalMenu: number;
    totalMenuRecommended: number;
    totalCouponActive: number;
    totalTransactions: number;
    totalTransactionByPaymentStatus: {
        [key: string]: number;
    };
    totalTransactionsByOrderType: {
        [key: string]: number;
    };
    totalTransactionByPaymentMethod: {
        [key: string]: number;
    };
    topRatedMenus: {
        menu_item_id: number;
        avg_rating: number;
        review_count: number;
        menu_item: MenuItem;
    }[];
    topSellingMenus: {
        menu_item_id: number;
        total_quantity: number;
        menu_item: MenuItem;
    }[];
    revenueCharts: {
        month: string;
        total_revenue: number;
    }[];
    profitCharts: {
        report_date: string;
        total_revenue: number;
        total_expense: number;
        net_profit: number;
    }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/merchant/dashboard',
    },
];

export default function DashboardPage(props: Props) {
    const {
        totalMenu,
        totalMenuRecommended,
        totalCouponActive,
        totalTransactions,
        totalTransactionByPaymentStatus,
        totalTransactionsByOrderType,
        totalTransactionByPaymentMethod,
        topRatedMenus,
        topSellingMenus,
        revenueCharts,
        profitCharts,
    } = props;

    console.log('Revenue Chart', revenueCharts);

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

                    {/* Revenue Chart */}
                    <div className="mt-4 rounded-xl border p-4">
                        <h2 className="text-md mb-4 font-semibold">Grafik Pendapatan</h2>
                        <RevenueChart data={revenueCharts} />
                    </div>

                    <div className="mt-4 rounded-xl border p-4">
                        <h2 className="text-md mb-4 font-semibold">Grafik Laba</h2>
                        <ProfitChart data={profitCharts} />
                    </div>

                    {/* Grafik */}
                    <div className="grid gap-4 py-4 sm:grid-cols-2">
                        <div className="rounded-xl border p-4">
                            <div className="mx-auto h-96 w-96">
                                <OrderTypePieChart data={totalTransactionsByOrderType} />
                            </div>
                        </div>

                        <div className="rounded-xl border p-4">
                            <div className="mx-auto h-96 w-96">
                                <PaymentMethodPieChart data={totalTransactionByPaymentMethod} />
                            </div>
                        </div>
                    </div>

                    {/* Top Rated */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <ScrollArea className="bg-background h-[600px] rounded-xl border p-6">
                                <h2 className="text-md mb-4 font-semibold">Menu dengan penjualan tertinggi</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {topSellingMenus?.map((item, index) => {
                                        const menu = item.menu_item;
                                        return (
                                            <Card key={index} className="rounded-2xl py-4 shadow-none">
                                                <CardHeader className="flex flex-row items-center gap-4">
                                                    <Avatar className="h-15 w-16 object-cover">
                                                        <AvatarImage src={`${menu?.image_url}`} alt={menu?.name} />
                                                        <AvatarFallback>{menu?.name?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <CardTitle className="text-md">{menu?.name ?? 'Unknown'}</CardTitle>
                                                        <p className="text-muted-foreground text-sm">
                                                            {menu?.menu_category?.name ?? 'Kategori tidak diketahui'}
                                                        </p>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="pt-2">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-muted-foreground text-sm">{item.total_quantity} terjual</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        </div>
                        <div>
                            <ScrollArea className="bg-background h-[600px] rounded-xl border p-6">
                                <h2 className="text-md mb-4 font-semibold">Menu dengan rating tertinggi</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {topRatedMenus?.map((item, index) => {
                                        const menu = item.menu_item;
                                        return (
                                            <Card key={index} className="rounded-2xl py-4 shadow-none">
                                                <CardHeader className="flex flex-row items-center gap-4">
                                                    <Avatar className="h-15 w-16 object-cover">
                                                        <AvatarImage src={`${menu?.image_url}`} alt={menu?.name} />
                                                        <AvatarFallback>{menu?.name?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <CardTitle className="text-md">{menu?.name ?? 'Unknown'}</CardTitle>
                                                        <p className="text-muted-foreground text-sm">
                                                            {menu?.menu_category?.name ?? 'Kategori tidak diketahui'}
                                                        </p>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="pt-2">
                                                    <div className="flex items-center justify-between">
                                                        <Badge variant="outline" className="rounded-sm border-green-400 bg-green-100 text-green-600">
                                                            <Icon icon="material-symbols:star" /> {Number(item.avg_rating).toFixed(2)}
                                                        </Badge>
                                                        <p className="text-muted-foreground text-sm">{item.review_count} ulasan</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </main>
            </MerchantLayout>
        </>
    );
}
