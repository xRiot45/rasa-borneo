import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/hooks/use-auth';
import { MenuItem } from '@/models/menu-item';
import { formatCurrency } from '@/utils/format-currency';
import { Icon } from '@iconify/react';
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    data: MenuItem[];
}

const CardMenuItem: React.FC<Props> = ({ data }) => {
    const isLoading = !data;
    const { isLoggedIn } = useAuth();
    const { wishlist } = usePage<{ wishlist: number[] }>().props;

    const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
    const [openMenuItemDialog, setOpenMenuItemDialog] = useState<boolean>(false);
    const [merchantConflictOpen, setMerchantConflictOpen] = useState(false);
    const [pendingMenuToAdd, setPendingMenuToAdd] = useState<MenuItem | null>(null);
    const [wishlistItems, setWishlistItems] = useState<number[]>(wishlist || []);

    useEffect(() => {
        setWishlistItems(wishlist || []);
    }, [wishlist]);

    const handleOpen = (item: MenuItem) => {
        setSelectedMenu(item);
        setOpenMenuItemDialog(true);
    };

    const handleAddMenuToCart = (item: MenuItem) => {
        if (!isLoggedIn) {
            toast.error('Gagal', {
                description: 'Silakan login terlebih dahulu untuk menggunakan fitur keranjang.',
                action: {
                    label: 'Tutup',
                    onClick: () => toast.dismiss(),
                },
            });

            router.visit(route('login'));
            return;
        }

        const cartItem = {
            menu_item_id: item?.id,
            quantity: 1,
            unit_price: item?.price,
        };

        router.post(route('cart.store'), cartItem, {
            onSuccess: () => {
                toast.success('Success', {
                    description: 'Menu berhasil ditambahkan ke keranjang',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
                setOpenMenuItemDialog(false);
            },
            onError: (errors) => {
                if (errors.merchant_conflict) {
                    setPendingMenuToAdd(item);
                    setMerchantConflictOpen(true);
                    setOpenMenuItemDialog(false);
                } else {
                    Object.keys(errors).forEach((key) => {
                        toast.error('Error', {
                            description: errors[key],
                            action: {
                                label: 'Tutup',
                                onClick: () => toast.dismiss(),
                            },
                        });
                    });
                }
            },

            preserveScroll: true,
        });
    };

    const handleAddMenuToWishlist = async (menuItemId: number) => {
        if (!isLoggedIn) {
            toast.error('Gagal', {
                description: 'Silakan login terlebih dahulu untuk menggunakan fitur wishlist.',
                action: {
                    label: 'Tutup',
                    onClick: () => toast.dismiss(),
                },
            });

            router.visit(route('login'));
            return;
        }

        router.post(
            route('wishlist.toggle'),
            { menu_item_id: menuItemId },
            {
                onSuccess: (response) => {
                    const status = (response.props.flash as { status: boolean | null })?.status;
                    setWishlistItems((prev) => (status ? [...prev, menuItemId] : prev.filter((id) => id !== menuItemId)));
                    toast.success('Success', {
                        description: status ? 'Menu berhasil ditambahkan ke wishlist' : 'Menu dihapus dari wishlist',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });

                    setOpenMenuItemDialog(false);
                },
                onError: (errors) => {
                    toast.error('Failed', {
                        description: errors.message || 'Terjadi kesalahan',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                },

                preserveScroll: true,
            },
        );
    };

    const handleConfirmReplaceCart = () => {
        setMerchantConflictOpen(false);
        if (!pendingMenuToAdd) return;

        router.post(
            route('cart.clearCart'),
            {},
            {
                onSuccess: () => {
                    handleAddMenuToCart(pendingMenuToAdd);
                    setPendingMenuToAdd(null);
                },
                onError: () => {
                    toast.error('Gagal mengosongkan keranjang.');
                    setPendingMenuToAdd(null);
                },
            },
        );
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
                        : data?.map((item) => (
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
                <Dialog open={openMenuItemDialog} onOpenChange={setOpenMenuItemDialog}>
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
                                            <TooltipTrigger
                                                asChild
                                                onClick={() => handleAddMenuToWishlist(selectedMenu?.id)}
                                                className="cursor-pointer"
                                            >
                                                <div className="mx-auto flex aspect-square w-12 items-center justify-center rounded-full border p-4">
                                                    <Icon
                                                        icon={wishlistItems.includes(selectedMenu.id) ? 'mdi:heart' : 'mdi:heart-outline'}
                                                        className={`h-4 w-4 text-xl ${wishlistItems.includes(selectedMenu.id) ? 'text-red-500' : ''}`}
                                                    />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="rounded-md px-3 py-1 text-xs">
                                                {wishlistItems.includes(selectedMenu.id) ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                {selectedMenu?.merchant?.slug && (
                                                    <Link
                                                        href={route('merchant.show', selectedMenu.merchant.slug)}
                                                        className="mx-auto flex aspect-square w-12 items-center justify-center rounded-full border p-4"
                                                    >
                                                        <Icon icon="material-symbols:storefront" className="h-4 w-4 text-xl" />
                                                    </Link>
                                                )}
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="rounded-md px-3 py-1 text-xs">
                                                Lihat Merchant
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link
                                                    href={route('menu_item.review.showReviewForCustomer', selectedMenu.id)}
                                                    className="mx-auto flex aspect-square w-12 items-center justify-center rounded-full border p-4"
                                                >
                                                    <Icon icon="carbon:review" className="h-4 w-4 text-xl" />
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="rounded-md px-3 py-1 text-xs">
                                                Lihat Ulasan
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <Button
                                        onClick={() => handleAddMenuToCart(selectedMenu)}
                                        className="w-full cursor-pointer border-none py-6 shadow-none"
                                    >
                                        Tambah menu ke keranjang
                                        <Icon icon="mdi:cart-outline" className="mr-1" />
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Dialog konfirmasi merchant conflict */}
                <Dialog open={merchantConflictOpen} onOpenChange={setMerchantConflictOpen}>
                    <DialogContent className="sm:max-w-xl">
                        <DialogHeader>
                            <DialogTitle>Keranjang Berisi Merchant Lain</DialogTitle>
                            <DialogDescription>
                                Keranjang Anda sudah berisi menu dari merchant lain. Apakah Anda ingin mengosongkan keranjang dan menambahkan menu
                                baru ini?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setMerchantConflictOpen(false)} className="cursor-pointer">
                                Batal
                            </Button>
                            <Button onClick={handleConfirmReplaceCart} className="cursor-pointer">
                                Ya, Kosongkan dan Tambah
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </main>
        </>
    );
};

export default CardMenuItem;
