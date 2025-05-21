import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Transaction } from '@/models/transactions';
import { formatCurrency } from '@/utils/format-currency';

interface Props {
    transaction: Transaction;
}

const CheckoutMenuList: React.FC<Props> = ({ transaction }) => {
    return (
        <main className="mt-2 space-y-4">
            <div className="mb-4">
                <h1 className="text-lg font-semibold">Menu Yang Dipesan</h1>
                <p className="text-muted-foreground text-sm font-medium">Total Menu : {transaction.transaction_items?.length}</p>
            </div>
            {transaction.transaction_items?.map((item) => (
                <Card key={item.id} className="px-2 shadow-none">
                    <CardContent className="flex items-center gap-4 p-4">
                        <img src={item.menu_item_image_url} alt={item.menu_item_name} className="h-20 w-20 rounded-lg border object-cover" />
                        <div className="flex w-full items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold">{item.menu_item_name}</h3>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-200">Jumlah : {item.quantity}</p>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-200">{formatCurrency(item.menu_item_price)} / Menu</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <Badge className="rounded-sm bg-gray-200 text-black">{item?.menu_item_category}</Badge>
                                <p className="text-md mt-4 font-bold">{formatCurrency(item?.menu_item_price * item.quantity)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </main>
    );
};

export default CheckoutMenuList;
