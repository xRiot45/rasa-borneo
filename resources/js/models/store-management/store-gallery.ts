export interface StoreGallery {
    id: number;
    merchant_id: number;
    image_url: string | File | null;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface StoreGalleryForm {
    image_url: string | File | null;
}
