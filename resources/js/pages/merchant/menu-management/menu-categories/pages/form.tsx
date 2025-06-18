import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MerchantLayout from '@/layouts/merchant/layout';
import { cn } from '@/lib/utils';
import { MenuCategory, MenuCategoryForm } from '@/models/menu-category';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface Props {
    menuCategory?: MenuCategory;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Menu',
        href: '#',
    },
    {
        title: 'Kategori Menu',
        href: '/merchant/menu-management/menu-categories',
    },
    {
        title: 'Form Kategori menu',
        href: '#',
    },
];

export default function FormPage({ menuCategory }: Props) {
    const isEdit = !!menuCategory?.id;

    const { data, setData, post, put, processing, errors, reset } = useForm<Required<MenuCategoryForm>>({
        name: isEdit ? menuCategory?.name : '',
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('merchant.menu-categories.update', { id: menuCategory?.id }), {
                onSuccess: () => {
                    reset();
                    toast.success('Success', {
                        description: 'Kategori Menu Berhasil Diedit!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                },
                onError: (error) => {
                    Object.keys(error).forEach((key) => {
                        toast.error('Error', {
                            description: error[key],
                            action: {
                                label: 'Tutup',
                                onClick: () => toast.dismiss(),
                            },
                        });
                    });
                },
            });
        } else {
            post(route('merchant.menu-categories.store'), {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Kategori Menu Berhasil Ditambahkan!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });

                    reset();
                },
                onError: (error) => {
                    Object.keys(error).forEach((key) => {
                        toast.error('Error', {
                            description: error[key],
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
            <Head title={isEdit ? 'Edit Kategori Menu' : 'Tambah Kategori Menu'} />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <form onSubmit={handleSubmit} className="p-4">
                    <Label htmlFor="name">Nama Kategori Menu</Label>
                    <Input
                        id="name"
                        type="text"
                        autoFocus
                        tabIndex={1}
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Masukkan nama kategori menu"
                        className={cn('mt-2 rounded-xl py-6', errors.name && 'border border-red-500')}
                    />
                    <InputError message={errors.name} className="mt-2" />

                    <div className="mt-4 flex justify-end space-x-3">
                        <Link href={route('merchant.menu-categories.index')} className="cursor-pointer">
                            <Button variant="destructive">
                                Batalkan <Icon icon="iconoir:cancel" />
                            </Button>
                        </Link>
                        <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            {isEdit ? 'Edit Kategori Menu' : 'Tambah Kategori Menu'} <Icon icon={isEdit ? 'heroicons:check' : 'heroicons:plus'} />
                        </Button>
                    </div>
                </form>
            </MerchantLayout>
        </>
    );
}
