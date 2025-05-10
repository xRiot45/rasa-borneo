import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import MerchantLayout from '@/layouts/merchant/layout';
import { StoreOperatingHour } from '@/models/store-management/store-operating-hour';
import { BreadcrumbItem } from '@/types';
import dayTranslations from '@/utils/day-translation';
import { Icon } from '@iconify/react';
import { Head, Link } from '@inertiajs/react';

interface StoreOperatingHourProps {
    data: StoreOperatingHour[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Toko',
        href: '#',
    },
    {
        title: 'Jam Operasional Toko',
        href: '/admin/store-management/store-opeating-hour',
    },
];

export default function StoreOperatingHourPage({ data }: StoreOperatingHourProps) {
    return (
        <>
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <Head title="Jam Operasional Toko" />
                <main className="p-4">
                    <div className="mb-2 flex flex-wrap justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Jam Operasional Toko</h2>
                            <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola jam operasional toko anda di sini</p>
                        </div>

                        <Link href={route('merchant.store-operating-hour.create')}>
                            <Button className="flex cursor-pointer justify-end">
                                Perbarui Jam Operasional
                                <Icon icon="material-symbols:edit" className="ml-2" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {data.map((item, index) => {
                            return (
                                <Card
                                    key={index}
                                    className={`flex flex-col gap-6 rounded-2xl border p-6 shadow-none transition duration-300 ${
                                        item.is_closed ? 'border-red-300 bg-red-50 text-red-900' : 'border-green-300 bg-green-50 text-green-900'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <Label className="block text-lg font-semibold">{dayTranslations[item.day] || item.day}</Label>

                                        {item.is_closed ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 shadow">
                                                <Icon icon="mdi:close-circle-outline" className="text-lg text-red-600" />
                                                Toko Tutup
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 shadow">
                                                <Icon icon="mdi:check-circle-outline" className="text-lg text-green-600" />
                                                Toko Buka
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
                                        <div className="flex flex-col space-y-1">
                                            <Label className="text-muted-foreground text-sm">Waktu Buka</Label>
                                            <div className={`text-lg font-semibold ${item.is_closed ? 'text-gray-500' : 'text-green-800'}`}>
                                                {item.is_closed ? '-' : item.open_time}
                                            </div>
                                        </div>

                                        <span className="hidden md:inline">—</span>

                                        <div className="flex flex-col space-y-1">
                                            <Label className="text-muted-foreground text-sm">Waktu Tutup</Label>
                                            <div className={`text-lg font-semibold ${item.is_closed ? 'text-gray-500' : 'text-green-800'}`}>
                                                {item.is_closed ? '-' : item.close_time}
                                            </div>
                                        </div>
                                    </div>

                                    {item.is_closed ? (
                                        <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                                            <Icon icon="material-symbols:info-outline-rounded" className="text-base" />
                                            Toko tidak beroperasi pada hari ini.
                                        </div>
                                    ) : (
                                        <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                                            <Icon icon="material-symbols:info-outline-rounded" className="text-base" />
                                            Toko sedang beroperasi dengan jam normal.
                                        </div>
                                    )}
                                </Card>
                            );
                        })}
                    </div>

                    {/* Tombol untuk Memperbarui Data */}
                </main>
            </MerchantLayout>
        </>
    );
}
