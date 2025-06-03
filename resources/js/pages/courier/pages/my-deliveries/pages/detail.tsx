import CourierLayout from '@/layouts/courier/layout';
import { Head } from '@inertiajs/react';

export default function MyDeliveriesDetailPage() {
    return (
        <>
            <Head title="Detail Pengantaran" />
            <CourierLayout>
                <main className="mt-22">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Detail Pengantaran</h2>
                            <p className="text-muted-foreground text-sm">Lihat detail pesanan yang sedang kamu antar ke pelanggan.</p>
                        </div>
                    </div>
                </main>
            </CourierLayout>
        </>
    );
}
