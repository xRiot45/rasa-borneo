import MerchantLayout from '@/layouts/merchant/layout';
import { Coupon } from '@/models/coupon';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';
import CouponTable from './partials/table';
import { columns } from './partials/table/columns';

interface Props {
    data: Coupon[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Promosi',
        href: '#',
    },
    {
        title: 'Kupon',
        href: '/admin/promotion-management/coupons',
    },
];

export default function CouponPage({ data }: Props) {
    console.log(data);

    return (
        <>
            <Head title="Kupon" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Kupon</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data semua kupon anda</p>
                    </div>

                    <ButtonPartials />
                </div>

                <div className="p-4">
                    <CouponTable data={data} columns={columns} />
                </div>
            </MerchantLayout>
        </>
    );
}
