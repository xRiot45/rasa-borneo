import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/layouts/admin/layout';
import { Withdraw } from '@/models/financial-management/withdraw';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';
import CourierWithdrawTab from './partials/courier-withdraw-tabs';
import MerchantWithdrawTab from './partials/merchant-withdraw-tabs';

interface Props {
    withdrawalMerchants: Withdraw[];
    withdrawalCouriers: Withdraw[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Keuangan',
        href: '#',
    },
    {
        title: 'Penarikan Dana',
        href: '/admin/financial-management/withdraw',
    },
];

export default function WithdrawPage({ withdrawalMerchants, withdrawalCouriers }: Props) {
    return (
        <>
            <Head title="Penarikan Dana" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Semua Penarikan Dana</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua penarikan dana yang telah diajukan oleh merchant</p>
                    </div>
                    <ButtonPartials />
                </div>

                <Tabs defaultValue="withdrawalMerchants">
                    <TabsList className="border-muted gap-4 border-b px-0">
                        {[
                            { value: 'withdrawalMerchants', label: 'Penarikan Merchant' },
                            { value: 'withdrawalCouriers', label: 'Penarikan Kurir' },
                        ].map((tab) => (
                            <div key={tab.value} className="relative">
                                <TabsTrigger value={tab.value} className="cursor-pointer">
                                    {tab.label}
                                </TabsTrigger>
                            </div>
                        ))}
                    </TabsList>

                    <TabsContent value="withdrawalMerchants" className="mt-8">
                        <MerchantWithdrawTab data={withdrawalMerchants} />
                    </TabsContent>

                    <TabsContent value="withdrawalCouriers" className="mt-8">
                        <CourierWithdrawTab data={withdrawalCouriers} />
                    </TabsContent>
                </Tabs>
            </AdminLayout>
        </>
    );
}
