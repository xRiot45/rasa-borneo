import FileDropzone from '@/components/file-dropzone';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin/layout';
import { cn } from '@/lib/utils';
import { Bank } from '@/models/bank';
import { BusinessCategory } from '@/models/business-category';
import { MerchantForm } from '@/models/merchant';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pengguna',
        href: '#',
    },
    {
        title: 'Merchant / Toko',
        href: '/admin/users-management/merchants',
    },
    {
        title: 'Form Merchant',
        href: '#',
    },
];

export default function FormPage() {
    const { businessCategories } = usePage<{ businessCategories: BusinessCategory[] }>().props;
    const { banks } = usePage<{ banks: Bank[] }>().props;
    const [search, setSearch] = useState<string>('');

    const { data, setData, post, processing, errors } = useForm<Required<MerchantForm>>({
        // Akun
        full_name: '',
        email: '',
        password: '12345678',
        password_confirmation: '12345678',
        phone_number: '',

        // Merchant
        id_card_photo: null,

        //
        business_name: '',
        business_phone: '',
        business_email: '',
        business_category_id: 0,

        //
        postal_code: '',
        tax_identification_number: '',

        //
        business_address: '',
        business_description: '',

        //
        bank_code: '',
        bank_account_number: '',
        bank_account_name: '',
    });

    const filteredBanks = useMemo(() => {
        return banks.filter((bank) => `${bank.sandi_bank} - ${bank.nama_bank}`.toLowerCase().includes(search.toLowerCase()));
    }, [search, banks]);

    const handleFileChange = (file: 'id_card_photo', fileData: File | null) => {
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
    };

    return (
        <>
            <Head title="Form Page" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <form onSubmit={handleSubmit}>
                    <main className="space-y-6 p-4">
                        {/* Form Akun Kurir */}
                        <Card className="rounded-xl py-8 shadow-none">
                            <CardHeader>
                                <CardTitle className="text-xl">Akun Merchant</CardTitle>
                                <CardDescription className="text-muted-foreground mt-0">Lengkapi data akun merchant</CardDescription>
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
                                            required
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            readOnly
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
                                            required
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            readOnly
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

                        {/* Form Data Merchant */}
                        <Card className="rounded-xl py-8 shadow-none">
                            <CardHeader>
                                <CardTitle className="text-xl">Data Bisnis Merchant</CardTitle>
                                <CardDescription className="text-muted-foreground mt-0">Lengkapi data bisnis merchant</CardDescription>
                            </CardHeader>
                            <CardContent className="mt-4 grid gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                                {/* id_card_photo */}
                                <div className="col-span-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="id_card_photo">
                                            Foto KTP <strong className="text-red-500">*</strong>
                                        </Label>
                                        <FileDropzone
                                            onFileChange={(file) => handleFileChange('id_card_photo', file)}
                                            error={errors?.id_card_photo}
                                        />
                                        <InputError message={errors?.id_card_photo} className="mt-2" />
                                    </div>
                                </div>

                                {/* Business Name, Business Phone, Business Email */}
                                <div className="col-span-3 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    {/* business_name */}
                                    <div>
                                        <Label htmlFor="business_name">
                                            Nama Bisnis / Merchant<strong className="text-red-500">*</strong>
                                        </Label>
                                        <Input
                                            id="business_name"
                                            type="text"
                                            required
                                            value={data.business_name}
                                            onChange={(e) => setData('business_name', e.target.value)}
                                            disabled={processing}
                                            placeholder="Masukkan nama bisnis"
                                            className={cn('mt-1 rounded-xl px-4 py-6 shadow-none', errors.business_name && 'border border-red-500')}
                                        />
                                        <InputError message={errors?.business_name} className="mt-2" />
                                    </div>

                                    {/* business_email */}
                                    <div>
                                        <Label htmlFor="business_email">
                                            Email Bisnis <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Input
                                            id="business_email"
                                            type="email"
                                            required
                                            value={data.business_email}
                                            onChange={(e) => setData('business_email', e.target.value)}
                                            disabled={processing}
                                            placeholder="Masukkan email bisnis"
                                            className={cn('mt-1 rounded-xl px-4 py-6 shadow-none', errors.business_email && 'border border-red-500')}
                                        />
                                        <InputError message={errors?.business_email} className="mt-2" />
                                    </div>

                                    {/* business_phone */}
                                    <div>
                                        <Label htmlFor="business_phone">
                                            Nomor Telepon Bisnis <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Input
                                            id="business_phone"
                                            type="number"
                                            required
                                            value={data.business_phone}
                                            onChange={(e) => setData('business_phone', e.target.value)}
                                            disabled={processing}
                                            placeholder="Masukkan nomor telepon bisnis"
                                            className={cn('mt-1 rounded-xl px-4 py-6 shadow-none', errors.business_phone && 'border border-red-500')}
                                        />
                                        <InputError message={errors?.business_phone} className="mt-2" />
                                    </div>

                                    {/* business_category_id */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="business_category_id">
                                            Kategori Bisnis <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Select onValueChange={(e) => setData('business_category_id', Number(e))}>
                                            <SelectTrigger className="mt-2 w-full py-6">
                                                <SelectValue placeholder="Pilih Kategori Bisnis" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {businessCategories.map((item: BusinessCategory) => (
                                                    <SelectItem key={item.id} value={String(item.id)} className="cursor-pointer p-4">
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.business_category_id} className="mt-2" />
                                    </div>
                                </div>

                                {/* Bank Code, Bank Account Name, Bank Account Number */}
                                <div className="col-span-3 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                                    {/* Bank Code */}
                                    <div>
                                        <Label htmlFor="bank_code">
                                            Pilih Bank <strong className="text-red-500">*</strong>
                                        </Label>
                                        {/* Input pencarian */}

                                        <Select onValueChange={(val) => setData('bank_code', val)} value={data.bank_code}>
                                            <SelectTrigger className="mt-2 w-full rounded-lg py-6 shadow-none">
                                                <SelectValue placeholder="Pilih Bank Anda" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-[300px] overflow-y-auto">
                                                <Input
                                                    placeholder="Cari bank..."
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    className="fixed top-0 z-50 mb-2 w-full bg-white py-6 shadow-none dark:bg-zinc-900"
                                                />
                                                <div className="mt-12">
                                                    {filteredBanks.length > 0 ? (
                                                        filteredBanks.map((item, index) => (
                                                            <SelectItem
                                                                className="p-4"
                                                                key={`${item.sandi_bank}-${item.nama_bank}-${index}`}
                                                                value={`${item.sandi_bank}-${item.nama_bank}`}
                                                            >
                                                                {item.sandi_bank} - {item.nama_bank}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <div className="p-4 text-center text-sm">Bank tidak ditemukan</div>
                                                    )}
                                                </div>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.bank_code} />
                                    </div>

                                    {/* Bank Account Number */}
                                    <div>
                                        <Label htmlFor="bank_account_number">
                                            Nomor Rekening <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Input
                                            id="bank_account_number"
                                            type="number"
                                            required
                                            tabIndex={2}
                                            autoComplete="bank_account_number"
                                            value={data.bank_account_number}
                                            onChange={(e) => setData('bank_account_number', e.target.value)}
                                            disabled={processing}
                                            placeholder="Masukkan nomor rekening anda"
                                            className="mt-2 rounded-lg px-4 py-6"
                                        />
                                        <InputError message={errors.bank_account_number} />
                                    </div>

                                    {/* Bank Account Name */}
                                    <div>
                                        <Label htmlFor="bank_account_name">
                                            Nama Pemilik Rekening <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Input
                                            id="bank_account_name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="bank_account_name"
                                            value={data.bank_account_name}
                                            onChange={(e) => setData('bank_account_name', e.target.value)}
                                            disabled={processing}
                                            placeholder="Masukkan nama pemilik rekening"
                                            className="mt-2 rounded-lg px-4 py-6"
                                        />
                                        <InputError message={errors.bank_account_name} className="mt-2" />
                                    </div>
                                </div>

                                {/* Business Address, Business Description */}
                                <div className="col-span-3 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="tax_identification_number">
                                            NPWP <strong className="text-muted-foreground italic">(Opsional)</strong>
                                        </Label>
                                        <Input
                                            id="tax_identification_number"
                                            type="number"
                                            required
                                            tabIndex={2}
                                            autoComplete="tax_identification_number"
                                            value={data.tax_identification_number}
                                            onChange={(e) => setData('tax_identification_number', e.target.value)}
                                            disabled={processing}
                                            placeholder="Isi 0 jika tidak memiliki NPWP"
                                            className="rounded-xl px-4 py-6"
                                        />
                                        <InputError message={errors.tax_identification_number} />
                                    </div>

                                    {/* postal_code */}
                                    <div>
                                        <Label htmlFor="postal_code">
                                            Kode Pos <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Input
                                            id="postal_code"
                                            type="number"
                                            required
                                            tabIndex={2}
                                            autoComplete="postal_code"
                                            value={data.postal_code}
                                            onChange={(e) => setData('postal_code', e.target.value)}
                                            disabled={processing}
                                            placeholder="Masukkan Kode Pos"
                                            className="mt-2 rounded-lg px-4 py-6"
                                        />
                                        <InputError message={errors.postal_code} />
                                    </div>

                                    {/* business_address */}
                                    <div>
                                        <Label htmlFor="business_address">
                                            Alamat Bisnis <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Input
                                            id="business_address"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="business_address"
                                            value={data.business_address}
                                            onChange={(e) => setData('business_address', e.target.value)}
                                            disabled={processing}
                                            placeholder="Cth : Jl. A.Yani"
                                            className="mt-2 rounded-lg px-4 py-6"
                                        />
                                        <InputError message={errors.business_address} className="mt-2" />
                                    </div>

                                    {/* business_description */}
                                    <div className="col-span-1 sm:col-span-3">
                                        <Label htmlFor="business_desciption">
                                            Deskripsi Bisnis <strong className="text-red-500">*</strong>
                                        </Label>

                                        <Textarea
                                            id="business_desciption"
                                            value={data?.business_description}
                                            onChange={(e) => setData('business_description', e.target.value)}
                                            placeholder="Deskripsi Bisnis anda"
                                            className="mt-2 min-h-[100px]"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Button */}
                        <div className="mt-4 flex justify-end space-x-3">
                            <Link href={route('admin.merchants.index')} className="cursor-pointer">
                                <Button variant="destructive">
                                    Batalkan <Icon icon="iconoir:cancel" />
                                </Button>
                            </Link>
                            <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Tambah Merchant <Icon icon="heroicons:plus" />
                            </Button>
                        </div>
                    </main>
                </form>
            </AdminLayout>
        </>
    );
}
