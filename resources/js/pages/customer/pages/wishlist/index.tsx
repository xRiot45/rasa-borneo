import CustomerLayout from '@/layouts/customer/layout';
import { Head } from '@inertiajs/react';

export default function WishlistPage() {
    return (
        <>
            <CustomerLayout>
                <Head title="Wishlist" />
                <h1>Wishlist</h1>
            </CustomerLayout>
        </>
    );
}
