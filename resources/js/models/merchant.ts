import { BusinessCategory } from './business-category';
import { MenuCategory } from './menu-category';
import { MenuItem } from './menu-item';
import { StoreGallery } from './store-management/store-gallery';
import { StoreOperatingHour } from './store-management/store-operating-hour';
import { StoreProfile } from './store-management/store-profile';
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

    slug?: string;

    // Informasi Perpajakan
    tax_identification_number: string;

    // Informasi Verifikasi
    is_verified: number;

    // Timestamps (optional, jika kamu pakai di frontend)
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;

    store_profile: StoreProfile;
    store_gallery: StoreGallery[];
    store_operating_hour: StoreOperatingHour[];

    menu_categories: MenuCategory[];
    menu_items: MenuItem[];
}
