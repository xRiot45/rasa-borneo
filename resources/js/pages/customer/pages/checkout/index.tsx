import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import CustomerLayout from '@/layouts/customer/layout';
import { Coupon } from '@/models/coupon';
import { Transaction } from '@/models/transactions';
import { formatCurrency } from '@/utils/format-currency';
import { Head } from '@inertiajs/react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface Props {
    transaction: Transaction;
    coupons: Coupon[];
}

export default function CheckoutPage({ transaction, coupons }: Props) {
    console.log('Coupon', coupons);
    console.log('Transaction', transaction);
    return (
        <>
            <Head title="Checkout" />
            <CustomerLayout>
                <main className="mt-22">
                    <div>
                        <h2 className="text-lg font-bold">Checkout Pesanan</h2>
                        <p className="text-muted-foreground text-sm">
                            Tinjau pesanan anda dan pilih metode pembayaran serta metode pemesanan yang sesuai
                        </p>
                    </div>

                    <Alert variant="destructive" className="mt-8 rounded-lg py-6">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle className="mt-[-4px] text-lg">Perhatian</AlertTitle>
                        <AlertDescription>
                            Jika sudah menyelesaikan pesanan maka pesanan tidak dapat dilakukan refund kembali, harap cek dengan baik pesanan anda
                            sebelum menyelesaikan pesanan.
                        </AlertDescription>
                    </Alert>

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
                        <div className="col-span-2 space-y-8">
                            <div className="mt-2 space-y-4">
                                <h1 className="mb-4 text-lg font-semibold">Menu Yang Dipesan</h1>
                                {transaction.transaction_items?.map((item) => (
                                    <Card key={item.id} className="px-2 shadow-none">
                                        <CardContent className="flex items-center gap-4 p-4">
                                            <img
                                                src={item.menu_item_image_url}
                                                alt={item.menu_item_name}
                                                className="h-20 w-20 rounded-lg border object-cover"
                                            />
                                            <div className="flex w-full items-center justify-between">
                                                <div className="space-y-1">
                                                    <h3 className="text-lg font-semibold">{item.menu_item_name}</h3>
                                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-200">Jumlah : {item.quantity}</p>
                                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                                        {formatCurrency(item.menu_item_price)} / Menu
                                                    </p>
                                                </div>
                                                <div>
                                                    <Badge className="rounded-sm bg-gray-200 text-black">{item.menu_item_category}</Badge>
                                                    <p className="text-md mt-1 font-bold">{formatCurrency(item.menu_item_price * item.quantity)}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </CustomerLayout>
        </>
    );
}
