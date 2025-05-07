import HydrogenLayoutTemplate from '@/layouts/merchant/layouts/hydrogen-layout/layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface MerchantLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function MerchantLayout({ children, breadcrumbs, ...props }: MerchantLayoutProps) {
    return (
        <HydrogenLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </HydrogenLayoutTemplate>
    );
}
