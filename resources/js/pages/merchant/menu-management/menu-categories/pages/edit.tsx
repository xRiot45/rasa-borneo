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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Menu',
        href: '#',
    },
    {
        title: 'Kategori menu',
        href: '/merchant/menu-management/menu-categories',
    },
    {
        title: 'Edit Kategori Menu',
        href: '/merchant/menu-management/menu-categories/edit',
    },
];

export default function EditPage({ data }: { data: MenuCategory }) {
    const {
        data: formData,
        setData,
        put,
        processing,
        errors,
        reset,
    } = useForm<Required<MenuCategoryForm>>({
        name: data?.name,
    });

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        put(route('merchant.menu-categories.update', { menuCategory: data?.slug }), {
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
    };

    return (
        <MerchantLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Kategori Menu" />
            <form onSubmit={submit} className="p-4">
                <Label htmlFor="name">Nama Kategori Menu</Label>
                <Input
                    id="name"
                    type="text"
                    autoFocus
                    tabIndex={1}
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Masukkan nama kategori menu"
                    className={cn('mt-2', errors.name && 'border border-red-500')}
                />
                <InputError message={errors.name} className="mt-2" />

                <div className="mt-4 flex justify-end space-x-3">
                    <Link href={route('merchant.menu-categories.index')}>
                        <Button variant="destructive" className="cursor-pointer">
                            Batalkan <Icon icon="iconoir:cancel" />
                        </Button>
                    </Link>
                    <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Edit Data <Icon icon="heroicons:check" />
                    </Button>
                </div>
            </form>
        </MerchantLayout>
    );
}
