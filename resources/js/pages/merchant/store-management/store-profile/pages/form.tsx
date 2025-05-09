import FileDropzone from '@/components/file-dropzone';
import InputError from '@/components/input-error';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MerchantLayout from '@/layouts/merchant/layout';
import { StoreProfile, StoreProfileForm } from '@/models/store-management/store-profile';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
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

    const { data, setData, post, put, errors } = useForm<Required<StoreProfileForm>>({
        logo_photo: null,
        cover_photo: null,
        website_url: storeProfile?.website_url ?? '',
        instagram_url: storeProfile?.instagram_url ?? '',
        facebook_url: storeProfile?.facebook_url ?? '',
        twitter_url: storeProfile?.twitter_url ?? '',
        tiktok_url: storeProfile?.tiktok_url ?? '',
        whatsapp_url: storeProfile?.whatsapp_url ?? '',
        latitude: storeProfile?.latitude?.toString() ?? '',
        longitude: storeProfile?.longitude?.toString() ?? '',
        founded_year: storeProfile?.founded_year?.toString() ?? '',
        number_of_employees: storeProfile?.number_of_employees?.toString() ?? '',
    });

    const handleFileChange = (type: 'logo_photo' | 'cover_photo', file: File | null) => {
        setData(type, file);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== '') {
                formData.append(key, value);
            }
        });

        if (isEdit && storeProfile) {
            put(route('merchant.store-profile.update', storeProfile.id), {
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
                <Head title="Edit Profil Toko" />
                <form className="mb-12 space-y-4 p-4" encType="multipart/form-data" onSubmit={handleSubmit}>
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
                                <InputError message={errors.logo_photo} className="mt-2" />
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
                                <InputError message={errors.cover_photo} className="mt-2" />
                            </div>
                        </div>
                    </Card>

                    {/* Social Media URL */}
                    <Card className="grid gap-6 p-8 shadow-none">
                        <h1 className="text-xl font-black tracking-tight text-gray-700 dark:text-gray-200">Media Sosial Toko</h1>
                        <div className="grid gap-4 lg:grid-cols-3">
                            {/* Website URL */}
                            <div className="grid gap-2">
                                <Label htmlFor="website_url">Website</Label>
                                <div className="relative">
                                    <Input
                                        id="website_url"
                                        type="text"
                                        placeholder="https://"
                                        {...data}
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
                                        {...data}
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
                                        {...data}
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
                                        {...data}
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
                                        {...data}
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
                                        {...data}
                                        className="rounded-xl py-6 pl-10 shadow-none" // Add padding for the icon
                                    />
                                    <Icon icon="bi:whatsapp" className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                                </div>
                                <InputError message={errors.whatsapp_url} className="mt-2" />
                            </div>
                        </div>
                    </Card>
                </form>
            </MerchantLayout>
        </>
    );
}
