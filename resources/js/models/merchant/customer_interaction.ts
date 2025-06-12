import { Customer } from '../customer';
import { MenuItem } from '../menu-item';
import { Merchant } from '../merchant';

export interface MenuReview {
    id: number;
    merchant: Merchant;
    comment: string;
    rating: number;
    menu_item: MenuItem;
    customer: Customer;
    created_at?: string;
    updated_at?: string;
}

export interface MerchantReview {
    id: number;
    merchant: Merchant;
    comment: string;
    rating: number;
    customer: Customer;
    created_at?: string;
    updated_at?: string;
}
