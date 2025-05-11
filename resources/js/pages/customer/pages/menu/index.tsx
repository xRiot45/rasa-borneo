import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import CustomerLayout from '@/layouts/customer/layout';
import { MenuItem } from '@/models/menu-item';
import { formatCurrency } from '@/utils/format-currency';
import { Head } from '@inertiajs/react';

interface Props {
    data: MenuItem[];
}

export default function MenuPage({ data }: Props) {
    return (
        <>
            <CustomerLayout>
                <Head title="Menu" />
                <section className="mx-auto mt-10 w-full max-w-screen-xl">
                    <div className="mb-5">
                        <h2 className="text-lg font-bold">Menu Tersedia</h2>
                        <p className="text-muted-foreground text-sm">Daftar menu yang tersedia</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {data?.map((item) => (
                            <Card key={item.id} className="group relative cursor-pointer overflow-hidden rounded-xl border shadow-none transition">
                                <div className="relative h-48 w-full">
                                    <img
                                        src={`${item.image_url}`}
                                        alt={item.name}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
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
            </CustomerLayout>
        </>
    );
}
