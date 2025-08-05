import BannerImage from '@/assets/images/restaurant.jpg';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { Link } from '@inertiajs/react';

export default function HeroSection() {
    return (
        <section className="relative flex h-[85vh] w-full items-center justify-center overflow-hidden">
            {/* Background Image */}
            <img src={BannerImage} alt="Hero Background" className="absolute inset-0 h-full w-full object-cover" />

            {/* Overlay Hitam */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Gradient Dekoratif di Bawah */}
            <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Konten */}
            <div className="relative z-10 px-6 text-center text-white">
                {/* Badge */}
                <span className="mb-4 inline-flex rounded-full border px-4 py-2 text-sm font-medium">
                    <Icon icon="mdi:food" className="mr-2 text-xl" />
                    Platform Pemesanan Makanan
                </span>

                {/* Judul */}
                <h1 className="text-4xl leading-tight font-extrabold drop-shadow-lg md:text-6xl">Temukan Makanan Favoritmu</h1>

                {/* Deskripsi */}
                <p className="mx-auto mt-4 max-w-xl text-lg text-gray-200 md:text-lg">
                    Pilih menu terbaik dari merchant terpercaya dan nikmati pengalaman kuliner tanpa repot.
                </p>

                {/* Tombol CTA */}
                <div className="mt-6 flex justify-center gap-4">
                    <Link href="/merchant">
                        <Button className="rounded-md bg-white px-6 py-5 text-sm font-medium text-black transition-transform hover:scale-105 hover:bg-gray-200">
                            <Icon icon="mingcute:shop-line" className="mr-2 text-xl" />
                            Jelajahi Merchant
                        </Button>
                    </Link>
                    <Link href="/menu">
                        <Button
                            variant="outline"
                            className="cursor-pointer rounded-md border-white px-6 py-5 text-sm font-medium text-black transition-transform hover:scale-105 hover:bg-white hover:text-black"
                        >
                            Lihat Menu
                            <Icon icon="icon-park-outline:arrow-right" className="ml-2 text-xl" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
