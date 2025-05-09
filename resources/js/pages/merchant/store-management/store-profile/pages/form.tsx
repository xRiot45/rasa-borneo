import FileDropzone from '@/components/file-dropzone';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MerchantLayout from '@/layouts/merchant/layout';
import { StoreProfile, StoreProfileForm } from '@/models/store-management/store-profile';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface Props {
    storeProfile: StoreProfile;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Toko',
        href: '#',
    },
    {
        title: 'Profile Toko',
        href: '/merchant/store-management/store-profile',
    },
    {
        title: 'Tambah / Edit Profile Toko',
        href: '#',
    },
];

export default function FormPage({ storeProfile }: Props) {
    const isEdit = !!storeProfile?.id;

    const { data, setData, post, processing, errors } = useForm<Required<StoreProfileForm>>({
        logo_photo: storeProfile?.logo_photo ?? null,
        cover_photo: storeProfile?.cover_photo ?? null,
        website_url: storeProfile?.website_url ?? '',
        instagram_url: storeProfile?.instagram_url ?? '',
        facebook_url: storeProfile?.facebook_url ?? '',
        twitter_url: storeProfile?.twitter_url ?? '',
        tiktok_url: storeProfile?.tiktok_url ?? '',
        whatsapp_url: storeProfile?.whatsapp_url ?? '',
        latitude: storeProfile?.latitude?.toString() ?? '',
        longitude: storeProfile?.longitude?.toString() ?? '',
        founded_year: storeProfile?.founded_year ?? 0,
        number_of_employees: storeProfile?.number_of_employees ?? 0,
    });

    const handleFileChange = (type: 'logo_photo' | 'cover_photo', file: File | null) => {
        if (file) {
            setData(type, file);
        } else {
            setData(type, storeProfile[type]);
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'logo_photo' && key !== 'cover_photo') {
                if (typeof value === 'number') {
                    formData.append(key, String(value));
                } else {
                    formData.append(key, value ?? '');
                }
            }
        });

        if (data.logo_photo instanceof File && data.logo_photo.size > 0) {
            formData.append('logo_photo', data.logo_photo);
        }

        if (data.cover_photo instanceof File && data.cover_photo.size > 0) {
            formData.append('cover_photo', data.cover_photo);
        }

        if (isEdit && storeProfile) {
            formData.append('_method', 'put');

            router.post(route('merchant.store-profile.update', storeProfile.id), formData, {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Profil Toko Berhasil Diubah!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
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
            post(route('merchant.store-profile.store'), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Profil Toko Berhasil Ditambahkan!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
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
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <Head title={isEdit ? 'Edit Profile Toko' : 'Tambah Profile Toko'} />
                <form className="mb-12 space-y-6 p-4" encType="multipart/form-data" onSubmit={handleSubmit}>
                    {/* Logo & Cover Photo */}
                    <Card className="grid gap-6 p-8 shadow-none">
                        <h1 className="text-xl font-black tracking-tight text-gray-700 dark:text-gray-200">Logo & Cover Toko</h1>
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Logo Toko */}
                            <div className="grid gap-2">
                                <Label htmlFor="logo_photo">Logo Toko</Label>
                                <FileDropzone
                                    onFileChange={(file) => handleFileChange('logo_photo', file)}
                                    error={errors.logo_photo}
                                    initialImage={data.logo_photo instanceof File ? undefined : data.logo_photo}
                                    description="Drag & drop logo toko anda di sini, atau klik untuk memilih"
                                />
                            </div>

                            {/* Cover Photo Toko */}
                            <div className="grid gap-2">
                                <Label htmlFor="cover_photo">
                                    Foto Cover Toko <strong className="text-red-500">*</strong>
                                </Label>
                                <FileDropzone
                                    onFileChange={(file) => handleFileChange('cover_photo', file)}
                                    error={errors.cover_photo}
                                    initialImage={data.cover_photo instanceof File ? undefined : data.cover_photo}
                                    description="Drag & drop foto cover toko anda di sini, atau klik untuk memilih"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Social Media URL */}
                    <Card className="grid gap-6 p-8 shadow-none">
                        <h1 className="text-xl font-black tracking-tight text-gray-700 dark:text-gray-200">Media Sosial Toko</h1>
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Website URL */}
                            <div className="grid gap-2">
                                <Label htmlFor="website_url">Website</Label>
                                <div className="relative">
                                    <Input
                                        id="website_url"
                                        type="text"
                                        placeholder="https://"
                                        value={data.website_url}
                                        onChange={(e) => setData('website_url', e.target.value)}
                                        disabled={processing}
                                        className="rounded-xl py-6 pl-10 shadow-none" // Add padding for the icon
                                    />
                                    <Icon icon="bi:globe" className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                                </div>
                                <InputError message={errors.website_url} className="mt-2" />
                            </div>

                            {/* Instagram URL */}
                            <div className="grid gap-2">
                                <Label htmlFor="instagram_url">Instagram</Label>
                                <div className="relative">
                                    <Input
                                        id="instagram_url"
                                        type="text"
                                        placeholder="https://"
                                        value={data.instagram_url}
                                        onChange={(e) => setData('instagram_url', e.target.value)}
                                        className="rounded-xl py-6 pl-10 shadow-none" // Add padding for the icon
                                    />
                                    <Icon
                                        icon="akar-icons:instagram-fill"
                                        className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                                    />
                                </div>
                                <InputError message={errors.instagram_url} className="mt-2" />
                            </div>

                            {/* Facebook URL */}
                            <div className="grid gap-2">
                                <Label htmlFor="facebook_url">Facebook</Label>
                                <div className="relative">
                                    <Input
                                        id="facebook_url"
                                        type="text"
                                        placeholder="https://"
                                        value={data.facebook_url}
                                        onChange={(e) => setData('facebook_url', e.target.value)}
                                        className="rounded-xl py-6 pl-10 shadow-none" // Add padding for the icon
                                    />
                                    <Icon icon="bi:facebook" className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                                </div>
                                <InputError message={errors.facebook_url} className="mt-2" />
                            </div>

                            {/* Twitter URL */}
                            <div className="grid gap-2">
                                <Label htmlFor="twitter_url">Twitter</Label>
                                <div className="relative">
                                    <Input
                                        id="twitter_url"
                                        type="text"
                                        placeholder="https://"
                                        value={data.twitter_url}
                                        onChange={(e) => setData('twitter_url', e.target.value)}
                                        className="rounded-xl py-6 pl-10 shadow-none" // Add padding for the icon
                                    />
                                    <Icon icon="bi:twitter" className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                                </div>
                                <InputError message={errors.twitter_url} className="mt-2" />
                            </div>

                            {/* Tiktok URL */}
                            <div className="grid gap-2">
                                <Label htmlFor="tiktok_url">Tiktok</Label>
                                <div className="relative">
                                    <Input
                                        id="tiktok_url"
                                        type="text"
                                        placeholder="https://"
                                        value={data.tiktok_url}
                                        onChange={(e) => setData('tiktok_url', e.target.value)}
                                        className="rounded-xl py-6 pl-10 shadow-none"
                                    />
                                    <Icon icon="ic:baseline-tiktok" className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                                </div>
                                <InputError message={errors.tiktok_url} className="mt-2" />
                            </div>

                            {/* Whatsapp URL */}
                            <div className="grid gap-2">
                                <Label htmlFor="whatsapp_url">Whatsapp</Label>
                                <div className="relative">
                                    <Input
                                        id="whatsapp_url"
                                        type="text"
                                        placeholder="https://"
                                        value={data.whatsapp_url}
                                        onChange={(e) => setData('whatsapp_url', e.target.value)}
                                        className="rounded-xl py-6 pl-10 shadow-none" // Add padding for the icon
                                    />
                                    <Icon icon="bi:whatsapp" className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                                </div>
                                <InputError message={errors.whatsapp_url} className="mt-2" />
                            </div>
                        </div>
                    </Card>

                    {/* Latitude & Longitude */}
                    <Card className="grid gap-6 p-8 shadow-none">
                        <h1 className="flex items-center justify-between text-xl font-black tracking-tight text-gray-700 dark:text-gray-200">
                            Lokasi Toko
                            <Link
                                href="https://youtu.be/MZUl8h18z3s"
                                className="text-xs text-blue-500 transition duration-300 ease-in-out hover:text-blue-700 focus:outline-none"
                            >
                                Tutorial Menentukan Kordinat Toko
                            </Link>
                        </h1>

                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Latitude */}
                            <div className="grid gap-2">
                                <Label htmlFor="latitude">Latitude</Label>
                                <div className="relative">
                                    <Input
                                        id="latitude"
                                        type="text"
                                        placeholder="latitude"
                                        value={data.latitude}
                                        onChange={(e) => setData('latitude', e.target.value)}
                                        className="rounded-xl py-6 pl-10 shadow-none"
                                    />
                                    <Icon
                                        icon="heroicons-outline:location-marker"
                                        className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                                    />
                                </div>
                                <InputError message={errors.latitude} className="mt-2" />
                            </div>

                            {/* Longitude */}
                            <div className="grid gap-2">
                                <Label htmlFor="longitude">Longitude</Label>
                                <div className="relative">
                                    <Input
                                        id="longitude"
                                        type="text"
                                        placeholder="Longitude"
                                        value={data.longitude}
                                        onChange={(e) => setData('longitude', e.target.value)}
                                        className="rounded-xl py-6 pl-10 shadow-none"
                                    />
                                    <Icon
                                        icon="heroicons-outline:location-marker"
                                        className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                                    />
                                </div>
                                <InputError message={errors.longitude} className="mt-2" />
                            </div>
                        </div>
                    </Card>

                    {/* Informasi Toko */}
                    <Card className="grid gap-6 p-8 shadow-none">
                        <h1 className="text-xl font-black tracking-tight text-gray-700 dark:text-gray-200">Informasi Toko</h1>

                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* founded_year */}
                            <div className="grid gap-2">
                                <Label htmlFor="founded_year">
                                    Tahun Berdiri <strong className="text-red-500">*</strong>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="founded_year"
                                        type="number"
                                        placeholder="Masukkan Tahun Berdiri"
                                        value={data.founded_year}
                                        onChange={(e) => setData('founded_year', parseInt(e.target.value))}
                                        className="rounded-xl py-6 shadow-none"
                                    />
                                </div>
                                <InputError message={errors.founded_year} className="mt-2" />
                            </div>

                            {/* number_of_employees */}
                            <div className="grid gap-2">
                                <Label htmlFor="number_of_employees">
                                    Jumlah Karyawan <strong className="text-red-500">*</strong>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="number_of_employees"
                                        type="number"
                                        placeholder="Masukkan Jumlah Karyawan"
                                        value={data.number_of_employees}
                                        onChange={(e) => setData('number_of_employees', parseInt(e.target.value))}
                                        className="rounded-xl py-6 shadow-none"
                                    />
                                </div>
                                <InputError message={errors.number_of_employees} className="mt-2" />
                            </div>
                        </div>
                    </Card>

                    <div className="mt-4 flex justify-end space-x-3">
                        <Link href={route('merchant.store-profile.index_merchant')} className="cursor-pointer">
                            <Button variant="destructive">
                                Batalkan <Icon icon="iconoir:cancel" />
                            </Button>
                        </Link>
                        <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            {isEdit ? 'Simpan Perubahan' : 'Simpan'} <Icon icon={isEdit ? 'heroicons-outline:check' : 'heroicons-outline:plus'} />
                        </Button>
                    </div>
                </form>
            </MerchantLayout>
        </>
    );
}
