import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import CustomerLayout from '@/layouts/customer/layout';
import { CartGroup } from '@/models/cart';
import { formatCurrency } from '@/utils/format-currency';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    carts: CartGroup[];
}

export default function CartPage({ carts }: Props) {
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const [selectedMerchants, setSelectedMerchants] = useState<Set<number>>(new Set());

    const toggleItem = (itemId: number) => {
        setSelectedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }

            return newSet;
        });
    };

    const toggleMerchant = (merchantId: number, itemIds: number[]) => {
        setSelectedMerchants((prev) => {
            const newMerchantSet = new Set(prev);
            const newItemSet = new Set(selectedItems);

            if (newMerchantSet.has(merchantId)) {
                newMerchantSet.delete(merchantId);
                itemIds.forEach((id) => newItemSet.delete(id));
            } else {
                newMerchantSet.add(merchantId);
                itemIds.forEach((id) => newItemSet.add(id));
            }

            setSelectedItems(newItemSet);
            return newMerchantSet;
        });
    };

    const selectedTotal = carts.reduce((acc, group) => {
        return (
            acc +
            group.items.reduce((sum, item) => {
                return selectedItems.has(item.id) ? sum + item.unit_price * item.quantity : sum;
            }, 0)
        );
    }, 0);

    const handleIncrease = (id: number) => {
        console.log('Increase', id);
    };

    const handleDecrease = (id: number) => {
        console.log('Decrease', id);
    };

    const handleRemove = (id: number) => {
        console.log('Remove', id);
    };

    return (
        <>
            <Head title="Keranjang" />
            <CustomerLayout>
                <div className="mt-22 w-full">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 lg:grid-cols-12 lg:gap-4">
                        {/* Cart Items */}
                        <div className="space-y-6 lg:col-span-8">
                            <div className="mb-5">
                                <h2 className="text-lg font-bold">Keranjang</h2>
                                <p className="text-muted-foreground text-sm">Daftar menu yang ada di dalam keranjang anda</p>
                            </div>

                            {carts.map((group) => (
                                <Card key={group.merchant_id} className="border-border mb-4 rounded-xl border shadow-none">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pt-6">
                                        <div className="flex items-center gap-4">
                                            <Checkbox
                                                checked={selectedMerchants.has(group.merchant_id)}
                                                onCheckedChange={() =>
                                                    toggleMerchant(
                                                        group.merchant_id,
                                                        group.items.map((item) => item.id),
                                                    )
                                                }
                                            />

                                            <img
                                                src={group?.merchant_logo_photo}
                                                alt="Logo Merchant"
                                                className="h-14 w-14 rounded-lg border object-cover"
                                            />
                                            <div>
                                                <h3 className="text-lg font-bold">{group?.merchant_name}</h3>
                                                <p className="text-muted-foreground text-sm">{group?.merchant_category}</p>
                                            </div>
                                        </div>
                                        <span className="text-muted-foreground text-sm">{group.items.length} menu</span>
                                    </CardHeader>

                                    <CardContent className="space-y-4 px-6 pb-6">
                                        {group.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex flex-col justify-between gap-4 border-t pt-4 sm:flex-row sm:items-center"
                                            >
                                                <div className="flex items-start gap-4 sm:items-center sm:gap-6">
                                                    <Checkbox checked={selectedItems.has(item.id)} onCheckedChange={() => toggleItem(item.id)} />
                                                    <img
                                                        src={`${item.menu_item.image_url}`}
                                                        alt={item.menu_item.name}
                                                        className="h-16 w-16 rounded-md border object-cover"
                                                    />
                                                    <div>
                                                        <h1 className="font-semibold">{item.menu_item.name}</h1>
                                                        <div className="mt-2 flex items-center gap-4">
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8 cursor-pointer shadow-none"
                                                                onClick={() => handleDecrease(item.id)}
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </Button>
                                                            <span className="text-sm font-semibold">{item.quantity}</span>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8 cursor-pointer shadow-none"
                                                                onClick={() => handleIncrease(item.id)}
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end gap-4 text-start">
                                                    <p className="text-primary text-sm font-semibold">
                                                        {formatCurrency(item.unit_price * item.quantity)}
                                                    </p>
                                                    <Button variant="ghost" size="icon" onClick={() => handleRemove(item.id)}>
                                                        <Trash2 className="h-5 w-5 text-red-500" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Checkout Summary */}
                        <div className="hidden md:block lg:col-span-4 lg:mt-16.5">
                            <Card className="sticky top-20 rounded-xl py-8 shadow-none">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold">Ringkasan Belanja</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-muted-foreground flex justify-between text-sm">
                                        <span>Total Produk</span>
                                        <span>{selectedItems.size} item</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-lg font-semibold">
                                        <h1 className="text-md">Total Harga</h1>
                                        <span className="text-primary">{formatCurrency(selectedTotal)}</span>
                                    </div>
                                    <Button className="mt-4 w-full py-6 text-sm">
                                        Lanjut Ke Pembayaran
                                        <Icon icon={'heroicons:arrow-right'} className="text-background" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="fixed bottom-0 left-0 z-50 mb-21 w-full border-t bg-white px-4 py-4 shadow-md md:hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm dark:text-black">{selectedItems.size} Menu dipilih</p>
                                    <p className="text-lg font-semibold dark:text-black">{formatCurrency(selectedTotal)}</p>
                                </div>
                                <Button className="cursor-pointer px-6 py-5 text-sm shadow-none dark:bg-black dark:text-white">
                                    Lanjut Ke Pembayaran
                                    <Icon icon={'heroicons:arrow-right'} className="dark:text-white" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CustomerLayout>
        </>
    );
}
