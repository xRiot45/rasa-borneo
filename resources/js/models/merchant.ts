import { BusinessCategory } from './business-category';
import { User } from './user';

export interface Merchant {
    // Identitas utama
    id: number;
    user: User;
    user_id: number;
    id_card_photo: string | null;

    // Informasi Bisnis
    business_name: string;
    business_phone: string;
    business_email: string;
    postal_code: string;
    business_description: string;
    business_address: string;
    business_category_id: number;
    business_category: BusinessCategory;

    // Informasi Rekening Bank
    bank_code: string;
    bank_account_number: string;
    bank_account_name: string;

    // Informasi Payout
    payout_status: string; // Sesuaikan jika ada enum di frontend
    payout_verified_at: string | null; // ISO date string atau null

    // Informasi Perpajakan
    tax_identification_number: string;

    // Informasi Verifikasi
    is_verified: boolean;

    // Timestamps (optional, jika kamu pakai di frontend)
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
}
