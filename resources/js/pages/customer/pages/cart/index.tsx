import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CustomerLayout from '@/layouts/customer/layout';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';
import { Minus, Plus, Trash2 } from 'lucide-react';

const mockCart = [
    {
        merchant: 'Domoro',
        items: [
            { id: 1, name: 'Nasi Goreng Spesial', price: 25000, quantity: 1 },
            { id: 2, name: 'Teh Manis', price: 5000, quantity: 2 },
        ],
    },
    {
        merchant: 'Ayam Bakar Madu',
        items: [{ id: 3, name: 'Ayam Bakar + Nasi', price: 30000, quantity: 1 }],
    },
];

export default function CartPage() {
    const total = mockCart.flatMap((group) => group.items).reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleIncrease = (id: number) => {
        console.log(id);
    };
    const handleDecrease = (id: number) => {
        console.log(id);
    };
    const handleRemove = (id: number) => {
        console.log(id);
    };

    return (
        <>
            <Head title="Keranjang" />
            <CustomerLayout>
                <div className="mt-22 w-full">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-12">
                        {/* Cart Items */}
                        <div className="space-y-4 lg:col-span-8">
                            <div className="mb-5">
                                <h2 className="text-lg font-bold">Keranjang</h2>
                                <p className="text-muted-foreground text-sm">Daftar menu yang ada di dalam keranjang</p>
                            </div>

                            {mockCart.map((group) => (
                                <div key={group.merchant} className="space-y-4 rounded-xl border bg-white px-6 py-5">
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-lg font-bold text-gray-800">{group.merchant}</h1>
                                        <span className="text-muted-foreground text-sm">{group.items.length} produk</span>
                                    </div>
                                    {/* <Separator /> */}
                                    <div className="grid gap-6">
                                        {group.items.map((item) => (
                                            <Card key={item.id} className="rounded-xl border-none shadow-none">
                                                <Separator />
                                                <CardContent className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                                    <div className="flex items-start gap-4 sm:items-center sm:gap-6">
                                                        <img
                                                            src={`https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                                                            alt={item.name}
                                                            className="h-16 w-16 rounded-lg object-cover"
                                                        />
                                                        <div>
                                                            <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                            <div className="mt-2 flex items-center gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="h-8 w-8"
                                                                    onClick={() => handleDecrease(item.id)}
                                                                >
                                                                    <Minus className="h-4 w-4" />
                                                                </Button>
                                                                <span className="min-w-[24px] text-center text-sm font-medium">{item.quantity}</span>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="h-8 w-8"
                                                                    onClick={() => handleIncrease(item.id)}
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-4">
                                                        <p className="text-primary text-lg font-bold">
                                                            Rp{(item.price * item.quantity).toLocaleString()}
                                                        </p>
                                                        <Button variant="ghost" size="icon" onClick={() => handleRemove(item.id)}>
                                                            <Trash2 className="h-5 w-5 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Checkout Summary */}
                        <div className="lg:col-span-4 lg:mt-16.5">
                            <Card className="sticky top-1 rounded-xl py-8 shadow-none">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold">Ringkasan Belanja</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-muted-foreground flex justify-between text-sm">
                                        <span>Total Produk</span>
                                        <span>{mockCart.flatMap((g) => g.items).length} item</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span className="text-primary">Rp{total.toLocaleString()}</span>
                                    </div>
                                    <Button className="mt-4 w-full py-6 text-sm">
                                        Lanjut Ke Pembayaran
                                        <Icon icon={'heroicons:arrow-right'} className="text-background" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </CustomerLayout>
        </>
    );
}
