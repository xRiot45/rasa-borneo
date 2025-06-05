import { NavGroup } from '@/types';

const mainNavItems: NavGroup[] = [
    {
        group: 'DASHBOARD',
        items: [
            {
                title: 'Dashboard',
                href: '/merchant/dashboard',
                icon: 'material-symbols:dashboard',
            },
        ],
    },
    {
        group: 'MANAJEMEN MENU',
        items: [
            {
                title: 'Kategori Menu',
                href: '/merchant/menu-management/menu-categories',
                icon: 'material-symbols:category',
            },
            {
                title: 'Menu',
                href: '/merchant/menu-management/menu-items',
                icon: 'ic:baseline-restaurant-menu',
            },
        ],
    },
    {
        group: 'MANAJEMEN PESANAN',
        items: [
            {
                title: 'Pesanan Masuk',
                href: '/merchant/order-management/incoming-order',
                icon: 'mdi:order-bool-descending',
            },
            {
                title: 'Riwayat Pesanan',
                href: '/merchant/order-management/order-history',
                icon: 'mdi:history',
            },
        ],
    },
    {
        group: 'TOKO',
        items: [
            {
                title: 'Profile Toko',
                href: '/merchant/store-management/store-profile',
                icon: 'mdi:store-settings',
            },
            {
                title: 'Galeri Toko',
                href: '/merchant/store-management/store-gallery',
                icon: 'mdi:image-multiple',
            },
            {
                title: 'Jam Operasi Toko',
                href: '/merchant/store-management/store-operating-hour',
                icon: 'mdi:clock',
            },
            {
                title: 'Meja',
                href: '/merchant/store-management/table',
                icon: 'mdi:table-chair',
            },
        ],
    },
    {
        group: 'PROMOSI',
        items: [
            {
                title: 'Kupon',
                href: '/merchant/promotion-management/coupons',
                icon: 'mdi:ticket-percent',
            },
        ],
    },
    {
        group: 'MANAJEMEN KEUANGAN',
        items: [
            {
                title: 'Penarikan Dana',
                href: '/merchant/financial-management/withdraw',
                icon: 'mdi:cash-multiple',
            },
            {
                title: 'Laporan Pendapatan',
                href: '/merchant/financial-management/revenue-report',
                icon: 'mdi:chart-bar',
            },
            {
                title: 'Laporan Pengeluaran',
                icon: 'mdi:cash-remove',
                href: '#',
                submenu: [
                    {
                        title: 'Daftar Laporan',
                        href: '/merchant/financial-management/expense-report',
                        icon: 'mdi:file-document-outline',
                    },
                    {
                        title: 'Kategori Pengeluaran',
                        href: '/merchant/financial-management/expense-report-category',
                        icon: 'mdi:shape-outline',
                    },
                ],
            },
            {
                title: 'Laporan Laba',
                href: '/merchant/financial-management/profit-report',
                icon: 'mdi:finance',
            },
        ],
    },
    {
        group: 'INTERAKSI PELANGGAN',
        items: [
            {
                title: 'Ulasan Menu',
                href: '/merchant/customer-interaction/menu-review',
                icon: 'mdi:star-circle',
            },
            {
                title: 'Ulasan Toko',
                href: '/merchant/customer-interaction/merchant-review',
                icon: 'hugeicons:store-verified-02',
            },
        ],
    },
    {
        group: 'PENGATURAN',
        items: [
            {
                title: 'Pengaturan Akun',
                href: '/merchant/account-settings',
                icon: 'mdi:account-cog',
            },
            {
                title: 'Pengaturan Notifikasi',
                href: '/merchant/notification-settings',
                icon: 'mdi:bell-ring',
            },
            {
                title: 'Laporan & Analitik',
                href: '/merchant/reports',
                icon: 'mdi:chart-line',
            },
            {
                title: 'Manajemen Karyawan',
                href: '/merchant/employees',
                icon: 'mdi:account-group',
            },
            {
                title: 'Keamanan & Privasi',
                href: '/merchant/security',
                icon: 'mdi:shield-lock',
            },
        ],
    },
];

export default mainNavItems;
