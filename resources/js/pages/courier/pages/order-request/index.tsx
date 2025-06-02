import CourierLayout from '@/layouts/courier/layout';
import { Head } from '@inertiajs/react';

export default function OrderRequestPage() {
    return (
        <>
            <Head title="Permintaan Pesanan" />
            <CourierLayout>
                <h1>Permintaan Pesanan</h1>
            </CourierLayout>
        </>
    );
}
