import DefaultBannerImage from '@/assets/images/banner-default.png';
import DefaultProfilePhoto from '@/assets/images/default-image.png';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import CustomerLayout from '@/layouts/customer/layout';
import { Merchant } from '@/models/merchant';
import { Icon } from '@iconify/react';
import { Head, Link } from '@inertiajs/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import TabGalleryContent from './partials/tabs/tab-gallery';
import TabMenuContent from './partials/tabs/tab-menu';
import TabReviewContent from './partials/tabs/tab-review';
import TabStoreOperatingHour from './partials/tabs/tab-store-operating-hour';

interface Props {
    data: Merchant;
}

export default function MerchantDetailPage({ data }: Props) {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success('Tautan berhasil disalin');
    };

    const latitude = data?.store_profile?.latitude ? parseFloat(data?.store_profile?.latitude) : 0;
    const longitude = data?.store_profile?.longitude ? parseFloat(data?.store_profile?.longitude) : 0;

    return (
        <>
            <Head title="Detail Penjual" />
            <CustomerLayout>
                <main className="mt-22">
                    <Button className="mb-10" onClick={() => window.history.back()}>
                        <Icon icon="material-symbols:arrow-back-rounded" />
                        Kembali ke halaman sebelumnya
                    </Button>
                    <div className="mx-auto">
                        {/* Hero Section */}
                        <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                            {/* Left Banner & Promo (moved to top on small screens) */}
                            <div className="relative col-span-1 overflow-hidden rounded-xl lg:col-span-2">
                                <img
                                    src={`${data?.store_profile?.cover_photo ? data?.store_profile?.cover_photo : DefaultBannerImage}`}
                                    alt="Promo"
                                    className="h-auto w-full rounded-xl object-cover"
                                />

                                <div className="absolute top-6 right-6 w-72 rounded-lg bg-gradient-to-r from-white to-orange-50 p-5 shadow-xl ring-1 ring-orange-100">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="border-orange-500 text-[10px] text-orange-500">
                                            Kode Kupon
                                        </Badge>
                                        <span className="text-xs text-gray-500">Berlaku hingga 1 Des 2025</span>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <div>
                                            <h1 className="text-lg leading-tight font-extrabold text-orange-600">Diskon 50%</h1>
                                            <p className="text-muted-foreground text-xs">untuk semua produk</p>
                                        </div>
                                        <div className="flex items-center justify-center rounded-lg border border-dashed border-orange-300 bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
                                            free50
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                                        <span className="italic">* S&K berlaku</span>
                                        <button className="font-medium text-orange-600 hover:underline">Gunakan</button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Info */}
                            <div className="col-span-1 space-y-2 rounded-xl px-3 py-2 lg:col-span-1">
                                {/* Business Info */}
                                <div className="flex items-start gap-5">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
                                        <img
                                            src={`${data?.store_profile?.logo_photo ? data?.store_profile?.logo_photo : DefaultProfilePhoto}`}
                                            alt="Business Logo"
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <h1 className="text-lg font-bold">{data?.business_name}</h1>
                                            <p className="text-muted-foreground text-sm">{data?.business_category?.name}</p>
                                        </div>

                                        <div className="text-muted-foreground space-y-2 text-xs">
                                            <div className="flex items-center gap-1">
                                                <Icon icon="mdi:calendar" className="text-muted-foreground h-4 w-4" />
                                                <span>Tahun Berdiri :{data?.store_profile?.founded_year || 'Belum tersedia'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Icon icon="mdi:account-group" className="text-muted-foreground h-4 w-4" />
                                                <span>Jumlah Karyawan : {data?.store_profile?.number_of_employees || 'Belum tersedia'} orang</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm">
                                            <Badge className="rounded-sm bg-green-600 text-white">4.7 ★</Badge>
                                            <Link href="#" className="text-xs text-blue-600">
                                                3 Ratings
                                            </Link>
                                            <Link href="#" className="text-xs text-blue-600">
                                                3 Reviews
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Location & Phone */}
                                <div className="mt-6 flex items-start gap-4">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="material-symbols:location-on" className="text-muted-foreground" />
                                        <span className="text-muted-foreground text-xs font-medium">{data?.business_address}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Icon icon="material-symbols:call" className="text-muted-foreground" />
                                        <span className="text-muted-foreground text-xs font-medium">{data?.business_phone}</span>
                                    </div>
                                </div>

                                {/* Business Description */}
                                <div className="mt-2 flex items-start gap-2">
                                    <span className="text-muted-foreground text-justify text-xs leading-6 font-light">
                                        {data?.business_description}
                                    </span>
                                </div>

                                {/* Wishlist, Share & Button see google map */}
                                <div className="mt-6 flex w-full items-center gap-4">
                                    <div className="flex gap-2">
                                        {/* Wishlist */}
                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="mx-auto flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full border p-4">
                                                        <Icon icon="icon-park-outline:like" className="h-4 w-4 text-xl" />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="rounded-md px-3 py-1 text-xs">
                                                    <p>Tambahkan ke Wishlist</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            {/* Share Button inside Dialog */}
                                            <Tooltip>
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <div className="mx-auto flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full border p-4">
                                                            <Icon icon="material-symbols:share" className="h-4 w-4 text-xl" />
                                                        </div>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-full p-6 sm:max-w-md md:max-w-lg lg:max-w-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Bagikan Halaman Ini</DialogTitle>
                                                        </DialogHeader>

                                                        <div className="flex w-full items-center gap-2">
                                                            <Input
                                                                type="text"
                                                                value={shareUrl}
                                                                readOnly
                                                                className="flex-1 rounded-lg border px-3 py-6 text-sm shadow-none"
                                                            />
                                                            <Button type="button" onClick={handleCopy} className="cursor-pointer p-6">
                                                                <Copy className="h-4 w-4" />
                                                            </Button>
                                                        </div>

                                                        {/* Share To Media Social */}
                                                        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                                            {/* WhatsApp */}
                                                            <a
                                                                href={`https://wa.me/?text=${encodeURIComponent('Cek halaman ini! ' + shareUrl)}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    className="flex w-full cursor-pointer items-center gap-2 rounded-md shadow-none"
                                                                >
                                                                    <Icon icon="ic:baseline-whatsapp" className="h-5 w-5 text-green-500" /> WhatsApp
                                                                </Button>
                                                            </a>

                                                            {/* Twitter */}
                                                            <a
                                                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Cek halaman ini!')}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    className="flex w-full cursor-pointer items-center gap-2 rounded-md shadow-none"
                                                                >
                                                                    <Icon icon="mdi:twitter" className="h-5 w-5 text-blue-500" /> Twitter
                                                                </Button>
                                                            </a>

                                                            {/* Facebook */}
                                                            <a
                                                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    className="flex w-full cursor-pointer items-center gap-2 rounded-md shadow-none"
                                                                >
                                                                    <Icon icon="uiw:facebook" className="h-5 w-5 text-blue-600" /> Facebook
                                                                </Button>
                                                            </a>

                                                            {/* LinkedIn */}
                                                            <a
                                                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent('Cek halaman ini!')}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    className="flex w-full cursor-pointer items-center gap-2 rounded-md shadow-none"
                                                                >
                                                                    <Icon icon="mdi:linkedin" className="h-5 w-5 text-blue-600" /> LinkedIn
                                                                </Button>
                                                            </a>

                                                            {/* Instagram */}
                                                            <a
                                                                href={`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    className="flex w-full cursor-pointer items-center gap-2 rounded-md shadow-none"
                                                                >
                                                                    <Icon icon="icon-park-outline:instagram" className="h-5 w-5 text-pink-500" />{' '}
                                                                    Instagram
                                                                </Button>
                                                            </a>

                                                            {/* TikTok */}
                                                            <a
                                                                href={`https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    className="flex w-full cursor-pointer items-center gap-2 rounded-md shadow-none"
                                                                >
                                                                    <Icon icon="ic:baseline-tiktok" className="h-5 w-5 text-black" /> TikTok
                                                                </Button>
                                                            </a>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>

                                    {/* Lokasi Toko */}
                                    <Dialog>
                                        <DialogTrigger className="w-full">
                                            <Button className="w-full cursor-pointer py-5.5 text-sm">
                                                Lihat Lokasi Toko <Icon icon="mdi:map-marker" className="mr-1 h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-4xl">
                                            <DialogHeader className="text-start">
                                                <DialogTitle>Lokasi Toko</DialogTitle>
                                                <DialogDescription>{data?.business_address}</DialogDescription>
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

                                {/* Icon-Only Social Media Links */}
                                <div className="mx-auto mt-6 flex w-full items-center justify-center gap-6">
                                    {data?.store_profile?.instagram_url && (
                                        <Link href={data?.store_profile?.instagram_url} target="_blank" rel="noopener noreferrer">
                                            <Icon icon="mdi:instagram" className="h-5 w-5 text-pink-500" />
                                        </Link>
                                    )}
                                    {data?.store_profile?.facebook_url && (
                                        <Link href={data?.store_profile?.facebook_url} target="_blank" rel="noopener noreferrer">
                                            <Icon icon="mdi:facebook" className="h-5 w-5 text-blue-600" />
                                        </Link>
                                    )}
                                    {data?.store_profile?.twitter_url && (
                                        <Link href={data?.store_profile?.twitter_url} target="_blank" rel="noopener noreferrer">
                                            <Icon icon="mdi:twitter" className="h-5 w-5 text-sky-500" />
                                        </Link>
                                    )}
                                    {data?.store_profile?.tiktok_url && (
                                        <Link href={data?.store_profile?.tiktok_url} target="_blank" rel="noopener noreferrer">
                                            <Icon icon="simple-icons:tiktok" className="h-5 w-5 text-black" />
                                        </Link>
                                    )}
                                    {data?.store_profile?.website_url && (
                                        <Link href={data?.store_profile?.website_url} target="_blank" rel="noopener noreferrer">
                                            <Icon icon="mdi:web" className="h-5 w-5 text-green-600" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tabs & Filter */}
                        <div className="mt-16">
                            <Tabs defaultValue="menu">
                                <TabsList className="border-muted grid grid-cols-4 border-b px-0">
                                    <TabsTrigger
                                        value="menu"
                                        className="data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-primary w-full cursor-pointer rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium data-[state=active]:border-b-2"
                                    >
                                        Menu Tersedia
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="gallery"
                                        className="data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-primary w-full cursor-pointer rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium data-[state=active]:border-b-2"
                                    >
                                        Galeri Toko
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="store_operating_hour"
                                        className="data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-primary w-full cursor-pointer rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium data-[state=active]:border-b-2"
                                    >
                                        Jam Operasional
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="review"
                                        className="data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-primary w-full cursor-pointer rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium data-[state=active]:border-b-2"
                                    >
                                        Review & Ulasan
                                    </TabsTrigger>
                                </TabsList>

                                {/* Tabs Menu */}
                                <TabsContent value="menu" className="mt-10">
                                    <TabMenuContent data={data?.menu_items?.map((item) => item) || []} />
                                </TabsContent>

                                {/* Tabs Gallery */}
                                <TabsContent value="gallery" className="mt-10">
                                    <TabGalleryContent data={data?.store_galleries?.map((item) => item) || []} />
                                </TabsContent>

                                {/* Tabs Store Operating Hour */}
                                <TabsContent value="store_operating_hour" className="mt-10">
                                    <TabStoreOperatingHour data={data?.store_operating_hours?.map((item) => item) || []} />
                                </TabsContent>

                                {/* Tabs Review */}
                                <TabsContent value="review">
                                    <TabReviewContent />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </main>
            </CustomerLayout>
        </>
    );
}
