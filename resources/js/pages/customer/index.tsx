import Ads1 from '@/assets/images/ads/ads-1.png';
import Ads2 from '@/assets/images/ads/ads-2.png';
import Ads3 from '@/assets/images/ads/ads-3.png';
import Ads4 from '@/assets/images/ads/ads-4.png';
import Ads5 from '@/assets/images/ads/ads-5.png';
import Ads6 from '@/assets/images/ads/ads-6.png';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import CustomerLayout from '@/layouts/customer/layout';
import { MenuCategory } from '@/models/menu-category';
import { MenuItem } from '@/models/menu-item';
import { Merchant } from '@/models/merchant';
import { getCategoryIcon } from '@/utils/category-icons';
import { formatCurrency } from '@/utils/format-currency';
import { Icon } from '@iconify/react';
import { Head, usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

const banners = [
    {
        image: Ads1,
    },
    {
        image: Ads2,
    },
    {
        image: Ads3,
    },
    {
        image: Ads4,
    },
    {
        image: Ads5,
    },
    {
        image: Ads6,
    },
];

const gradients = [
    'from-pink-500 to-rose-400',
    'from-blue-500 to-indigo-400',
    'from-emerald-500 to-green-400',
    'from-yellow-500 to-orange-400',
    'from-purple-500 to-violet-400',
    'from-teal-500 to-cyan-400',
];

export default function HomePage() {
    const { menuCategories } = usePage<{ menuCategories: MenuCategory[] }>().props;
    const { merchants } = usePage<{ merchants: Merchant[] }>().props;
    const { menuItems } = usePage<{ menuItems: MenuItem[] }>().props;
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <>
            <CustomerLayout>
                <Head title="Beranda" />
                <Carousel className="mx-auto mt-12 w-full max-w-screen-xl" plugins={[plugin.current]}>
                    <CarouselContent>
                        {banners.map((banner, index) => (
                            <CarouselItem key={index} className="w-full sm:basis-1/2 lg:basis-1/3">
                                <div className={`relative flex h-64 w-full flex-col justify-between overflow-hidden rounded-2xl p-6 text-white`}>
                                    <img src={banner.image} alt="food" className="absolute top-0 left-0 h-full w-full object-cover" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <CarouselPrevious className="hidden sm:block" />
                    <CarouselNext className="hidden sm:block" /> */}
                </Carousel>

                {/* Menu Categories */}
                <section className="mx-auto mt-12 w-full max-w-screen-xl">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-black">Kategori Menu</h2>
                            <p className="text-gray-500 dark:text-gray-400">Daftar kategori menu yang tersedia</p>
                        </div>
                        <Button className="cursor-pointer text-sm font-medium" variant="link">
                            Lihat Semua Kategori
                            <Icon icon="icon-park-outline:right-c" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {menuCategories.slice(0, 6).map((category, index) => {
                            const CategoryIcon = getCategoryIcon(category.name);

                            return (
                                <div
                                    key={category.id}
                                    className={`flex cursor-pointer flex-col items-center justify-center rounded-xl bg-gradient-to-br p-4 text-white transition-all ${gradients[index % gradients.length]} space-y-4 hover:scale-[1.04]`}
                                >
                                    <div className="mb-3">
                                        <CategoryIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-center text-sm font-bold">{category.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Menu Items */}
                <section className="mx-auto mt-12 w-full max-w-screen-xl">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Menu Direkomendasi</h2>
                            <p className="text-muted-foreground text-sm">Daftar menu yang direkomendasikan</p>
                        </div>
                        <Button variant="link" className="text-sm font-medium">
                            Lihat Semua Menu
                            <Icon icon="icon-park-outline:right-c" className="ml-1" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {menuItems.slice(0, 6).map((item) => (
                            <Card key={item.id} className="group relative cursor-pointer overflow-hidden rounded-xl border shadow-none transition">
                                <div className="relative h-48 w-full">
                                    <img
                                        src={`${item.image_url}`}
                                        alt={item.name}
                                        className="h-full w-full object-cover brightness-75 transition duration-300 group-hover:scale-105"
                                    />
                                    {item.is_recommended === 1 && (
                                        <span className="absolute top-4 left-2 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white shadow">
                                            Direkomendasikan
                                        </span>
                                    )}
                                </div>
                                <CardContent className="pb-5">
                                    <Badge className="mb-3 rounded-sm text-xs">{item.menu_category?.name}</Badge>
                                    <h1 className="line-clamp-1 text-base font-bold">{item.name}</h1>
                                    <p className="text-muted-foreground line-clamp-2 text-sm">{item.short_description}</p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-primary text-sm font-bold">{formatCurrency(item.price)}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Merchant */}
                <section className="mt-12">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Merchant Terdaftar</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Daftar mitra bisnis yang telah diverifikasi</p>
                        </div>

                        <Button className="text-primary text-sm font-medium" variant="link">
                            Lihat Semua Merchant
                            <Icon icon="icon-park-outline:right-c" className="ml-1" />
                        </Button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {merchants.slice(0, 6).map((merchant) => (
                            <Card key={merchant.id} className="group rounded-xl border shadow-none transition">
                                <div className="w-full overflow-hidden rounded-t-2xl">
                                    <img
                                        src={`${merchant.store_profile?.cover_photo}`}
                                        alt={merchant.business_name}
                                        className="h-full w-full object-cover transition duration-300 group-hover:brightness-50"
                                    />
                                </div>

                                <CardContent className="space-y-4 pb-5">
                                    {/* Logo dan Nama */}
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-16 w-16 rounded-md">
                                            <AvatarImage
                                                src={`${merchant.store_profile?.logo_photo}`}
                                                alt={merchant.business_name}
                                                className="object-cover"
                                            />
                                        </Avatar>

                                        <div className="mb-4 flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h1 className="line-clamp-1 text-base font-semibold text-gray-900 dark:text-white">
                                                    {merchant.business_name}
                                                </h1>
                                                {merchant.business_category?.name && (
                                                    <Badge variant="default" className="rounded-sm">
                                                        {merchant.business_category.name}
                                                    </Badge>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-500 dark:text-gray-400">{merchant.business_phone}</p>
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                <Icon icon="mingcute:location-line" className="mr-2" />
                                                <span className="line-clamp-2">{merchant.business_address}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="w-full cursor-pointer py-5 text-sm font-medium">
                                        Lihat Detail Merchant
                                        <Icon icon="icon-park-outline:right-c" className="ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </CustomerLayout>
        </>
    );
}
