import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import LithiumLayoutTemplate from './layouts/lithium-layout';

interface CourierLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function CourierLayout({ children, breadcrumbs, ...props }: CourierLayoutProps) {
    return (
        <LithiumLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </LithiumLayoutTemplate>
    );
}
