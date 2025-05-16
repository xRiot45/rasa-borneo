import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MerchantLayout from '@/layouts/merchant/layout';
import { cn } from '@/lib/utils';
import { TableForm, TableModel } from '@/models/table';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
    table: TableModel;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Toko',
        href: '#',
    },
    {
        title: 'Meja',
        href: '/admin/store-management/table',
    },
    {
        title: 'Tambah / Edit Meja',
        href: '#',
    },
];

export default function MerchantTableForm({ table }: Props) {
    const isEdit = !!table?.id;

    const { data, setData, post, put, processing, errors, reset } = useForm<Required<TableForm>>({
        name: table?.name ?? '',
        capacity: table?.capacity ?? 0,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit && table) {
            put(route('merchant.table.update', { id: table?.id }), {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Meja Berhasil Diedit!',
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
            post(route('merchant.table.store'), {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Meja Berhasil Ditambahkan!',
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
            <Head title={isEdit ? 'Edit Meja' : 'Tambah Meja'} />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <form onSubmit={handleSubmit} className="space-y-8 p-4">
                    <div className="grid gap-4">
                        <div className="grid gap-1">
                            <Label htmlFor="name">
                                Nama / Nomor Meja <strong className="text-red-500">*</strong>
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                tabIndex={2}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Masukkan nama / nomor meja"
                                className={cn('mt-1 rounded-xl px-4 py-6', errors.name && 'border border-red-500')}
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-1">
                            <Label htmlFor="capacity">
                                Kapasitas Meja <strong className="text-red-500">*</strong>
                            </Label>
                            <Input
                                id="capacity"
                                type="text"
                                required
                                tabIndex={2}
                                autoComplete="capacity"
                                value={data.capacity}
                                onChange={(e) => setData('capacity', parseInt(e.target.value))}
                                disabled={processing}
                                placeholder="Masukkan kapasitas meja"
                                className={cn('mt-1 rounded-xl px-4 py-6', errors.capacity && 'border border-red-500')}
                            />
                            <InputError message={errors.capacity} />
                        </div>

                        {/* Button */}
                        <div className="mt-4 flex justify-end space-x-3">
                            <Link href={route('merchant.table.index_merchant')} className="cursor-pointer">
                                <Button variant="destructive">
                                    Batalkan <Icon icon="iconoir:cancel" />
                                </Button>
                            </Link>
                            <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                {isEdit ? 'Perbarui Meja' : 'Tambahkan Meja'}
                                <Icon icon={isEdit ? 'material-symbols:edit' : 'heroicons:plus'} />
                            </Button>
                        </div>
                    </div>
                </form>
            </MerchantLayout>
        </>
    );
}
