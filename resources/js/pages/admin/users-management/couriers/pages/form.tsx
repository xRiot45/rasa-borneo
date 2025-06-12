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
import { VehicleTypeEnum } from '@/enums/vehicle-type';
import AdminLayout from '@/layouts/admin/layout';
import { cn } from '@/lib/utils';
import { Courier, CourierForm } from '@/models/courier';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { CalendarIcon, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    courier: Courier;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pengguna',
        href: '#',
    },
    {
        title: 'Courier / Kurir',
        href: '/admin/users-management/couriers',
    },
    {
        title: 'Form Kurir',
        href: '#',
    },
];

export default function FormPage({ courier }: Props) {
    const isEdit = !!courier?.id;

    const { data, setData, post, processing, errors } = useForm<Required<CourierForm>>({
        full_name: isEdit ? courier?.user?.full_name : '',
        email: isEdit ? courier?.user?.email : '',
        password: '',
        password_confirmation: '',

        // Kurir
        phone_number: isEdit ? courier?.user?.phone_number : '',
        vehicle_type: isEdit ? courier?.vehicle_type : VehicleTypeEnum.MOTORCYCLE,
        national_id: isEdit ? courier?.national_id : '',
        id_card_photo: isEdit ? courier?.id_card_photo : null,
        age: isEdit ? courier?.age : 0,
        birthplace: isEdit ? courier?.birthplace : '',
        birthdate: isEdit ? new Date(courier?.birthdate) : new Date(),
        profile_image: isEdit ? courier?.profile_image : null,
        gender: isEdit ? courier?.gender : GenderEnum.MALE,
        driving_license_photo: isEdit ? courier?.driving_license_photo : null,
        license_plate: isEdit ? courier?.license_plate : '',
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

    const handleFileChange = (file: 'id_card_photo' | 'profile_image' | 'driving_license_photo', fileData: File | null) => {
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
            if (key !== 'id_card_photo' && key !== 'profile_image' && key !== 'driving_license_photo') {
                if (typeof value === 'number') {
                    formData.append(key, String(value));
                } else if (value instanceof Date) {
                    formData.append(key, value.toISOString());
                } else {
                    formData.append(key, value ?? '');
                }
            }
        });

        if (data.id_card_photo instanceof File && data.id_card_photo.size > 0) {
            formData.append('id_card_photo', data.id_card_photo);
        }

        if (data.profile_image instanceof File && data.profile_image.size > 0) {
            formData.append('profile_image', data.profile_image);
        }

        if (data.driving_license_photo instanceof File && data.driving_license_photo.size > 0) {
            formData.append('driving_license_photo', data.driving_license_photo);
        }

        if (isEdit) {
            formData.append('_method', 'put');
            router.post(route('admin.couriers.update', courier.user.id), formData, {
                forceFormData: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Data Kurir Berhasil Diubah!',
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
            post(route('admin.merchants.store'), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Merchant Berhasil Ditambahkan!',
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
            <Head title={isEdit ? 'Edit Kurir' : 'Tambah Kurir'} />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <form onSubmit={handleSubmit}>
                    <main className="space-y-6 p-4">
                        {/* Form Akun Kurir */}
                        <Card className="rounded-xl py-8 shadow-none">
                            <CardHeader>
                                <CardTitle className="text-xl">Akun Kurir</CardTitle>
                                <CardDescription className="text-muted-foreground mt-0">Lengkapi data akun kurir</CardDescription>
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
                                            placeholder="Masukkan nama lengkap kurir"
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
                                            placeholder="Masukkan email kurir"
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
                                            placeholder="Masukkan nomor telepon kurir"
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
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Masukkan password kurir"
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
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Masukkan konfirmasi password kurir"
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

                        {/* Form Data Pribadi Kurir */}
                        <Card className="rounded-xl py-8 shadow-none">
                            <CardHeader>
                                <CardTitle className="text-xl">Data Pribadi Kurir</CardTitle>
                                <CardDescription className="text-muted-foreground mt-0">Lengkapi data pribadi kurir</CardDescription>
                            </CardHeader>
                            <CardContent className="mt-4 grid gap-x-4 gap-y-6 sm:grid-cols-2">
                                {/* national_id */}
                                <div className="col-span-2 grid gap-2">
                                    <Label htmlFor="national_id">
                                        Nomor Induk Kependudukan (NIK) <strong className="text-red-500">*</strong>
                                    </Label>
                                    <Input
                                        id="national_id"
                                        type="number"
                                        autoFocus
                                        required
                                        inputMode="numeric"
                                        pattern="\d{16}"
                                        maxLength={16}
                                        autoComplete="on"
                                        value={data.national_id}
                                        onChange={(e) => setData('national_id', e.target.value)}
                                        disabled={processing}
                                        placeholder="Masukkan Nomor Induk Kependudukan (NIK) kurir"
                                        className={cn('mt-1 rounded-xl px-4 py-6', errors?.national_id && 'border border-red-500')}
                                    />
                                    <InputError message={errors?.national_id} className="mt-2" />
                                </div>

                                {/* id_card_photo & profile_image */}
                                <div className="col-span-2">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {/* id_card_photo */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="id_card_photo">
                                                Foto KTP <strong className="text-red-500">*</strong>
                                            </Label>
                                            <FileDropzone
                                                onFileChange={(file) => handleFileChange('id_card_photo', file)}
                                                error={errors?.id_card_photo}
                                                initialImage={data.id_card_photo instanceof File ? undefined : data.id_card_photo}
                                            />
                                            <InputError message={errors?.id_card_photo} className="mt-2" />
                                        </div>

                                        {/* profile_image */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="profile_image">
                                                Foto Profil <strong className="text-red-500">*</strong>
                                            </Label>
                                            <FileDropzone
                                                onFileChange={(file) => handleFileChange('profile_image', file)}
                                                error={errors?.profile_image}
                                                initialImage={data.profile_image instanceof File ? undefined : data.profile_image}
                                            />
                                            <InputError className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Birthplace & Birthdate */}
                                <div className="col-span-2">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {/* birthplace */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="birthplace">
                                                Tempat Lahir <strong className="text-red-500">*</strong>
                                            </Label>
                                            <Input
                                                id="birthplace"
                                                type="text"
                                                required
                                                autoComplete="on"
                                                value={data.birthplace}
                                                onChange={(e) => setData('birthplace', e.target.value)}
                                                disabled={processing}
                                                placeholder="Masukkan tempat lahir kurir"
                                                className={cn('mt-1 rounded-xl px-4 py-6 shadow-none', errors.birthdate && 'border border-red-500')}
                                            />
                                            <InputError message={errors?.birthplace} className="mt-2" />
                                        </div>

                                        {/* birthdata */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="birthdate">
                                                Tanggal Lahir <strong className="text-red-500">*</strong>
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Button type="button" variant="outline" className="w-full px-4 py-6 shadow-none">
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
                                                        placeholder="tahun-bulan-tanggal"
                                                    />

                                                    <Calendar
                                                        mode="single"
                                                        selected={data.birthdate ?? new Date()}
                                                        onSelect={(date) => {
                                                            setData('birthdate', date ?? null);
                                                            setInputValue(date ? date.toISOString().split('T')[0] : '');
                                                        }}
                                                        disabled={(date) => date > new Date()}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <InputError className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Gender & Age */}
                                <div className="col-span-2">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {/* gender */}
                                        <div className="grid gap-2.5">
                                            <Label htmlFor="gender">
                                                Jenis Kelamin <strong className="text-red-500">*</strong>
                                            </Label>
                                            <Select onValueChange={(value) => setData('gender', value as GenderEnum)} value={data.gender}>
                                                <SelectTrigger className="w-full rounded-lg px-4 py-6 shadow-none">
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
                                            <InputError className="mt-2" />
                                        </div>

                                        {/* age */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="age">
                                                Umur <strong className="text-red-500">*</strong>
                                            </Label>
                                            <Input
                                                id="age"
                                                type="number"
                                                autoFocus
                                                required
                                                autoComplete="on"
                                                value={data.age}
                                                onChange={(e) => setData('age', Number(e.target.value))}
                                                disabled={processing}
                                                placeholder="Masukkan umur kurir"
                                                className={cn('mt-1 rounded-xl px-4 py-6 shadow-none', errors.age && 'border border-red-500')}
                                            />
                                            <InputError message={errors.age} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Form Data Kendaraan */}
                        <Card className="rounded-xl py-8 shadow-none">
                            <CardHeader>
                                <CardTitle className="text-xl">Data Kendaraan Kurir</CardTitle>
                                <CardDescription className="text-muted-foreground mt-0">Lengkapi data kendaraan kurir</CardDescription>
                            </CardHeader>
                            <CardContent className="mt-4 grid gap-x-4 gap-y-6 sm:grid-cols-2">
                                {/* vehicle_type & license_plate */}
                                <div className="col-span-2">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {/* vehicle_type */}
                                        <div className="grid gap-2.5">
                                            <Label htmlFor="gender">
                                                Jenis Kendaraan <strong className="text-red-500">*</strong>
                                            </Label>
                                            <Select
                                                onValueChange={(value) => setData('vehicle_type', value as VehicleTypeEnum)}
                                                value={data.vehicle_type}
                                            >
                                                <SelectTrigger className="w-full rounded-lg px-4 py-6 shadow-none">
                                                    <SelectValue placeholder="Pilih Jenis Kendaraan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.values(VehicleTypeEnum).map((value) => (
                                                        <SelectItem key={value} value={value} className="cursor-pointer p-4 capitalize">
                                                            {value}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError className="mt-2" />
                                        </div>

                                        {/* license_plate */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="license_plate">
                                                Nomor Kendaraan <strong className="text-red-500">*</strong>
                                            </Label>
                                            <Input
                                                id="license_plate"
                                                type="text"
                                                autoFocus
                                                required
                                                autoComplete="on"
                                                value={data.license_plate}
                                                onChange={(e) => setData('license_plate', e.target.value)}
                                                placeholder="Masukkan nomor kendaraan kurir"
                                                className={cn(
                                                    'mt-1 rounded-xl px-4 py-6 shadow-none',
                                                    errors.license_plate && 'border border-red-500',
                                                )}
                                            />
                                            <InputError message={errors?.license_plate} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* driving_license_photo */}
                                <div className="col-span-2 gap-2">
                                    <Label htmlFor="driving_license_photo">
                                        Foto SIM Kendaraan <strong className="text-red-500">*</strong>
                                    </Label>
                                    <FileDropzone
                                        onFileChange={(file) => handleFileChange('driving_license_photo', file)}
                                        error={errors?.driving_license_photo}
                                        initialImage={data.driving_license_photo instanceof File ? undefined : data.driving_license_photo}
                                    />
                                    <InputError message={errors?.driving_license_photo} className="mt-2" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Button */}
                        <div className="mt-4 flex justify-end space-x-3">
                            <Link href={route('admin.couriers.index')} className="cursor-pointer">
                                <Button variant="destructive">
                                    Batalkan <Icon icon="iconoir:cancel" />
                                </Button>
                            </Link>
                            <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                {isEdit ? 'Simpan Perubahan' : 'Tambah Kurir'} <Icon icon={isEdit ? 'heroicons:check' : 'heroicons:plus'} />
                            </Button>
                        </div>
                    </main>
                </form>
            </AdminLayout>
        </>
    );
}
