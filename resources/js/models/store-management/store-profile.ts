import { Merchant } from '../merchant';

export interface StoreProfile {
    id: number;
    logo_photo: string | File | null;
    cover_photo: string | File | null;

    // Media Social URL
    website_url: string;
    instagram_url: string;
    facebook_url: string;
    twitter_url: string;
    tiktok_url: string;
    whatsapp_url: string;

    // Store Location
    latitude: string;
    longitude: string;

    // Store Information
    founded_year: number;
    number_of_employees: number;
    merchant_id: number;
    merchant: Merchant;
}

export interface StoreProfileForm {
    // File uploads
    logo_photo: string | File | null;
    cover_photo: string | File | null;

    // Media Sosial URL (nullable)
    website_url: string;
    instagram_url: string;
    facebook_url: string;
    twitter_url: string;
    tiktok_url: string;
    whatsapp_url: string;

    // Lokasi Toko (nullable numeric string)
    latitude: string;
    longitude: string;

    // Informasi Toko
    founded_year: number;
    number_of_employees: number;
}
