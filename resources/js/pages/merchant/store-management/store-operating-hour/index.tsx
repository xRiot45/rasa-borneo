import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DayEnum } from '@/enums/day-enum';
import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import days from '@/utils/days';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

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

export default function StoreOperatingHour() {
    const [hours, setHours] = useState(
        days.map((day) => ({
            day: day.key,
            open_time: '08:00',
            close_time: '17:00',
            is_closed: false,
        })),
    );

    const handleToggle = (index: number) => {
        const newHours = [...hours];
        newHours[index].is_closed = !newHours[index].is_closed;
        setHours(newHours);
    };

    const handleTimeChange = (index: number, field: 'open_time' | 'close_time', value: string) => {
        const newHours = [...hours];
        newHours[index][field] = value;
        setHours(newHours);
    };

    return (
        <>
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <Head title="Jam Operasional Toko" />

                <main className="p-4">
                    <div className="space-y-4">
                        {hours.map((hour, index) => (
                            <Card
                                key={index}
                                className="flex flex-col gap-8 rounded-2xl border p-6 shadow-none md:flex-row md:items-center md:justify-between"
                            >
                                {/* Label Hari */}
                                <div className="w-full md:w-1/4">
                                    <Label className="block font-semibold capitalize">{DayEnum[hour.day as keyof typeof DayEnum]}</Label>
                                </div>

                                {/* Waktu Buka & Tutup */}
                                <div className="flex w-full flex-col gap-6 md:w-2/4 md:flex-row md:items-center">
                                    <div className="flex w-full flex-col space-y-2">
                                        <Label htmlFor={`open-${index}`}>Waktu Buka</Label>
                                        <Input
                                            id={`open-${index}`}
                                            type="time"
                                            value={hour.open_time}
                                            disabled={hour.is_closed}
                                            onChange={(e) => handleTimeChange(index, 'open_time', e.target.value)}
                                            className="rounded-xl py-6 shadow-none"
                                        />
                                    </div>
                                    <span className="mt-4 hidden md:inline">-</span>
                                    <div className="flex w-full flex-col space-y-2">
                                        <Label htmlFor={`close-${index}`}>Waktu Tutup</Label>
                                        <Input
                                            id={`close-${index}`}
                                            type="time"
                                            value={hour.close_time}
                                            disabled={hour.is_closed}
                                            onChange={(e) => handleTimeChange(index, 'close_time', e.target.value)}
                                            className="rounded-xl py-6 shadow-none"
                                        />
                                    </div>
                                </div>

                                {/* Switch Toko Tutup */}
                                <div className="flex w-full flex-col items-start space-y-2 md:w-1/4 md:items-end">
                                    <Label htmlFor={`closed-${index}`}>Toko Tutup</Label>
                                    <Switch id={`closed-${index}`} checked={hour.is_closed} onCheckedChange={() => handleToggle(index)} />
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button onClick={() => console.log('Save to API', hours)} className="cursor-pointer">
                            Simpan Perubahan
                            <Icon icon="material-symbols:save" className="ml-2" />
                        </Button>
                    </div>
                </main>
            </MerchantLayout>
        </>
    );
}
