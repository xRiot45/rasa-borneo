import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/layout';
import { cn } from '@/lib/utils';
import { MenuCategoryForm } from '@/models/menu-category';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Menu',
        href: '#',
    },
    {
        title: 'Kategori Menu',
        href: '/admin/menu-management/menu-categories',
    },
    {
        title: 'Tambah Kategori menu',
        href: '/admin/menu-management/menu-categories/create',
    },
];

export default function CreatePage() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<MenuCategoryForm>>({
        name: '',
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
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
                console.log(error);
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
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Role" />
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
                        Tambah Data <Icon icon="heroicons:plus" />
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
