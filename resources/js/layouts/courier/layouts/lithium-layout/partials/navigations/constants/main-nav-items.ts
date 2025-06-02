import { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Beranda',
        href: '/courier/home',
        icon: 'material-symbols:home',
    },
    {
        title: 'Permintaan Pengantaran',
        href: '/courier/orders-requests',
        icon: 'material-symbols:inbox',
    },
    {
        title: 'Pengantaran Aktif',
        href: '/courier/running-orders',
        icon: 'mdi:truck-delivery-outline',
    },
    {
        title: 'Riwayat Pengantaran',
        href: '/courier/delivery-history',
        icon: 'material-symbols:check-circle-rounded',
    },
];

export default mainNavItems;
