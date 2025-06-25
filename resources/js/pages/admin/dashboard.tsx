import CardSummaryStatistics from '@/components/card-summary-statistic';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import AdminLayout from '@/layouts/admin/layout';
import { MenuItem } from '@/models/menu-item';
import { Merchant } from '@/models/merchant';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';
import OrderTypePieChart from './components/order-type-pie-chart';
import PaymentMethodPieChart from './components/payment-method-pie-chart';

interface Props {
    totalUsers: number;
    totalMerchants: number;
    totalCustomers: number;
    totalCouriers: number;
    topRatedMerchants: {
        merchant_id: number;
        avg_rating: number;
        review_count: number;
        merchant: Merchant;
    }[];
    topRatedMenus: {
        menu_item_id: number;
        avg_rating: number;
        review_count: number;
        menu_item: MenuItem;
    }[];
    transactionsByOrderType: {
        [key: string]: number;
    };
    transactionByPaymentMethod: {
        [key: string]: number;
    };
    transactionByPaymentStatus: {
        [key: string]: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

export default function DashboardPage(props: Props) {
    const {
        totalUsers,
        totalMerchants,
        totalCustomers,
        totalCouriers,
        topRatedMerchants,
        topRatedMenus,
        transactionsByOrderType,
        transactionByPaymentMethod,
        transactionByPaymentStatus,
    } = props;

    return (
        <>
            <Head title="Dashboard Admin" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <main className="p-4">
                    {/* Statistik Umum */}
                    <div className="rounded-xl border p-4">
                        <h2 className="text-md mb-4 font-semibold">Statistik Umum</h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                    </div>

                    {/* Statistik Transaksi */}
                    <div className="mt-4 rounded-xl border p-4">
                        <h2 className="text-md mb-4 font-semibold">Statistik Transaksi</h2>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <CardSummaryStatistics
                                data={transactionByPaymentStatus['menunggu'] || 0}
                                title="Transaksi Menunggu"
                                subtitle="Menunggu"
                                description="Jumlah transaksi yang menunggu pembayaran"
                                icon="mdi:clock-outline"
                            />
                            <CardSummaryStatistics
                                data={transactionByPaymentStatus['dibayar'] || 0}
                                title="Transaksi Dibayar"
                                subtitle="Dibayar"
                                description="Jumlah transaksi yang sudah dibayar"
                                icon="mdi:check-circle-outline"
                            />
                            <CardSummaryStatistics
                                data={transactionByPaymentStatus['gagal'] || 0}
                                title="Transaksi Gagal"
                                subtitle="Gagal"
                                description="Jumlah transaksi yang gagal"
                                icon="mdi:close-circle-outline"
                            />
                            <CardSummaryStatistics
                                data={transactionByPaymentStatus['dibatalkan'] || 0}
                                title="Transaksi Dibatalkan"
                                subtitle="Dibatalkan"
                                description="Jumlah transaksi yang dibatalkan"
                                icon="mdi:cancel"
                            />
                        </div>
                    </div>

                    {/* Grafik */}
                    <div className="grid gap-4 py-4 sm:grid-cols-2">
                        <div className="rounded-xl border p-4">
                            <div className="mx-auto h-96 w-96">
                                <OrderTypePieChart data={transactionsByOrderType} />
                            </div>
                        </div>

                        <div className="rounded-xl border p-4">
                            <div className="mx-auto h-96 w-96">
                                <PaymentMethodPieChart data={transactionByPaymentMethod} />
                            </div>
                        </div>
                    </div>

                    {/* Top Rated */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <ScrollArea className="bg-background h-[600px] rounded-xl border p-6">
                                <h2 className="text-md mb-4 font-semibold">Merchant dengan rating tertinggi</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {topRatedMerchants.map((item, index) => {
                                        const merchant = item.merchant;
                                        const storeProfile = merchant?.store_profile;
                                        const category = merchant?.business_category;

                                        return (
                                            <Card key={index} className="rounded-2xl py-4 shadow-none">
                                                <CardHeader className="flex flex-row items-center gap-4">
                                                    <Avatar className="h-16 w-16">
                                                        <AvatarImage src={`${storeProfile?.logo_photo}`} alt={merchant?.business_name} />
                                                        <AvatarFallback>{merchant?.business_name?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <CardTitle className="text-lg">{merchant?.business_name ?? 'Unknown'}</CardTitle>
                                                        <p className="text-muted-foreground text-sm">
                                                            {category?.name ?? 'Kategori tidak diketahui'}
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
            </AdminLayout>
        </>
    );
}
