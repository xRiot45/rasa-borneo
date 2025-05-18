import CustomerLayout from '@/layouts/customer/layout';
import { Head } from '@inertiajs/react';

export default function CheckoutPage() {
    return (
        <>
            <Head title="Checkout" />
            <CustomerLayout>
                <h1>Checkout page</h1>
            </CustomerLayout>
        </>
    );
}
