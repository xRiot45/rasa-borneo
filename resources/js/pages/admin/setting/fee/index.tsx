import AdminLayout from '@/layouts/admin/layout';
import { FeeItem } from '@/models/fee';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';
import FeesTable from './partials/table';
import { columns } from './partials/table/columns';

interface Props {
    fees: FeeItem;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan',
        href: '#',
    },
    {
        title: 'Pengaturan Biaya',
        href: '/admin/setting/fee',
    },
];

export default function FeePage({ fees }: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const feeArray: FeeItem[] = Object.entries(fees).map(([_, value]) => ({
        id: value.id,
        type: value.type,
        amount: value.amount,
    }));

    return (
        <>
            <Head title="Biaya" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Daftar Biaya</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola data biaya untuk aplikasi anda.</p>
                    </div>
                    <ButtonPartials />
                </div>

                <div className="p-4">
                    <FeesTable data={feeArray} columns={columns} />
                </div>
            </AdminLayout>
        </>
    );
}
