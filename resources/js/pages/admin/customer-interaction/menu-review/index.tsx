import AdminLayout from '@/layouts/admin/layout';
import { MenuReview } from '@/models/merchant/customer_interaction';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';
import MenuReviewTable from './partials/table';
import { columns } from './partials/table/columns';

interface Props {
    menuReviews: MenuReview[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Interaksi Pelanggan',
        href: '#',
    },
    {
        title: 'Ulasan Menu',
        href: '/merchant/customer-interaction/menu-review',
    },
];

export default function MenuReviewPage({ menuReviews }: Props) {
    return (
        <>
            <Head title="Menu Review" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Ulasan Menu</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua ulasan menu yang telah diberikan</p>
                    </div>
                    <ButtonPartials />
                </div>

                <div className="p-4">
                    <MenuReviewTable data={menuReviews} columns={columns} />
                </div>
            </AdminLayout>
        </>
    );
}
