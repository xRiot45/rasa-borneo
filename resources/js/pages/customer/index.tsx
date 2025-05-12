import Ads1 from '@/assets/images/ads/ads-1.png';
import Ads2 from '@/assets/images/ads/ads-2.png';
import Ads3 from '@/assets/images/ads/ads-3.png';
import Ads4 from '@/assets/images/ads/ads-4.png';
import Ads5 from '@/assets/images/ads/ads-5.png';
import Ads6 from '@/assets/images/ads/ads-6.png';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import CustomerLayout from '@/layouts/customer/layout';
import { MenuCategory } from '@/models/menu-category';
import { MenuItem } from '@/models/menu-item';
import { Merchant } from '@/models/merchant';
import { getCategoryIcon } from '@/utils/category-icons';
import { Icon } from '@iconify/react';
import { Head, usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import CardMenuItem from './components/card-menu-items';
import CardMerchant from './components/card-merchants';

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
    const { menuItemsRecommended } = usePage<{ menuItemsRecommended: MenuItem[] }>().props;
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <>
            <Head title="Beranda" />
            <CustomerLayout>
                <Carousel className="mx-auto mt-22 w-full max-w-screen-xl" plugins={[plugin.current]}>
                    <CarouselContent>
                        {banners.map((banner, index) => (
                            <CarouselItem key={index} className="w-full sm:basis-1/2 lg:basis-1/3">
                                <div className={`relative flex h-64 w-full flex-col justify-between overflow-hidden rounded-2xl p-6 text-white`}>
                                    <img src={banner.image} alt="food" className="absolute top-0 left-0 h-full w-full object-cover" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                </Carousel>

                {/* Menu Categories */}
                <section className="mx-auto mt-12 w-full max-w-screen-xl">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-black">Kategori Menu</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Daftar kategori menu yang tersedia</p>
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

                {/* Recommended Menu Items Section */}
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

                    <CardMenuItem data={menuItemsRecommended} />
                </section>

                {/* Merchant Section */}
                <section className="mx-auto mt-12 w-full max-w-screen-xl">
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

                    <CardMerchant data={merchants} />
                </section>
            </CustomerLayout>
        </>
    );
}
