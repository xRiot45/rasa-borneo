import { Customer } from '../customer';

export interface Review {
    id: number;
    customer_id: number;
    customer: Customer;
    transaction_id: number;
    menu_item_id: number;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
}

export interface MenuItem {
    id: number;
    name: string;
    price: number;
    image_url: string;
    status: string;
    short_description: string;
    menu_category_id: number;
    merchant_id: number;
    is_recommended: number; // bisa juga boolean jika mau ubah tipe
    slug: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    deleted_at: string | null;
    reviews: Review[];
}
