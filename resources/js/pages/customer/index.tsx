import Ads1 from '@/assets/images/ads/ads-1.png';
import Ads2 from '@/assets/images/ads/ads-2.png';
import Ads3 from '@/assets/images/ads/ads-3.png';
import Ads4 from '@/assets/images/ads/ads-4.png';
import Ads5 from '@/assets/images/ads/ads-5.png';
import Ads6 from '@/assets/images/ads/ads-6.png';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import CustomerLayout from '@/layouts/customer/layout';
import { Head } from '@inertiajs/react';
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

export default function HomePage() {
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
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </CustomerLayout>
        </>
    );
}
