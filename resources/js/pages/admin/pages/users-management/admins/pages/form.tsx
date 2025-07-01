import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/layout';
import { cn } from '@/lib/utils';
import { Admin, AdminForm } from '@/models/admin';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface Props {
    admin: Admin;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pengguna',
        href: '#',
    },
    {
        title: 'Admin',
        href: '/admin/users-management/admins',
    },
    {
        title: 'Form Admin',
        href: '#',
    },
];

export default function FormPage({ admin }: Props) {
    const isEdit = !!admin?.id;

    const { data, setData, post, put, processing, errors, reset } = useForm<Required<AdminForm>>({
        full_name: admin?.full_name,
        email: admin?.email,
        phone_number: admin?.phone_number,
        password: admin?.password,
        password_confirmation: admin?.password_confirmation,
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (isEdit) {
            put(route('admin.admins.update', { id: admin?.id }), {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Pengguna Berhasil Diedit!',
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
        } else {
            post(route('admin.admins.store'), {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Pengguna Berhasil Ditambahkan!',
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
            <Head title={isEdit ? 'Edit Admin' : 'Tambah Admin'} />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <form onSubmit={handleSubmit} className="space-y-4 p-4" method="PUT">
                    <div id="full_name">
                        <Label htmlFor="full_name">
                            Nama Lengkap <strong className="text-red-500">*</strong>
                        </Label>
                        <Input
                            id="full_name"
                            type="text"
                            autoFocus
                            required
                            autoComplete="full_name"
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            placeholder="Masukkan nama lengkap pengguna"
                            className={cn('mt-2 rounded-xl px-4 py-6 shadow-none', errors.full_name && 'border border-red-500')}
                        />
                        <InputError message={errors.full_name} className="mt-2" />
                    </div>

                    <div id="email">
                        <Label htmlFor="email">
                            Email <strong className="text-red-500">*</strong>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Masukkan email pengguna"
                            className={cn('mt-2 rounded-xl px-4 py-6 shadow-none', errors.email && 'border border-red-500')}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div id="phone_number">
                        <Label htmlFor="phone_number">
                            Nomor Telepon <strong className="text-red-500">*</strong>
                        </Label>
                        <Input
                            id="phone_number"
                            type="number"
                            required
                            autoComplete="phone_number"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            placeholder="Masukkan nomor telepon pengguna"
                            className={cn('mt-2 rounded-xl px-4 py-6 shadow-none', errors.phone_number && 'border border-red-500')}
                        />
                        <InputError message={errors.phone_number} className="mt-2" />
                    </div>

                    <div className="grid gap-3 lg:grid-cols-2">
                        <div id="password">
                            <Label htmlFor="password">
                                Password <strong className="text-red-500">*</strong>
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                required={isEdit ? false : true}
                                autoComplete="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Masukkan password pengguna"
                                className={cn('mt-2 rounded-xl px-4 py-6 shadow-none', errors.password && 'border border-red-500')}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div id="password_confirmation">
                            <Label htmlFor="password_confirmation">
                                Konfirmasi Password <strong className="text-red-500">*</strong>
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required={isEdit ? false : true}
                                autoComplete="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Masukkan konfirmasi password pengguna"
                                className={cn('mt-2 rounded-xl px-4 py-6 shadow-none', errors.password_confirmation && 'border border-red-500')}
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-3">
                        <Link href={route('admin.admins.index')} className="cursor-pointer">
                            <Button variant="destructive">
                                Batalkan <Icon icon="iconoir:cancel" />
                            </Button>
                        </Link>
                        <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            {isEdit ? 'Simpan Perubahan' : 'Tambah Admin'} <Icon icon={isEdit ? 'material-symbols:edit' : 'heroicons:plus'} />
                        </Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
