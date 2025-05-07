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
                href: '/merchant/menu-categories',
                icon: 'material-symbols:category',
            },
            {
                title: 'Menu',
                href: '/merchant/menu-items',
                icon: 'ic:baseline-restaurant-menu',
            },
        ],
    },
    {
        group: 'PEMESANAN',
        items: [
            {
                title: 'Pesanan Masuk',
                href: '/merchant/orders',
                icon: 'mdi:order-bool-descending',
            },
            {
                title: 'Riwayat Transaksi',
                href: '/merchant/transactions',
                icon: 'mdi:history',
            },
        ],
    },
    {
        group: 'TOKO',
        items: [
            {
                title: 'Profil Toko',
                href: '/merchant/store-profile',
                icon: 'mdi:store-settings',
            },
            {
                title: 'Promo & Diskon',
                href: '/merchant/promotions',
                icon: 'mdi:tag-multiple',
            },
            // {
            //     title: 'Pengaturan Pengiriman',
            //     href: '/merchant/delivery-settings',
            //     icon: 'mdi:truck-delivery',
            // },
        ],
    },
    {
        group: 'INTERAKSI PELANGGAN',
        items: [
            {
                title: 'Ulasan Pelanggan',
                href: '/merchant/reviews',
                icon: 'mdi:star-circle',
            },
            {
                title: 'Pesan Masuk',
                href: '/merchant/messages',
                icon: 'mdi:chat',
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
            // {
            //     title: 'Pengaturan Notifikasi',
            //     href: '/merchant/notification-settings',
            //     icon: 'mdi:bell-ring',
            // },
            {
                title: 'Laporan & Analitik',
                href: '/merchant/reports',
                icon: 'mdi:chart-line',
            },
            // {
            //     title: 'Manajemen Karyawan',
            //     href: '/merchant/employees',
            //     icon: 'mdi:account-group',
            // },
            {
                title: 'Keamanan & Privasi',
                href: '/merchant/security',
                icon: 'mdi:shield-lock',
            },
        ],
    },
];

export default mainNavItems;
