import CourierLayout from '@/layouts/courier/layout';
import { Head } from '@inertiajs/react';

export default function CourierPage() {
    return (
        <>
            <Head title="Beranda" />
            <CourierLayout>
                <h1 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Courier</h1>
            </CourierLayout>
        </>
    );
}
