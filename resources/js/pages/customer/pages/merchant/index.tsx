import CustomerLayout from '@/layouts/customer/layout';
import { Merchant } from '@/models/merchant';
import { Head } from '@inertiajs/react';
import CardMerchant from '../../components/card-merchants';

interface Props {
    data: Merchant[];
}

export default function MerchantPage({ data }: Props) {
    return (
        <>
            <Head title="Penjual" />
            <CustomerLayout>
                <section className="mt-22">
                    <div className="mb-6">
                        <h2 className="text-lg font-bold">Merchant Terdaftar</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Daftar mitra bisnis yang telah diverifikasi</p>
                    </div>

                    <CardMerchant data={data} />
                </section>
            </CustomerLayout>
        </>
    );
}
