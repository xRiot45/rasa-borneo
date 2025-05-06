import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/layout';
import { cn } from '@/lib/utils';
import { BusinessCategory, BusinessCategoryForm } from '@/models/business-category';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: '#',
    },
    {
        title: 'Kategori Bisnis',
        href: '/admin/master-data/business-categories',
    },
    {
        title: 'Edit Kategori Bisnis',
        href: '/admin/master-data/business-categories/edit',
    },
];

export default function EditPage({ data }: { data: BusinessCategory }) {
    const {
        data: formData,
        setData,
        put,
        processing,
        errors,
        reset,
    } = useForm<Required<BusinessCategoryForm>>({
        name: data?.name,
    });

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        put(route('admin.business-category.update', { id: data?.id }), {
            onSuccess: () => {
                reset('name');
                toast.success('Success', {
                    description: 'Kategori Bisnis Berhasil Diedit!',
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
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Kategori Bisnis" />
            <form onSubmit={submit} className="p-4">
                <Label htmlFor="name">Nama Kategori Bisnis</Label>
                <Input
                    id="name"
                    type="text"
                    autoFocus
                    tabIndex={1}
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Masukkan nama kategori bisnis"
                    className={cn('mt-1 rounded-xl px-4 py-6', errors.name && 'border border-red-500')}
                />
                <InputError message={errors.name} className="mt-2" />

                <div className="mt-4 flex justify-end space-x-3">
                    <Link href={route('admin.business-category.index')}>
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
        </AdminLayout>
    );
}
