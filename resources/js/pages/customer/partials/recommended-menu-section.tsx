import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MenuItem } from '@/models/menu-item';
import { formatCurrency } from '@/utils/format-currency';
import { Icon } from '@iconify/react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    menuItems: MenuItem[];
}

const RecommendedMenuSection: React.FC<Props> = ({ menuItems }) => {
    const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleOpen = (item: MenuItem) => {
        setSelectedMenu(item);
        setOpenDialog(true);
    };

    return (
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
                    <Card
                        key={item.id}
                        onClick={() => handleOpen(item)}
                        className="group relative cursor-pointer overflow-hidden rounded-xl border shadow-none transition"
                    >
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

            {/* Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-xl">
                    {selectedMenu && (
                        <>
                            <DialogHeader className="text-start">
                                <DialogTitle>Detail {selectedMenu.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-2">
                                <div className="relative w-full">
                                    <img
                                        src={`${selectedMenu.image_url}`}
                                        alt={selectedMenu.name}
                                        className="h-full w-full object-cover brightness-75 transition duration-300 group-hover:scale-105"
                                    />
                                    {selectedMenu.is_recommended === 1 && (
                                        <span className="absolute top-4 left-2 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white shadow">
                                            Direkomendasikan
                                        </span>
                                    )}
                                </div>
                                <div className="mt-4 space-y-2">
                                    <Badge className="rounded-sm border-none text-xs shadow-none">{selectedMenu.menu_category?.name}</Badge>
                                    <div className="mt-2 space-y-2">
                                        <div className="mb-2">
                                            <h1 className="text-lg font-bold">{selectedMenu.name}</h1>
                                            <p className="text-muted-foreground text-sm">{selectedMenu.short_description}</p>
                                        </div>
                                        <p className="text-primary text-md font-bold">{formatCurrency(selectedMenu.price)}</p>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter className="mt-4 flex flex-row gap-2 sm:justify-end">
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="mx-auto flex aspect-square w-12 items-center justify-center rounded-full border p-4">
                                                <Icon icon="icon-park-outline:like" className="h-4 w-4 text-xl" />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="rounded-md px-3 py-1 text-xs">
                                            <p>Tambahkan ke Wishlist</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href="/merchant"
                                                className="mx-auto flex aspect-square w-12 items-center justify-center rounded-full border p-4"
                                            >
                                                <Icon icon="material-symbols:storefront" className="h-4 w-4 text-xl" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="rounded-md px-3 py-1 text-xs">
                                            <p>Lihat Merchant</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <Button onClick={() => alert('Ditambahkan ke keranjang')} className="w-full cursor-pointer py-6">
                                    <Icon icon="mdi:cart-outline" className="mr-1" />
                                    Tambah ke Keranjang
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default RecommendedMenuSection;
