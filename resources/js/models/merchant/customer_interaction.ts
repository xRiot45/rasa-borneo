import { Customer } from '../customer';
import { MenuItem } from '../menu-item';

export interface MenuReview {
    id: number;
    comment: string;
    rating: number;
    menu_item: MenuItem;
    customer: Customer;
    created_at?: string;
    updated_at?: string;
}

export interface MerchantReview {
    id: number;
    comment: string;
    rating: number;
    customer: Customer;
    created_at?: string;
    updated_at?: string;
}
