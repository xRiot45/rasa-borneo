import { CouponTypeEnum } from '@/enums/coupon-type';

export interface Coupon {
    id: number;
    code: string;
    type: CouponTypeEnum;
    discount: number;
    minimum_purchase: number;
    start_date: string;
    end_date: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface CouponForm {
    code: string;
    type: CouponTypeEnum | null;
    discount: number;
    minimum_purchase: number;
    start_date: Date;
    end_date: Date;
    is_active: boolean;
}
