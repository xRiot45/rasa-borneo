import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DayEnum } from '@/enums/day-enum';
import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import days from '@/utils/days';
import { Icon } from '@iconify/react';
import { Head, router } from '@inertiajs/react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { toast } from 'sonner';

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
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [hours, setHours] = useState(
        days.map((day) => ({
            day: day.key,
            open_time: '08:00',
            close_time: '17:00',
            is_closed: false,
        })),
    );

    const dayMappingInIndonesian = {
        SUNDAY: 'minggu',
        MONDAY: 'senin',
        TUESDAY: 'selasa',
        WEDNESDAY: 'rabu',
        THURSDAY: 'kamis',
        FRIDAY: 'jumat',
        SATURDAY: 'sabtu',
    };

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

    const hoursWithIndonesianDays = hours.map((hour) => ({
        ...hour,
        day: dayMappingInIndonesian[hour.day as keyof typeof dayMappingInIndonesian],
    }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    const handleConfirmSubmit = () => {
        router.post(
            route('merchant.store-operating-hour.storeOrUpdate'),
            { hours: hoursWithIndonesianDays },
            {
                onSuccess: () => {
                    setShowDialog(false);
                    toast.success('Success', {
                        description: 'Jam Operasional Toko Berhasil Diperbarui!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                },
                onError: (error) => {
                    Object.keys(error).forEach((key) => {
                        setShowDialog(false);
                        toast.error('Error', {
                            description: error[key],
                            action: {
                                label: 'Tutup',
                                onClick: () => toast.dismiss(),
                            },
                        });
                    });
                },
            },
        );
    };

    return (
        <>
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <Head title="Jam Operasional Toko" />

                <main className="p-4">
                    <div className="space-y-4">
                        {hours.map((hour, index) => {
                            return (
                                <Card
                                    key={index}
                                    className={`flex flex-col gap-8 rounded-2xl border p-6 shadow-none md:flex-row md:items-center md:justify-between ${hour.is_closed ? 'bg-red-500 text-white' : ''}`}
                                >
                                    {/* Label Hari */}
                                    <div className="w-full md:w-1/4">
                                        <Label className="block font-semibold capitalize">{DayEnum[hour.day as keyof typeof DayEnum]}</Label>
                                        {hour.is_closed && (
                                            <div className="rounded-full bg-red-700 p-2 text-center text-xl font-bold text-white">Toko Tutup</div>
                                        )}
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
                                                className="flex rounded-xl py-6 pr-4 shadow-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Switch Toko Tutup */}
                                    <div className="flex w-full flex-col items-start space-y-2 md:w-1/4 md:items-end">
                                        <Label htmlFor={`closed-${index}`}>Toko Tutup</Label>
                                        <Switch id={`closed-${index}`} checked={hour.is_closed} onCheckedChange={() => handleToggle(index)} />
                                        {hour.is_closed && (
                                            <span className="mt-2 inline-block rounded-md bg-red-500 px-2 py-1 text-white">Toko Tutup</span>
                                        )}
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mt-6 flex justify-end">
                            <Button type="submit" className="cursor-pointer">
                                Simpan Perubahan
                                <Icon icon="material-symbols:save" className="ml-2" />
                            </Button>
                        </div>
                    </form>

                    <Dialog open={showDialog} onOpenChange={setShowDialog}>
                        <DialogTrigger asChild>{/* Dibiarkan kosong, karena kita mengontrol dialog secara manual */}</DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader className="text-lg font-bold">Konfirmasi Perubahan</DialogHeader>
                            <DialogDescription className="text-muted-foreground">
                                Apakah Anda yakin ingin menyimpan perubahan jam operasional toko?
                            </DialogDescription>
                            <DialogFooter>
                                <Button onClick={handleCloseDialog} variant="outline" className="cursor-pointer">
                                    Batal
                                </Button>
                                <Button onClick={handleConfirmSubmit} className="ml-2 cursor-pointer">
                                    Ya, Simpan
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </main>
            </MerchantLayout>
        </>
    );
}
