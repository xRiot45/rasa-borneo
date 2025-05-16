import { Customer } from './customer';
import { MenuItem } from './menu-item';

export interface Wishlist {
    length: number;
    id: number;
    customer_id: number;
    menu_item_id: number;
    customer: Customer;
    menu_item: MenuItem;
}
