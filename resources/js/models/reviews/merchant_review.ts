import { Customer } from '../customer';

export interface MerchantReview {
    id: number;
    merchant_id: number;
    customer_id: number;
    customer: Customer;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
}
