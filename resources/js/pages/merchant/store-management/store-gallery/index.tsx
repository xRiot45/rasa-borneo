import MerchantLayout from '@/layouts/merchant/layout';
import { StoreGallery as StoreGalleryModel } from '@/models/store-management/store-gallery';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ButtonPartials from './partials/buttons';
import StoreGalleryTable from './partials/table';
import { columns } from './partials/table/columns';

interface StoreGalleryPageProps {
    data: StoreGalleryModel[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Toko',
        href: '#',
    },
    {
        title: 'Galeri Toko',
        href: '/admin/store-management/store-gallery',
    },
];

export default function StoreGallery({ data }: StoreGalleryPageProps) {
    return (
        <>
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <Head title="Galeri Toko" />
                <div className="mb-2 flex flex-wrap justify-between space-y-2 p-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Galeri Toko</h2>
                        <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola galeri toko anda di sini</p>
                    </div>

                    <ButtonPartials />
                </div>

                <div className="p-4">
                    <StoreGalleryTable data={data} columns={columns} />
                </div>
            </MerchantLayout>
        </>
    );
}
