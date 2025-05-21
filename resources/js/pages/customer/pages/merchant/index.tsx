import EmptyImage from '@/assets/errors/empty.svg';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CustomerLayout from '@/layouts/customer/layout';
import { BusinessCategory } from '@/models/business-category';
import { Merchant } from '@/models/merchant';
import { Icon } from '@iconify/react';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import CardMerchant from '../../components/card-merchants';

interface Props {
    data: Merchant[];
}

export default function MerchantPage({ data }: Props) {
    const { businessCategories } = usePage<{ businessCategories: BusinessCategory[] }>().props;
    const [search, setSearch] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const [tempSearch, setTempSearch] = useState<string>('');
    const [tempCategory, setTempCategory] = useState<string>('');

    const applyFilters = () => {
        setSearch(tempSearch);
        setCategory(tempCategory);
    };

    const resetFilters = () => {
        setSearch('');
        setCategory('');
    };

    const filteredItems = data
        .filter((item) => item.business_name.toLowerCase().includes(search.toLowerCase()))
        .filter((item) => (category ? item.business_category_id.toString() === category : true));

    const noFilteredItems = filteredItems.length === 0;

    return (
        <>
            <Head title="Penjual" />
            <CustomerLayout>
                <main className="mt-22">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Merchant Terdaftar</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Daftar mitra bisnis yang telah diverifikasi</p>
                        </div>

                        <Dialog>
                            <DialogTrigger>
                                <Button variant="outline" className="cursor-pointer">
                                    Filter Merchant
                                    <Icon icon="mage:filter" className="ml-2" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-xl">
                                <DialogHeader>
                                    <DialogTitle>Filter Merchant</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-6 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="search">Nama Merchant</Label>
                                        <Input
                                            placeholder="Cari nama merchant ..."
                                            className="rounded-lg py-6 shadow-none"
                                            value={tempSearch}
                                            onChange={(e) => setTempSearch(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="category">Kategori</Label>
                                        <Select value={tempCategory} onValueChange={setTempCategory}>
                                            <SelectTrigger className="rounded-lg py-6 shadow-none">
                                                <SelectValue placeholder="Pilih Kategori Bisnis" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {businessCategories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id.toString()}
                                                        className="cursor-pointer p-4 hover:bg-gray-100"
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                        <div className="flex flex-col">
                            <div className="flex grow items-center px-6 xl:px-10">
                                <div className="mx-auto text-center">
                                    <img src={EmptyImage} alt="Error" className="mx-auto mb-8 w-full max-w-lg lg:mb-12 2xl:mb-16" />
                                    <h1 className="text-[22px] font-bold text-gray-700 dark:text-gray-100">Tidak Ada Merchant / Penjual</h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Penjual tidak tersedia untuk saat ini, silahkan kembali beberapa saat lagi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <CardMerchant data={data} />
                    )}
                </main>
            </CustomerLayout>
        </>
    );
}
