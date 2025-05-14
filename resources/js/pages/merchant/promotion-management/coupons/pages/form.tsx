import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { CouponTypeEnum } from '@/enums/coupon-type';
import MerchantLayout from '@/layouts/merchant/layout';
import { cn } from '@/lib/utils';
import { Coupon, CouponForm } from '@/models/coupon';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { CalendarIcon, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    coupon: Coupon;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Promosi',
        href: '#',
    },
    {
        title: 'Kupon',
        href: '/admin/promotion-management/coupons',
    },
    {
        title: 'Form Kupon',
        href: '#',
    },
];

export default function FormPage({ coupon }: Props) {
    const isEdit = !!coupon?.id;

    const { data, setData, post, put, processing, errors, reset } = useForm<Required<CouponForm>>({
        code: isEdit ? coupon?.code : '',
        type: isEdit ? coupon?.type : null,
        discount: isEdit ? coupon?.discount : 0,
        minimum_purchase: isEdit ? coupon?.minimum_purchase : 0,
        start_date: isEdit ? new Date(coupon?.start_date) : new Date(''),
        end_date: isEdit ? new Date(coupon?.end_date) : new Date(''),
        is_active: isEdit ? coupon?.is_active : false,
    });

    const [inputDate, setInputDate] = useState(() => {
        const startDate = data?.start_date instanceof Date && !isNaN(data.start_date.getTime()) ? data.start_date.toISOString().split('T')[0] : '';
        const endDate = data?.end_date instanceof Date && !isNaN(data.end_date.getTime()) ? data.end_date.toISOString().split('T')[0] : '';

        return {
            startDate,
            endDate,
        };
    });

    const handleInputDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setInputDate((prev) => ({
            ...prev,
            [name]: value,
        }));

        const parsedDate = new Date(value);
        if (!isNaN(parsedDate.getTime())) {
            const dataKey = name === 'startDate' ? 'start_date' : 'end_date';
            setData(dataKey, parsedDate);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit && coupon) {
            put(route('merchant.coupon.update', { id: coupon?.id }), {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Kupon Berhasil Diedit!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                    reset();
                },
                onError: (errors) => {
                    Object.keys(errors).forEach((key) => {
                        toast.error('Error', {
                            description: errors[key],
                            action: {
                                label: 'Tutup',
                                onClick: () => toast.dismiss(),
                            },
                        });
                    });
                },
            });
        } else {
            post(route('merchant.coupon.store'), {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Kupon Berhasil Ditambahkan!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                    reset();
                },
                onError: (errors) => {
                    Object.keys(errors).forEach((key) => {
                        toast.error('Error', {
                            description: errors[key],
                            action: {
                                label: 'Tutup',
                                onClick: () => toast.dismiss(),
                            },
                        });
                    });
                },
            });
        }
    };

    return (
        <>
            <Head title={isEdit ? 'Edit Kupon' : 'Buat Kupon'} />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <form onSubmit={handleSubmit} className="space-y-8 p-4">
                    <div className="grid gap-4 lg:grid-cols-3">
                        {/* Kode Kupon */}
                        <div className="grid gap-1">
                            <Label htmlFor="code">
                                Kode Kupon <strong className="text-xs text-red-500">(Max: 6 Karakter)</strong>
                            </Label>
                            <Input
                                id="code"
                                type="text"
                                autoFocus
                                tabIndex={1}
                                autoComplete="code"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                placeholder="Masukkan kode kupon"
                                className={cn('mt-1 rounded-xl py-6', errors.code && 'border border-red-500')}
                            />
                            <InputError message={errors.code} className="mt-2" />
                        </div>

                        {/* Tipe Kupon */}
                        <div className="grid gap-2">
                            <Label htmlFor="type">Tipe Kupon</Label>
                            <Select value={data.type ?? undefined} onValueChange={(value) => setData('type', value as CouponTypeEnum)}>
                                <SelectTrigger className="w-full px-4 py-6">
                                    <SelectValue placeholder="Pilih Tipe Kupon" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(CouponTypeEnum).map((value) => (
                                        <SelectItem key={value} value={value} className="cursor-pointer p-4 capitalize">
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.type} className="mt-2" />
                        </div>

                        {/* Jumlah Diskon */}
                        <div className="grid gap-1">
                            <Label htmlFor="discount">Jumlah Discount</Label>
                            <Input
                                id="discount"
                                type="number"
                                required
                                tabIndex={2}
                                autoComplete="discount"
                                value={data.discount}
                                onChange={(e) => setData('discount', parseInt(e.target.value))}
                                disabled={processing}
                                placeholder="Masukkan jumlah discount"
                                className={cn('mt-1 rounded-xl px-4 py-6', errors.discount && 'border border-red-500')}
                            />
                            <InputError message={errors.discount} />
                        </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                        {/* Minimum Pembelian */}
                        <div className="grid gap-1">
                            <Label htmlFor="minimum_purchase">Minimum Pembelian</Label>
                            <Input
                                id="minimum_purchase"
                                type="number"
                                required
                                tabIndex={2}
                                autoComplete="minimum_purchase"
                                value={data.minimum_purchase}
                                onChange={(e) => setData('minimum_purchase', parseInt(e.target.value))}
                                disabled={processing}
                                placeholder="Masukkan jumlah minimum pembelian"
                                className={cn('mt-1 rounded-xl px-4 py-6', errors.minimum_purchase && 'border border-red-500')}
                            />
                            <InputError message={errors.minimum_purchase} />
                        </div>

                        {/* Tanggal Mulai Kupon */}
                        <div className="grid gap-2">
                            <Label htmlFor="start_date">Tanggal Mulai Kupon</Label>
                            <Popover>
                                <PopoverTrigger>
                                    <Button type="button" variant="outline" className="w-full px-4 py-6">
                                        {data.start_date instanceof Date && !isNaN(data.start_date.getTime()) ? (
                                            <span>{data.start_date.toDateString()}</span>
                                        ) : (
                                            <span className="text-sm text-gray-400">Masukkan Tanggal Mulai Kupon</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-5 w-5 text-gray-500" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-2">
                                    <Input
                                        type="date"
                                        name="startDate"
                                        value={inputDate.startDate}
                                        onChange={handleInputDate}
                                        className="mb-2 py-6 text-center"
                                        placeholder="tahun-bulan-tanggal"
                                    />

                                    <Calendar
                                        mode="single"
                                        selected={data.start_date ?? new Date()}
                                        onSelect={(date) => {
                                            const formatted = date ? date.toISOString().split('T')[0] : '';
                                            setData('start_date', date ?? new Date());
                                            setInputDate((prev) => ({
                                                ...prev,
                                                startDate: formatted,
                                            }));
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <InputError message={errors.start_date} className="mt-2" />
                        </div>

                        {/* Tanggal Berakhir Kupon */}
                        <div className="grid gap-2">
                            <Label htmlFor="end_date">Tanggal Berakhir Kupon</Label>
                            <Popover>
                                <PopoverTrigger>
                                    <Button type="button" variant="outline" className="w-full px-4 py-6">
                                        {data.end_date instanceof Date && !isNaN(data.end_date.getTime()) ? (
                                            <span>{data.end_date.toDateString()}</span>
                                        ) : (
                                            <span className="text-sm text-gray-400">Masukkan Tanggal Berakhir Kupon</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-5 w-5 text-gray-500" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-2">
                                    <Input
                                        type="date"
                                        name="endDate"
                                        value={inputDate.endDate}
                                        onChange={handleInputDate}
                                        className="mb-2 py-6 text-center"
                                        placeholder="tahun-bulan-tanggal"
                                    />

                                    <Calendar
                                        mode="single"
                                        selected={data.end_date ?? new Date()}
                                        onSelect={(date) => {
                                            const formatted = date ? date.toISOString().split('T')[0] : '';
                                            setData('end_date', date ?? new Date());
                                            setInputDate((prev) => ({
                                                ...prev,
                                                endDate: formatted,
                                            }));
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <InputError message={errors.start_date} className="mt-2" />
                        </div>
                    </div>

                    {/* Kupon Aktif */}
                    <div className="flex items-center gap-2">
                        <Switch
                            id="is_active"
                            checked={data.is_active}
                            onCheckedChange={(checked) => setData('is_active', checked)}
                            disabled={processing}
                        />
                        <Label htmlFor="is_active" className="mr-4">
                            Kupon Aktif
                        </Label>
                    </div>

                    {/* Button */}
                    <div className="mt-4 flex justify-end space-x-3">
                        <Link href={route('merchant.coupon.index_merchant')} className="cursor-pointer">
                            <Button variant="destructive">
                                Batalkan <Icon icon="iconoir:cancel" />
                            </Button>
                        </Link>
                        <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Buat Kupon <Icon icon="heroicons:plus" />
                        </Button>
                    </div>
                </form>
            </MerchantLayout>
        </>
    );
}
