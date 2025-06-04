import EmptyData from '@/components/empty-img';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import CustomerLayout from '@/layouts/customer/layout';
import { MenuItem } from '@/models/menu-item';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import CardMenuItem from '../../components/card-menu-items';

interface Props {
    data: MenuItem[];
}

export default function MenuPage({ data }: Props) {
    const [search, setSearch] = useState<string>('');
    const [recommendedOnly, setRecommendedOnly] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<string>('asc');

    const [tempSearch, setTempSearch] = useState<string>('');
    const [tempRecommendedOnly, setTempRecommendedOnly] = useState<boolean>(false);
    const [tempSortOrder, setTempSortOrder] = useState<string>('asc');

    const applyFilters = () => {
        setSearch(tempSearch);
        setRecommendedOnly(tempRecommendedOnly);
        setSortOrder(tempSortOrder);
    };

    const resetFilters = () => {
        setSearch('');
        setRecommendedOnly(false);
        setSortOrder('asc');
    };

    const filteredItems = data
        .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        .filter((item) => (recommendedOnly ? item.is_recommended === 1 : true))
        .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

    const noFilteredItems = filteredItems.length === 0;

    return (
        <>
            <Head title="Menu" />
            <CustomerLayout>
                <section className="mx-auto mt-22 w-full max-w-screen-xl">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Menu Tersedia</h2>
                            <p className="text-muted-foreground text-sm">Daftar menu yang tersedia</p>
                        </div>

                        <Dialog>
                            <DialogTrigger>
                                <Button variant="outline" className="cursor-pointer">
                                    Filter Menu
                                    <Icon icon="mage:filter" className="ml-2" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-xl">
                                <DialogHeader>
                                    <DialogTitle>Filter Menu</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-6 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="search">Nama Menu</Label>
                                        <Input
                                            placeholder="Cari nama menu ..."
                                            className="rounded-lg py-6 shadow-none"
                                            value={tempSearch}
                                            onChange={(e) => setTempSearch(e.target.value)}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="sort">Urutkan Berdasarkan</Label>
                                        <Select value={tempSortOrder} onValueChange={setTempSortOrder}>
                                            <SelectTrigger className="rounded-lg py-6 shadow-none">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="asc" className="cursor-pointer p-4 hover:bg-gray-100">
                                                    Harga Termurah
                                                </SelectItem>
                                                <SelectItem value="desc" className="cursor-pointer p-4 hover:bg-gray-100">
                                                    Harga Termahal
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch checked={tempRecommendedOnly} onCheckedChange={setTempRecommendedOnly} />
                                        <Label>Hanya Menu Yang Direkomendasi</Label>
                                    </div>
                                </div>
                                <DialogFooter className="sm:flex-col">
                                    <DialogTrigger asChild>
                                        <Button type="button" onClick={applyFilters} className="w-full cursor-pointer py-6">
                                            Terapkan Filter
                                            <Icon icon="material-symbols:check" className="ml-2" />
                                        </Button>
                                    </DialogTrigger>

                                    <DialogTrigger asChild>
                                        <Button type="button" variant="destructive" onClick={resetFilters} className="w-full cursor-pointer py-6">
                                            Reset Filter
                                            <Icon icon="bx:reset" className="ml-2" />
                                        </Button>
                                    </DialogTrigger>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {noFilteredItems ? (
                        <EmptyData title="Tidak Ada Menu" description="Menu tidak tersedia untuk saat ini, silahkan kembali beberapa saat lagi" />
                    ) : (
                        <CardMenuItem data={filteredItems} />
                    )}
                </section>
            </CustomerLayout>
        </>
    );
}
