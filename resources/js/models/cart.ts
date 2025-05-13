import { Customer } from './customer';
import { MenuItem } from './menu-item';
import { Merchant } from './merchant';

export interface Carts {
    id: number;
    merchant_id?: number | null;
    customer_id?: number | null;
    menu_item: MenuItem[];
    menu_item_id: number;
    quantity: number;
    unit_price: number;
    created_at?: string;
    updated_at?: string;

    customer: Customer;
    merchant: Merchant;
}
