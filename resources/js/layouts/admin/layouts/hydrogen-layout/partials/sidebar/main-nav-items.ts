import { NavGroup } from '@/types';

const mainNavItems: NavGroup[] = [
    {
        group: 'DASHBOARD',
        items: [
            {
                title: 'Dashboard',
                href: '/admin/dashboard',
                icon: 'material-symbols:dashboard',
            },
        ],
    },
    {
        group: 'MASTER DATA',
        items: [
            {
                title: 'Kategori Bisnis',
                href: '/admin/master-data/business-categories',
                icon: 'material-symbols:category',
            },
        ],
    },
    {
        group: 'MANAJEMEN KONTROL AKSES',
        items: [
            {
                title: 'Roles / Peran',
                href: '/admin/manajemen-kontrol-akses/roles',
                icon: 'eos-icons:role-binding',
            },
            {
                title: 'Permissions / Izin',
                href: '/admin/manajemen-kontrol-akses/permissions',
                icon: 'material-symbols:security',
            },
            {
                title: 'Kelola Izin Peran',
                href: '/admin/manajemen-kontrol-akses/manage-role-permissions',
                icon: 'material-symbols:manage-accounts-outline-rounded',
            },
        ],
    },
    {
        group: 'MANAJEMEN PENGGUNA',
        items: [
            {
                title: 'Semua Pengguna',
                href: '/admin/users-management/all-users',
                icon: 'la:users',
            },
            {
                title: 'Customer',
                href: '/admin/users-management/customers',
                icon: 'carbon:customer',
            },
            {
                title: 'Merchant',
                href: '/admin/users-management/merchants',
                icon: 'material-symbols:storefront',
            },
        ],
    },
];

export default mainNavItems;
