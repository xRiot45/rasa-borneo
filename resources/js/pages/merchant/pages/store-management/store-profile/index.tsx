import EmptyImage from '@/assets/errors/empty.svg';
import DefaultImage from '@/assets/images/default-image.png';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import MerchantLayout from '@/layouts/merchant/layout';
import { StoreProfile as StoreProfileModel } from '@/models/store-management/store-profile';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link } from '@inertiajs/react';

interface StoreProfileProps {
    storeProfile: StoreProfileModel;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Toko',
        href: '#',
    },
    {
        title: 'Profile Toko',
        href: '/admin/store-management/store-profile',
    },
];

export default function StoreProfile({ storeProfile }: StoreProfileProps) {
    const storeProfileExist = storeProfile;

    const latitude = storeProfile?.latitude ? parseFloat(String(storeProfile.latitude)) : 0;
    const longitude = storeProfile?.longitude ? parseFloat(String(storeProfile.longitude)) : 0;

    const isValidLogoPhoto = typeof storeProfile?.logo_photo === 'string' && storeProfile.logo_photo.trim() !== '';

    return (
        <>
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <Head title="Profile Toko" />
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Profile Toko</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola profile toko anda di sini</p>
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={() => window.location.reload()} className="cursor-pointer">
                            <span>Refresh Halaman</span>
                            <Icon icon={'material-symbols:refresh'} className="text-background" />
                        </Button>
                        {storeProfileExist ? (
                            <Link href={route('merchant.store-profile.edit', storeProfile.id)}>
                                <Button className="cursor-pointer">
                                    <span>Edit Profile Toko Anda</span> <Icon icon={'heroicons:pencil'} className="text-background" />
                                </Button>
                            </Link>
                        ) : (
                            <Link href={route('merchant.store-profile.create')}>
                                <Button className="cursor-pointer">
                                    <span>Buat Profile Toko Anda</span> <Icon icon={'heroicons:plus'} className="text-background" />
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {storeProfileExist ? (
                    <Card className="w-full border-none p-4 shadow-none">
                        {/* Banner */}
                        <CardHeader className="p-0">
                            <img
                                src={`${storeProfile.cover_photo}` || DefaultImage}
                                alt="Cover"
                                className="h-48 w-full rounded-t-lg object-cover sm:h-64 md:h-80 lg:h-96"
                            />
                        </CardHeader>
                        <CardContent className="px-0 pb-4">
                            {/* Logo dan Info */}
                            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                                {/* Logo */}
                                <div className="mx-auto md:mx-0 md:shrink-0">
                                    <img
                                        src={isValidLogoPhoto ? `${storeProfile.logo_photo}` : DefaultImage}
                                        alt="Logo"
                                        className="h-32 w-32 rounded-xl border-4 border-white object-cover sm:h-36 sm:w-36 md:h-44 md:w-44"
                                    />
                                </div>

                                {/* Info */}
                                <div className="w-full">
                                    <div className="mb-2 flex flex-col items-center justify-between gap-2 sm:flex-row sm:items-center">
                                        <CardTitle className="text-xl sm:text-2xl">{storeProfile.merchant.business_name}</CardTitle>

                                        {/* Icon-Only Social Media Links */}
                                        <div className="flex items-center gap-3">
                                            {storeProfile.instagram_url && (
                                                <Link href={storeProfile.instagram_url} target="_blank" rel="noopener noreferrer">
                                                    <Icon icon="mdi:instagram" className="h-5 w-5 text-pink-500" />
                                                </Link>
                                            )}
                                            {storeProfile.facebook_url && (
                                                <Link href={storeProfile.facebook_url} target="_blank" rel="noopener noreferrer">
                                                    <Icon icon="mdi:facebook" className="h-5 w-5 text-blue-600" />
                                                </Link>
                                            )}
                                            {storeProfile.twitter_url && (
                                                <Link href={storeProfile.twitter_url} target="_blank" rel="noopener noreferrer">
                                                    <Icon icon="mdi:twitter" className="h-5 w-5 text-sky-500" />
                                                </Link>
                                            )}
                                            {storeProfile.tiktok_url && (
                                                <Link href={storeProfile.tiktok_url} target="_blank" rel="noopener noreferrer">
                                                    <Icon icon="simple-icons:tiktok" className="h-5 w-5 text-black" />
                                                </Link>
                                            )}
                                            {storeProfile.website_url && (
                                                <Link href={storeProfile.website_url} target="_blank" rel="noopener noreferrer">
                                                    <Icon icon="mdi:web" className="h-5 w-5 text-green-600" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    {/* Deskripsi dan Info Tambahan */}
                                    <CardDescription className="mt-6 mb-2 text-center text-sm leading-8 sm:text-base md:mt-2 md:text-start">
                                        {storeProfile.merchant.business_description}
                                    </CardDescription>

                                    {/* Info Kontak */}
                                    <div className="mt-4 flex flex-col gap-4 text-sm text-gray-600 sm:flex-row sm:flex-wrap sm:gap-6">
                                        <span className="flex items-center dark:text-white">
                                            <Icon icon="mdi:phone" className="mr-1 h-4 w-4" />
                                            {storeProfile.merchant.business_phone}
                                        </span>
                                        <span className="flex items-center dark:text-white">
                                            <Icon icon="mdi:email" className="mr-1 h-4 w-4" />
                                            {storeProfile.merchant.business_email}
                                        </span>
                                        <span className="flex items-center dark:text-white">
                                            <Icon icon="mdi:office-building" className="mr-1 h-4 w-4" />
                                            {storeProfile.merchant.business_address}
                                        </span>
                                        <span className="flex items-center dark:text-white">
                                            <Icon icon="mdi:calendar" className="mr-1 h-4 w-4" />
                                            Berdiri sejak Tahun {storeProfile.founded_year}
                                        </span>
                                        <span className="flex items-center dark:text-white">
                                            <Icon icon="mdi:account-group" className="mr-1 h-4 w-4" />
                                            {storeProfile.number_of_employees} karyawan
                                        </span>
                                    </div>

                                    {/* Lokasi Toko */}
                                    <Dialog>
                                        <DialogTrigger className="mt-6">
                                            <Button className="cursor-pointer">
                                                Lihat Lokasi Toko <Icon icon="mdi:map-marker" className="mr-1 h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-4xl">
                                            <DialogHeader className="text-start">
                                                <DialogTitle>Lokasi Toko</DialogTitle>
                                                <DialogDescription>{storeProfile.merchant.business_address}</DialogDescription>
                                            </DialogHeader>

                                            <div className="h-[500px] w-full">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    title="Peta Lokasi"
                                                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.005}%2C${latitude - 0.005}%2C${longitude + 0.005}%2C${latitude + 0.005}&layer=mapnik&marker=${latitude}%2C${longitude}`}
                                                ></iframe>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex min-h-screen flex-col bg-white dark:bg-[#171717]">
                        <div className="flex grow items-center px-6 xl:px-10">
                            <div className="mx-auto text-center">
                                <img src={EmptyImage} alt="Error" className="mx-auto mb-8 w-full max-w-lg lg:mb-12 2xl:mb-16" />
                                <h1 className="text-gray-1000 text-[22px] leading-normal font-bold text-gray-700 lg:text-3xl dark:text-gray-100">
                                    Profile Toko Anda Belum Diatur
                                </h1>
                                <p className="text-sm leading-loose text-gray-500 lg:text-base lg:leading-loose dark:text-gray-400">
                                    Silahkan lakukan penambahan profile toko Anda terlebih dahulu, agar toko anda dapat dengan mudah ditemukan.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </MerchantLayout>
        </>
    );
}
