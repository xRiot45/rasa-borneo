import CustomerLayout from '@/layouts/customer/layout';
import { Head } from '@inertiajs/react';

export default function CartPage() {
    return (
        <>
            <CustomerLayout>
                <Head title="Keranjang" />
                <h1>Keranjang</h1>
            </CustomerLayout>
        </>
    );
}
