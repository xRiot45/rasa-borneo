import { Customer } from '@/models/customer';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    group: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon: string;
    isActive?: boolean;
    submenu?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    full_name: string;
    email: string;
    email_verified_at: string | null;
    phone_number: string;
    created_at: string;
    updated_at: string;
    customer?: Customer;
    roles: string[];
    [key: string]: unknown;
}
