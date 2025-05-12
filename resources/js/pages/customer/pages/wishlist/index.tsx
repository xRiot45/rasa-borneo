import CustomerLayout from '@/layouts/customer/layout';
import { Head } from '@inertiajs/react';

export default function WishlistPage() {
    return (
        <>
            <Head title="Wishlist" />
            <CustomerLayout>
                <h1>Wishlist</h1>
            </CustomerLayout>
        </>
    );
}
