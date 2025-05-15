export interface CartItem {
    id: number;
    quantity: number;
    unit_price: number;
    menu_item: {
        id: number;
        name: string;
        image_url: string;
        price: number;
        short_description: string;
        category: string;
    };
}

export interface Cart {
    length: number;
    merchant_id: number;
    merchant_name: string;
    merchant_slug: string;
    merchant_phone: string;
    merchant_logo_photo: string;
    merchant_category: string;
    items: CartItem[];
}
