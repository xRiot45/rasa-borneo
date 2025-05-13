import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MenuItem } from '@/models/menu-item';
import { formatCurrency } from '@/utils/format-currency';
import { Icon } from '@iconify/react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    data: MenuItem[];
}

const CardMenuItem: React.FC<Props> = ({ data }) => {
    const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const isLoading = data?.length === 0;

    const handleOpen = (item: MenuItem) => {
        setSelectedMenu(item);
        setOpenDialog(true);
    };

    return (
        <>
            <main>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {isLoading
                        ? [...Array(6)].map((_, i) => (
                              <Card key={i} className="rounded-xl border shadow-none">
                                  <div className="h-48 w-full">
                                      <Skeleton className="h-full w-full rounded-t-xl" />
                                  </div>
                                  <CardContent className="space-y-2 py-4">
                                      <Skeleton className="h-4 w-1/4" />
                                      <Skeleton className="h-4 w-3/4" />
                                      <Skeleton className="h-3 w-full" />
                                      <Skeleton className="h-3 w-5/6" />
                                      <Skeleton className="h-4 w-1/2" />
                                  </CardContent>
                              </Card>
                          ))
                        : data.slice(0, 6).map((item) => (
                              <Card
                                  key={item.id}
                                  onClick={() => handleOpen(item)}
                                  className="group relative cursor-pointer overflow-hidden rounded-xl border shadow-none transition"
                              >
                                  <div className="relative h-48 w-full">
                                      <img
                                          src={`${item.image_url}`}
                                          alt={item.name}
                                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                      />
                                      {item.is_recommended === 1 && (
                                          <span className="absolute top-4 right-2 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white shadow-none">
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
                                    <DialogTitle>{selectedMenu.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-2">
                                    <div className="relative w-full">
                                        <img
                                            src={`${selectedMenu.image_url}`}
                                            alt={selectedMenu.name}
                                            className="h-full w-full rounded-xl object-cover transition duration-300 group-hover:scale-105"
                                        />
                                        {selectedMenu.is_recommended === 1 && (
                                            <span className="absolute top-4 right-2 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white shadow-none">
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

                                    <Button
                                        onClick={() => alert('Ditambahkan ke keranjang')}
                                        className="w-full cursor-pointer border-none py-6 shadow-none"
                                    >
                                        Tambah ke Keranjang
                                        <Icon icon="mdi:cart-outline" className="mr-1" />
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </main>
        </>
    );
};

export default CardMenuItem;
