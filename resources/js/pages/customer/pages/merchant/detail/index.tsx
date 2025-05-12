import CustomerLayout from '@/layouts/customer/layout';
import { Head } from '@inertiajs/react';

export default function MerchantDetailPage() {
    return (
        <>
            <Head title="Detail Penjual" />
            <CustomerLayout>
                <h1>Merchant Detail</h1>
            </CustomerLayout>
        </>
    );
}
