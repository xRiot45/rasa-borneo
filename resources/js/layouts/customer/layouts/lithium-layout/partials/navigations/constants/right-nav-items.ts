import { NavItem } from '@/types';

const rightNavItems: NavItem[] = [
    {
        title: 'Keranjang',
        href: '/cart',
        icon: 'mdi:cart-outline',
    },
    {
        title: 'Wishlist',
        href: '/wishlist',
        icon: 'material-symbols:favorite-outline',
    },
    {
        title: 'Notifikasi',
        href: '/notifications',
        icon: 'mdi:bell-outline',
    },
    // {
    //     title: 'Bantuan',
    //     href: '/help',
    //     icon: 'mdi:chat-question-outline',
    // },
];

export default rightNavItems;
