import LithiumLayoutTemplate from '@/layouts/customer/layouts/lithium-layout/index';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface CustomerLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function CustomerLayout({ children, breadcrumbs, ...props }: CustomerLayoutProps) {
    return (
        <LithiumLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </LithiumLayoutTemplate>
    );
}
