import CardSummaryStatistics from '@/components/card-summary-statistic';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin/layout';
import { Merchant } from '@/models/merchant';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

export default function DashboardPage(props: Props) {
    const { totalUsers, totalMerchants, totalCustomers, totalCouriers, topRatedMerchants } = props;

    return (
        <>
            <Head title="Dashboard Admin" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <main className="p-4">
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

                    <div className="mt-10">
                        <h2 className="text-md mb-4 font-semibold text-gray-900 dark:text-white">Merchant dengan rating tertinggi</h2>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                                                <p className="text-muted-foreground text-sm">{category?.name ?? 'Kategori tidak diketahui'}</p>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-2">
                                            <div className="flex items-center justify-between">
                                                <Badge
                                                    variant="outline"
                                                    className="border-yellow-400 bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20"
                                                >
                                                    ⭐ {Number(item.avg_rating).toFixed(2)}
                                                </Badge>
                                                <p className="text-muted-foreground text-sm">{item.review_count} ulasan</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </AdminLayout>
        </>
    );
}
