import EmptyData from '@/components/empty-img';
import { Button } from '@/components/ui/button';
import CustomerLayout from '@/layouts/customer/layout';
import { BusinessCategory } from '@/models/business-category';
import { MenuItem } from '@/models/menu-item';
import { Merchant } from '@/models/merchant';
import { Icon } from '@iconify/react';
import { Head, Link, usePage } from '@inertiajs/react';
import CardMenuItem from './components/card-menu-items';
import CardMerchantCategories from './components/card-merchant-categories';
import CardMerchant from './components/card-merchants';
import HeroSection from './shared/hero-section';

export default function HomePage() {
    const { businessCategories } = usePage<{ businessCategories: BusinessCategory[] }>().props;
    const { merchants } = usePage<{ merchants: Merchant[] }>().props;
    const { menuItemsRecommended } = usePage<{ menuItemsRecommended: MenuItem[] }>().props;

    return (
        <>
            <Head title="Beranda" />
            <HeroSection />
            <CustomerLayout>
                {/* Merchant Categories */}
                <section className="mx-auto mt-12 w-full max-w-screen-xl">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-black">Kategori Toko</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Daftar kategori toko yang tersedia</p>
                        </div>
                        <Link href={route('merchant-categories')}>
                            <Button className="cursor-pointer text-sm font-medium" variant="link">
                                Lihat Semua Kategori
                                <Icon icon="icon-park-outline:right-c" />
                            </Button>
                        </Link>
                    </div>

                    {businessCategories.length > 0 ? (
                        <CardMerchantCategories data={businessCategories.slice(0, 6)} />
                    ) : (
                        <EmptyData title="Belum ada kategori" description="Belum ada kategori yang tersedia" />
                    )}
                </section>

                {/* Recommended Menu Items Section */}
                <section className="mx-auto mt-12 w-full max-w-screen-xl">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Menu Direkomendasi</h2>
                            <p className="text-muted-foreground text-sm">Daftar menu yang direkomendasikan</p>
                        </div>
                        <Link href={route('menu', { recommended: true })}>
                            <Button variant="link" className="text-sm font-medium">
                                Lihat Semua Menu
                                <Icon icon="icon-park-outline:right-c" className="ml-1" />
                            </Button>
                        </Link>
                    </div>

                    {menuItemsRecommended.length > 0 ? (
                        <CardMenuItem data={menuItemsRecommended.slice(0, 6)} />
                    ) : (
                        <EmptyData title="Belum ada menu" description="Belum ada menu yang direkomendasikan" />
                    )}
                </section>

                {/* Merchant Section */}
                <section className="mx-auto mt-12 w-full max-w-screen-xl">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Merchant Terdaftar</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Daftar mitra bisnis yang telah diverifikasi</p>
                        </div>

                        <Link href={route('merchant')}>
                            <Button className="text-primary text-sm font-medium" variant="link">
                                Lihat Semua Merchant
                                <Icon icon="icon-park-outline:right-c" className="ml-1" />
                            </Button>
                        </Link>
                    </div>

                    {merchants.length > 0 ? (
                        <CardMerchant data={merchants.slice(0, 6)} />
                    ) : (
                        <EmptyData title="Belum ada merchant" description="Belum ada merchant yang tersedia" />
                    )}
                </section>
            </CustomerLayout>
        </>
    );
}
