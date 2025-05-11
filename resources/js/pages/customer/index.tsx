import CustomerLayout from '@/layouts/customer/layout';
import { Head } from '@inertiajs/react';

export default function HomePage() {
    return (
        <>
            <CustomerLayout>
                Homepage
                <Head title="Beranda" />
            </CustomerLayout>
        </>
    );
}
