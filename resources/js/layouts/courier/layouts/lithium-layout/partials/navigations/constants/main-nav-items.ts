import { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Beranda',
        href: '/courier/home',
        icon: 'material-symbols:home',
    },
    {
        title: 'Permintaan Pengantaran',
        href: '/courier/delivery-requests',
        icon: 'material-symbols:inbox',
    },
    {
        title: 'Pengantaran Saya',
        href: '/courier/my-deliveries',
        icon: 'mdi:truck-delivery-outline',
    },
    {
        title: 'Riwayat Pengantaran',
        href: '/courier/delivery-history',
        icon: 'material-symbols:check-circle-rounded',
    },
];

export default mainNavItems;
