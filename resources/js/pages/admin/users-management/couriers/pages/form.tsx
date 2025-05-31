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
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { CalendarIcon, LoaderCircle } from 'lucide-react';

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

export default function FormPage() {
    const { data, setData, post, put, processing, errors, reset } = useForm();
    console.log(data);
    console.log(setData);
    console.log(post);
    console.log(put);
    console.log(errors);
    console.log(reset);

    return (
        <>
            <Head title="Form Kurir" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <form action="">
                    <main className="space-y-6 p-4">
                        {/* Form Akun Kurir */}
                        <Card className="rounded-xl py-8 shadow-none">
                            <CardHeader>
                                <CardTitle className="text-xl">Akun Kurir</CardTitle>
                                <CardDescription className="text-muted-foreground mt-0">Lengkapi data akun kurir</CardDescription>
                            </CardHeader>
                            <CardContent className="mt-4 grid gap-x-4 gap-y-6 sm:grid-cols-2">
                                {/* full_name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="full_name">
                                        Nama Lengkap <strong className="text-red-500">*</strong>
                                    </Label>
                                    <Input
                                        id="full_name"
                                        type="text"
                                        autoFocus
                                        // value={'test'}
                                        placeholder="Masukkan nama lengkap kurir"
                                        // className={cn('mt-1 rounded-xl px-4 py-6', errors.name && 'border border-red-500')}
                                        className={'mt-1 rounded-lg px-4 py-6 shadow-none'}
                                    />
                                    <InputError className="mt-2" />
                                </div>

                                {/* email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">
                                        Email <strong className="text-red-500">*</strong>
                                    </Label>
                                    <Input
                                        id="full_name"
                                        type="email"
                                        autoFocus
                                        // value={'test'}
                                        placeholder="Masukkan email kurir"
                                        // className={cn('mt-1 rounded-xl px-4 py-6', errors.name && 'border border-red-500')}
                                        className={'mt-1 rounded-lg px-4 py-6 shadow-none'}
                                    />
                                    <InputError className="mt-2" />
                                </div>

                                {/* Password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password">
                                        Password <strong className="text-red-500">*</strong>
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        autoFocus
                                        // value={'test'}
                                        placeholder="Masukkan password kurir"
                                        // className={cn('mt-1 rounded-xl px-4 py-6', errors.name && 'border border-red-500')}
                                        className={'mt-1 rounded-lg px-4 py-6 shadow-none'}
                                    />
                                    <InputError className="mt-2" />
                                </div>

                                {/* phone_number */}
                                <div className="grid gap-2">
                                    <Label htmlFor="phone_number">
                                        Nomor Telepon <strong className="text-red-500">*</strong>
                                    </Label>
                                    <Input
                                        id="phone_number"
                                        type="number"
                                        autoFocus
                                        // value={'test'}
                                        placeholder="Masukkan nomor telepon kurir"
                                        // className={cn('mt-1 rounded-xl px-4 py-6', errors.name && 'border border-red-500')}
                                        className={'mt-1 rounded-lg px-4 py-6 shadow-none'}
                                    />
                                    <InputError className="mt-2" />
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
                                        type="text"
                                        autoFocus
                                        // value={'test'}
                                        placeholder="Masukkan Nomor Induk Kependudukan (NIK) kurir"
                                        // className={cn('mt-1 rounded-xl px-4 py-6', errors.name && 'border border-red-500')}
                                        className={'mt-1 rounded-lg px-4 py-6 shadow-none'}
                                    />
                                    <InputError className="mt-2" />
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
                                                onFileChange={function (file: File | null): void {
                                                    console.log(file);
                                                }}
                                            />
                                            <InputError className="mt-2" />
                                        </div>

                                        {/* profile_image */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="profile_image">
                                                Foto Profil <strong className="text-red-500">*</strong>
                                            </Label>
                                            <FileDropzone
                                                onFileChange={function (file: File | null): void {
                                                    console.log(file);
                                                }}
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
                                                placeholder="Masukkan tempat lahir kurir"
                                                className={'mt-1 rounded-lg px-4 py-6 shadow-none'}
                                            />
                                            <InputError className="mt-2" />
                                        </div>

                                        {/* birthdata */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="birthdate">
                                                Tanggal Lahir <strong className="text-red-500">*</strong>
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Button type="button" variant="outline" className="w-full px-4 py-6 shadow-none">
                                                        {/* {data.birthdate instanceof Date && !isNaN(data.birthdate.getTime()) ? (
                                                            <span>{data.birthdate.toDateString()}</span>
                                                        ) : (
                                                            <span className="text-sm text-gray-400">Masukkan Tanggal Lahir</span>
                                                        )} */}
                                                        <span className="text-sm text-gray-400">Masukkan Tanggal Lahir</span>
                                                        <CalendarIcon className="ml-auto h-5 w-5 text-gray-500" />
                                                    </Button>
                                                </PopoverTrigger>

                                                <PopoverContent className="w-auto p-2">
                                                    <Input type="text" className="mb-2 py-6 text-center" placeholder="tahun-bulan-tanggal" />

                                                    <Calendar mode="single" disabled={(date) => date > new Date()} initialFocus />
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
                                            <Select>
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
                                                // value={'test'}
                                                placeholder="Masukkan umur kurir"
                                                // className={cn('mt-1 rounded-xl px-4 py-6', errors.name && 'border border-red-500')}
                                                className={'mt-1 rounded-lg px-4 py-6 shadow-none'}
                                            />
                                            <InputError className="mt-2" />
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
                                            <Select>
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
                                                type="number"
                                                autoFocus
                                                // value={'test'}
                                                placeholder="Masukkan nomor kendaraan kurir"
                                                // className={cn('mt-1 rounded-xl px-4 py-6', errors.name && 'border border-red-500')}
                                                className={'mt-1 rounded-lg px-4 py-6 shadow-none'}
                                            />
                                            <InputError className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* driving_license_photo */}
                                <div className="col-span-2 gap-2">
                                    <Label htmlFor="driving_license_photo">
                                        Foto SIM Kendaraan <strong className="text-red-500">*</strong>
                                    </Label>
                                    <FileDropzone
                                        onFileChange={function (file: File | null): void {
                                            console.log(file);
                                        }}
                                    />
                                    <InputError className="mt-2" />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-4 flex justify-end space-x-3">
                            <Link href={route('admin.couriers.index')} className="cursor-pointer">
                                <Button variant="destructive">
                                    Batalkan <Icon icon="iconoir:cancel" />
                                </Button>
                            </Link>
                            <Button type="submit" tabIndex={4} className="cursor-pointer">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Tambah Kurir <Icon icon="heroicons:plus" />
                            </Button>
                        </div>
                    </main>
                </form>
            </AdminLayout>
        </>
    );
}
