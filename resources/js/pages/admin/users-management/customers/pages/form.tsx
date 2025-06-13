import FileDropzone from '@/components/file-dropzone';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GenderEnum } from '@/enums/gender-enum';
import AdminLayout from '@/layouts/admin/layout';
import { cn } from '@/lib/utils';
import { Customer, CustomerForm } from '@/models/customer';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { CalendarIcon, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    customer: Customer;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pengguna',
        href: '#',
    },
    {
        title: 'Customer / Pembeli',
        href: '/admin/users-management/customers',
    },
    {
        title: 'Form Customer',
        href: '#',
    },
];

export default function FormPage({ customer }: Props) {
    const isEdit = !!customer?.id;

    const { data, setData, post, processing, errors } = useForm<Required<CustomerForm>>({
        full_name: isEdit ? customer?.user?.full_name : '',
        email: isEdit ? customer?.user?.email : '',
        password: '',
        password_confirmation: '',
        phone_number: isEdit ? customer?.user?.phone_number : '',
        birthplace: isEdit ? customer?.birthplace : '',
        birthdate: isEdit ? new Date(customer?.birthdate) : new Date(),
        gender: isEdit ? customer?.gender : GenderEnum.MALE,
        profile_image: isEdit ? customer?.profile_image : null,
    });

    const [inputValue, setInputValue] = useState(() => {
        return data?.birthdate instanceof Date && !isNaN(data?.birthdate.getTime()) ? data.birthdate.toISOString().split('T')[0] : '';
    });

    const handleInputBirthdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        const parsedData = new Date(event.target.value);
        if (!isNaN(parsedData.getTime())) {
            setData('birthdate', parsedData);
        }
    };

    const handleFileChange = (file: 'profile_image', fileData: File | null) => {
        if (fileData) {
            setData(file, fileData);
        } else {
            setData(file, data[file]);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'profile_image') {
                if (typeof value === 'number') {
                    formData.append(key, String(value));
                } else if (value instanceof Date) {
                    formData.append(key, value.toISOString());
                } else {
                    formData.append(key, value ?? '');
                }
            }
        });

        if (data.profile_image instanceof File && data.profile_image.size > 0) {
            formData.append('profile_image', data.profile_image);
        }

        if (isEdit) {
            formData.append('_method', 'put');
            router.post(route('admin.customers.update', customer.user.id), formData, {
                forceFormData: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Customer Berhasil Diubah!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
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
        } else {
            post(route('admin.customers.store'), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Customer Berhasil Ditambahkan!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
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
        }
    };

    return (
        <>
            <Head title="Form" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <main className="space-y-6 p-4">
                        {/* Form Akun Customer */}
                        <Card className="rounded-xl py-8 shadow-none">
                            <CardHeader>
                                <CardTitle className="text-xl">Akun Customer</CardTitle>
                                <CardDescription className="text-muted-foreground mt-0">Lengkapi data akun customer</CardDescription>
                            </CardHeader>
                            <CardContent className="mt-4 grid gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                                {/* Full Name */}
                                <div className="col-span-3 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                                    <div>
                                        <Label htmlFor="full_name">
                                            Nama Lengkap <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Input
                                            id="full_name"
                                            type="text"
                                            required
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                            disabled={processing}
                                            placeholder="Masukkan nama lengkap customer"
                                            className={cn('mt-1 rounded-xl px-4 py-6 shadow-none', errors.full_name && 'border border-red-500')}
                                        />
                                        <InputError message={errors?.full_name} className="mt-2" />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <Label htmlFor="email">
                                            Email <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            disabled={processing}
                                            placeholder="Masukkan email customer"
                                            className={cn('mt-1 rounded-xl px-4 py-6 shadow-none', errors.email && 'border border-red-500')}
                                        />
                                        <InputError message={errors?.email} className="mt-2" />
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <Label htmlFor="phone_number">
                                            Nomor Telepon <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Input
                                            id="phone_number"
                                            type="number"
                                            required
                                            value={data.phone_number}
                                            onChange={(e) => setData('phone_number', e.target.value)}
                                            disabled={processing}
                                            placeholder="Masukkan nomor telepon customer"
                                            className={cn('mt-1 rounded-xl px-4 py-6 shadow-none', errors.phone_number && 'border border-red-500')}
                                        />
                                        <InputError message={errors?.phone_number} className="mt-2" />
                                    </div>
                                </div>

                                {/* Password dan Confirmation (Baris ke-2, col-span-3) */}
                                <div className="col-span-3 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    {/* Password */}
                                    <div>
                                        <Label htmlFor="password">
                                            Password <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            required={isEdit ? false : true}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Masukkan password customer"
                                            className={cn('mt-1 rounded-xl px-4 py-6 shadow-none', errors.password && 'border border-red-500')}
                                        />
                                        <InputError message={errors?.password} className="mt-2" />
                                    </div>

                                    {/* Konfirmasi Password */}
                                    <div>
                                        <Label htmlFor="password_confirmation">
                                            Konfirmasi Password <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            required={isEdit ? false : true}
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Masukkan konfirmasi password customer"
                                            className={cn(
                                                'mt-1 rounded-xl px-4 py-6 shadow-none',
                                                errors.password_confirmation && 'border border-red-500',
                                            )}
                                        />
                                        <InputError message={errors?.password_confirmation} className="mt-2" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Form Data Lengkap Customer */}
                        <Card className="rounded-xl py-8 shadow-none">
                            <CardHeader>
                                <CardTitle className="text-xl">Data Pribadi Customer</CardTitle>
                                <CardDescription className="text-muted-foreground mt-0">Lengkapi data pribadi customer</CardDescription>
                            </CardHeader>

                            <CardContent className="mt-4 grid gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                                <div>
                                    <Label htmlFor="full_name">
                                        Tempat Lahir <strong className="text-red-500">*</strong>
                                    </Label>
                                    <Input
                                        id="birthplace"
                                        type="text"
                                        autoComplete="birthplace"
                                        value={data.birthplace}
                                        onChange={(e) => setData('birthplace', e.target.value)}
                                        placeholder="Masukkan Tempat Lahir"
                                        className={cn('mt-2 rounded-lg py-6 shadow-none', errors.birthplace && 'border border-red-500')}
                                    />

                                    <InputError className="mt-1" message={errors.birthplace} />
                                </div>

                                <div className="flex flex-col">
                                    <Label htmlFor="birthdate">
                                        Tanggal Lahir <strong className="text-red-500">*</strong>
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button type="button" variant="outline" className="mt-[18px] w-full rounded-lg py-6 shadow-none">
                                                {data.birthdate instanceof Date && !isNaN(data.birthdate.getTime()) ? (
                                                    <span>{data.birthdate.toDateString()}</span>
                                                ) : (
                                                    <span className="text-sm text-gray-400">Masukkan Tanggal Lahir</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-5 w-5 text-gray-500" />
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-2">
                                            <Input
                                                type="text"
                                                value={inputValue}
                                                onChange={handleInputBirthdate}
                                                className="mb-2 py-6 text-center"
                                                placeholder="Masukkan Tanggal Lahir"
                                            />

                                            <Calendar
                                                mode="single"
                                                selected={data.birthdate ?? new Date()}
                                                onSelect={(date) => {
                                                    setData('birthdate', (date as Date) ?? null);
                                                    setInputValue(date ? date.toISOString().split('T')[0] : '');
                                                }}
                                                disabled={(date) => date > new Date()}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <InputError className="mt-1" message={errors.birthdate} />
                                </div>

                                <div>
                                    <Label htmlFor="gender">
                                        Jenis Kelamin <strong className="text-red-500">*</strong>
                                    </Label>
                                    <Select onValueChange={(value) => setData('gender', value as GenderEnum)} value={data.gender}>
                                        <SelectTrigger className="mt-2 w-full rounded-lg py-6">
                                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(GenderEnum).map((value) => (
                                                <SelectItem key={value} value={value} className="cursor-pointer p-4 capitalize">
                                                    {value}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.gender} className="mt-2" />
                                </div>

                                <div className="col-span-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="profile_image">
                                            Foto Profil <strong className="text-red-500">*</strong>
                                        </Label>
                                        <FileDropzone
                                            onFileChange={(file) => handleFileChange('profile_image', file)}
                                            error={errors.profile_image}
                                            initialImage={data.profile_image instanceof File ? undefined : data.profile_image}
                                        />
                                        <InputError message={errors?.profile_image} className="mt-2" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Button */}
                        <div className="mt-4 flex justify-end space-x-3">
                            <Link href={route('admin.customers.index')} className="cursor-pointer">
                                <Button variant="destructive">
                                    Batalkan <Icon icon="iconoir:cancel" />
                                </Button>
                            </Link>
                            <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                {isEdit ? 'Simpan Perubahan' : 'Tambah Customer'} <Icon icon={isEdit ? 'material-symbols:save' : 'heroicons:plus'} />
                            </Button>
                        </div>
                    </main>
                </form>
            </AdminLayout>
        </>
    );
}
