export interface StoreGallery {
    id: number;
    merchant_id: number;
    image_url: string | File | null;
}

export interface StoreGalleryForm {
    image_url: string | File | null;
}
