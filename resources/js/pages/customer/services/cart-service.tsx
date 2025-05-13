import { MenuItem } from '@/models/menu-item';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export const useCartService = () => {
    const addMenuToCart = (item: MenuItem) => {
        const newCartItem = {
            menu_item_id: item?.id,
            quantity: 1,
            unit_price: item?.price,
        };

        router.post(route('cart.store'), newCartItem, {
            onSuccess: () => {
                toast.success('Success', {
                    description: 'Menu berhasil ditambahkan ke keranjang',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
            },
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    toast.error('Error', {
                        description: errors[key],
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                });
            },
        });
    };

    return {
        addMenuToCart,
    };
};
