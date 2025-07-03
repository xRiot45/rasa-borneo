import AdminLayout from '@/layouts/admin/layout';
import { MerchantReview } from '@/models/merchant/customer_interaction';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';
import MerchantReviewTable from './partials/table';
import { columns } from './partials/table/columns';

interface Props {
    merchantReviews: MerchantReview[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Interaksi Pelanggan',
        href: '#',
    },
    {
        title: 'Ulasan Toko',
        href: '/merchant/customer-interaction/merchant-review',
    },
];

export default function MerchantReviewPage({ merchantReviews }: Props) {
    return (
        <>
            <Head title="Ulasan Toko" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Ulasan Toko</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua ulasan toko yang telah diberikan</p>
                    </div>
                    <ButtonPartials />
                </div>

                <div className="p-4">
                    <MerchantReviewTable data={merchantReviews} columns={columns} />
                </div>
            </AdminLayout>
        </>
    );
}
