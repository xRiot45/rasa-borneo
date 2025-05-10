import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DayEnum } from '@/enums/day-enum';
import MerchantLayout from '@/layouts/merchant/layout';
import { StoreOperatingHour } from '@/models/store-management/store-operating-hour';
import { BreadcrumbItem } from '@/types';
import days from '@/utils/days';
import { Icon } from '@iconify/react';
import { Head, Link, router } from '@inertiajs/react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { toast } from 'sonner';

interface StoreOrUpdatePageProps {
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
    {
        title: 'Tambah / Update Jam Operasional Toko',
        href: '#',
    },
];

export default function StoreOrUpdatePage({ data }: StoreOrUpdatePageProps) {
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [hours, setHours] = useState(() =>
        days.map((day) => {
            const existing = data?.find((item) => item.day === day.key);
            return {
                day: day.key,
                open_time: existing?.open_time ?? '08:00',
                close_time: existing?.close_time ?? '17:00',
                is_closed: existing?.is_closed ?? false,
            };
        }),
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
            { hours: hours },
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
                                                step="60"
                                                value={hour.open_time}
                                                disabled={hour.is_closed}
                                                onChange={(e) => {
                                                    const time = e.target.value.slice(0, 5);
                                                    handleTimeChange(index, 'open_time', time);
                                                }}
                                                className="rounded-xl py-6 shadow-none"
                                            />
                                        </div>
                                        <span className="mt-4 hidden md:inline">-</span>
                                        <div className="flex w-full flex-col space-y-2">
                                            <Label htmlFor={`close-${index}`}>Waktu Tutup</Label>
                                            <Input
                                                id={`close-${index}`}
                                                type="time"
                                                step="60"
                                                value={hour.close_time}
                                                disabled={hour.is_closed}
                                                onChange={(e) => {
                                                    const time = e.target.value.slice(0, 5);
                                                    handleTimeChange(index, 'close_time', time);
                                                }}
                                                className="flex rounded-xl py-6 pr-4 shadow-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Switch Toko Tutup */}
                                    <div className="flex w-full flex-col items-start space-y-2 md:w-1/4 md:items-end">
                                        <Label htmlFor={`closed-${index}`}>Toko Tutup</Label>
                                        <Switch id={`closed-${index}`} checked={hour.is_closed} onCheckedChange={() => handleToggle(index)} />
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mt-6 flex items-center justify-end gap-3">
                            <Link href={route('merchant.store-operating-hour.index_merchant')}>
                                <Button className="flex justify-end" variant="destructive">
                                    <Icon icon="material-symbols:close" className="ml-2" />
                                    Batalkan
                                </Button>
                            </Link>
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
