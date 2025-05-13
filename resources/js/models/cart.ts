import { MenuItem } from './menu-item';

export interface CartItem {
    id: number;
    quantity: number;
    unit_price: number;
    menu_item: MenuItem;
}

export interface CartGroup {
    merchant_id: number;
    merchant_name: string;
    merchant_slug: string;
    merchant_phone: string;
    merchant_logo_photo: string;
    merchant_category: string;
    items: CartItem[];
}
