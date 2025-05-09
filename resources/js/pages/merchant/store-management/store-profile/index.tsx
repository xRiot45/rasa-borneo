import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MerchantLayout from '@/layouts/merchant/layout';
import { StoreProfile as StoreProfileModel } from '@/models/store-management/store-profile';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';

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
    return (
        <>
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <Head title="Profile Toko" />
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Profile Toko</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola profile toko anda di sini</p>
                    </div>
                    <ButtonPartials />
                </div>

                <Card className="w-full border-none p-4 shadow-none">
                    <CardHeader className="p-0">
                        <img
                            src={`${storeProfile.cover_photo}`}
                            alt="Cover"
                            className="h-48 w-full rounded-t-lg object-cover sm:h-64 md:h-80 lg:h-96"
                        />
                    </CardHeader>
                    <CardContent className="px-0 pb-4">
                        {/* Logo dan Info */}
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                            {/* Logo */}
                            <div className="mx-auto md:mx-0 md:shrink-0">
                                <img
                                    src={`${storeProfile.logo_photo}`}
                                    alt="Logo"
                                    className="h-32 w-32 rounded-xl border-4 border-white object-cover sm:h-36 sm:w-36 md:h-40 md:w-40"
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
                                    <span className="flex items-center">
                                        <Icon icon="mdi:phone" className="mr-1 h-4 w-4" />
                                        {storeProfile.merchant.business_phone}
                                    </span>
                                    <span className="flex items-center">
                                        <Icon icon="mdi:email" className="mr-1 h-4 w-4" />
                                        {storeProfile.merchant.business_email}
                                    </span>
                                    <span className="flex items-center">
                                        <Icon icon="mdi:office-building" className="mr-1 h-4 w-4" />
                                        {storeProfile.merchant.business_address}
                                    </span>
                                    <span className="flex items-center">
                                        <Icon icon="mdi:calendar" className="mr-1 h-4 w-4" />
                                        Berdiri sejak {storeProfile.founded_year}
                                    </span>
                                    <span className="flex items-center">
                                        <Icon icon="mdi:account-group" className="mr-1 h-4 w-4" />
                                        {storeProfile.number_of_employees} karyawan
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-4" />
                    </CardContent>
                </Card>
            </MerchantLayout>
        </>
    );
}
