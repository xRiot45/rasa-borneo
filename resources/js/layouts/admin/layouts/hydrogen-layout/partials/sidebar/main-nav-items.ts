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
            // {
            //     title: 'Permissions / Izin',
            //     href: '/admin/manajemen-kontrol-akses/permissions',
            //     icon: 'material-symbols:security',
            // },
            // {
            //     title: 'Kelola Izin Peran',
            //     href: '/admin/manajemen-kontrol-akses/manage-role-permissions',
            //     icon: 'material-symbols:manage-accounts-outline-rounded',
            // },
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
                title: 'Customer / Pelanggan',
                href: '/admin/users-management/customers',
                icon: 'carbon:customer',
            },
            {
                title: 'Merchant / Penjual',
                href: '/admin/users-management/merchants',
                icon: 'material-symbols:storefront',
            },
            {
                title: 'Courier / Kurir',
                href: '/admin/users-management/couriers',
                icon: 'material-symbols:local-shipping',
            },
        ],
    },
    {
        group: 'INTERAKSI PELANGGAN',
        items: [
            {
                title: 'Ulasan Menu',
                href: '/admin/customer-interaction/menu-review',
                icon: 'mdi:star-circle',
            },
            {
                title: 'Ulasan Toko',
                href: '/admin/customer-interaction/merchant-review',
                icon: 'hugeicons:store-verified-02',
            },
        ],
    },
    {
        group: 'KEUANGAN',
        items: [
            {
                title: 'Penarikan Dana',
                href: '/admin/financial-management/withdraw',
                icon: 'mdi:cash-minus',
            },
            // (opsional di masa depan) bisa tambahkan:
            // {
            //     title: 'Deposit',
            //     href: '/admin/deposits',
            //     icon: 'mdi:cash-plus',
            // },
            // {
            //     title: 'Transaksi Keuangan',
            //     href: '/admin/transactions',
            //     icon: 'mdi:swap-horizontal',
            // },
        ],
    },
    {
        group: 'PENGATURAN',
        items: [
            {
                title: 'Pengaturan Sistem',
                href: '/admin/system-settings',
                icon: 'mdi:settings',
            },
            // {
            //     title: 'Pengaturan Pembayaran',
            //     href: '/admin/payment-settings',
            //     icon: 'mdi:credit-card-check',
            // },
            // {
            //     title: 'Keamanan & Privasi',
            //     href: '/admin/security-privacy',
            //     icon: 'mdi:shield-lock',
            // },
            // {
            //     title: 'Pengaturan Notifikasi & Email',
            //     href: '/admin/notification-settings',
            //     icon: 'mdi:bell-ring',
            // },
            // {
            //     title: 'Manajemen Konten',
            //     href: '/admin/content-management',
            //     icon: 'mdi:folder-edit',
            // },
            {
                title: 'Pengaturan Tarif',
                href: '/admin/discount-settings',
                icon: 'mdi:tag-multiple',
            },
            // {
            //     title: 'Log Aktivitas',
            //     href: '/admin/activity-log',
            //     icon: 'mdi:history',
            // },
            {
                title: 'Backup & Pemulihan Data',
                href: '/admin/data-backup',
                icon: 'mdi:database-refresh',
            },
        ],
    },
];

export default mainNavItems;
