import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CourierLayout from '@/layouts/courier/layout';
import { SharedData } from '@/types';
import { formatCurrency } from '@/utils/format-currency';
import { Icon } from '@iconify/react';
import { Head, usePage } from '@inertiajs/react';
import { Switch } from '@radix-ui/react-switch';
import { useState } from 'react';

interface Props {
    balance: number;
    earnings: { daily: number; weekly: number; monthly: number };
}

export default function CourierPage({ balance, earnings: { daily, weekly, monthly } }: Props) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const [isOnline, setIsOnline] = useState<boolean>(false);

    return (
        <>
            <Head title="Beranda" />
            <CourierLayout>
                <div className="mt-22 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">{`Halo, ${auth.user.full_name}`}</h2>
                            <p className="text-muted-foreground text-sm">Selamat datang di halaman kurir</p>
                        </div>
                        <Switch
                            checked={isOnline}
                            onCheckedChange={setIsOnline}
                            className={`relative inline-flex h-8 w-22 cursor-pointer items-center rounded-full transition-colors duration-500 ease-in-out ${
                                isOnline ? 'bg-black' : 'bg-gray-400 pl-2'
                            }`}
                        >
                            {/* Label Text: kiri saat online, kanan saat offline */}
                            <span
                                className={`absolute z-10 text-xs font-semibold text-white transition-[left,right,opacity] duration-500 ease-in-out will-change-[left,right,opacity] ${
                                    isOnline ? 'left-3 opacity-100' : 'right-3 opacity-100'
                                }`}
                            >
                                {isOnline ? 'Online' : 'Offline'}
                            </span>

                            {/* Thumb */}
                            <Switch
                                className={`block h-6 w-6 rounded-full bg-white shadow-none transition-transform duration-500 ease-in-out will-change-transform ${
                                    isOnline ? 'translate-x-[58px]' : 'translate-x-0'
                                }`}
                            />
                        </Switch>
                    </div>

                    {/* Wallet Section */}
                    <Card className="mx-auto w-full rounded-xl p-6 shadow-none">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-6">
                                <Icon icon="solar:wallet-money-bold-duotone" className="text-5xl" />
                                <div>
                                    <h2 className="text-sm font-medium">Dompet Anda</h2>
                                    <p className="mt-1 text-2xl font-bold">{formatCurrency(balance)}</p>
                                </div>
                            </div>
                            <Badge className="rounded-md text-xs font-medium">
                                Aktif
                                <Icon icon="material-symbols:verified" className="ml-1" />
                            </Badge>
                        </div>

                        {/* Divider */}
                        <hr className="mb-6 border-gray-200 dark:border-gray-700" />

                        {/* Balance Details */}
                        <div className="grid grid-cols-3 divide-x divide-gray-200 text-center dark:divide-gray-700">
                            {[
                                { label: 'Hari Ini', amount: formatCurrency(daily), icon: 'mdi:calendar-today' },
                                { label: 'Minggu Ini', amount: formatCurrency(weekly), icon: 'mdi:calendar-week' },
                                { label: 'Bulan Ini', amount: formatCurrency(monthly), icon: 'mdi:calendar-month' },
                            ].map(({ label, amount, icon }, idx) => (
                                <div key={label} className={`flex flex-col items-center px-6 py-4 ${idx !== 0 ? 'pl-8' : ''}`}>
                                    <Icon icon={icon} className="mb-2 text-2xl sm:text-3xl" />
                                    <p className="text-[10px] font-light uppercase sm:text-xs">{label}</p>
                                    <p className="mt-1 text-base font-bold sm:text-lg">{amount}</p>
                                </div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button className="w-full cursor-pointer rounded-md px-8 py-6 font-semibold shadow-none transition">
                                Tarik Saldo
                                <Icon icon="ph:hand-withdraw" className="ml-2 text-2xl" />
                            </Button>
                            <Button variant="outline" className="w-full cursor-pointer rounded-lg py-6 font-semibold shadow-none transition">
                                Riwayat
                                <Icon icon="material-symbols:history" className="ml-2 text-2xl" />
                            </Button>
                        </div>
                    </Card>
                </div>
            </CourierLayout>
        </>
    );
}
