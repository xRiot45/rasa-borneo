import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/merchant/dashboard',
    },
];

export default function DashboardPage() {
    return (
        <>
            <MerchantLayout breadcrumbs={breadcrumbs}>Merchant</MerchantLayout>
        </>
    );
}
