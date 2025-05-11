import { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Beranda',
        href: '/',
        icon: 'material-symbols:home',
    },
    {
        title: 'Menu',
        href: '/menu',
        icon: 'ic:baseline-restaurant-menu',
    },
    {
        title: 'Penjual',
        href: '/merchants',
        icon: 'material-symbols:storefront',
    },
    // {
    //     title: 'Promo',
    //     href: '/promo',
    //     icon: 'bxs:offer',
    // },
];

export default mainNavItems;
