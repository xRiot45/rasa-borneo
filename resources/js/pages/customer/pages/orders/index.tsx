import CustomerLayout from '@/layouts/customer/layout';
import { Order } from '@/models/order';
import { Head } from '@inertiajs/react';
import OrdersTabs from './components/orders-tab';

interface Props {
    checkedOutOrders: Order[];
    notCheckedOutOrders: Order[];
}

export default function OrdersPage({ checkedOutOrders, notCheckedOutOrders }: Props) {
    return (
        <>
            <Head title="Pesanan Saya" />
            <CustomerLayout>
                <main className="mt-22">
                    <div className="mb-5">
                        <h2 className="text-lg font-bold">Pesanan Saya</h2>
                        <p className="text-muted-foreground text-sm">Daftar pesanan saya yang sudah diselesaikan & belum diselesaikan</p>
                    </div>

                    <div className="mt-10">
                        <OrdersTabs checkedOutOrders={checkedOutOrders} notCheckedOutOrders={notCheckedOutOrders} />
                    </div>
                </main>
            </CustomerLayout>
        </>
    );
}
