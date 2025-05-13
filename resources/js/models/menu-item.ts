import { MenuItemStatusEnum } from '@/enums/menu-item-enum';
import { MenuCategory } from './menu-category';
import { Merchant } from './merchant';

export interface MenuItem {
    id: number;
    name: string;
    price: number;
    image_url: File | null;
    status: MenuItemStatusEnum;
    short_description: string;
    is_recommended: boolean | number;
    menu_category_id: number;
    menu_category: MenuCategory;
    slug: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    merchant: Merchant;
}

export interface MenuItemForm {
    name: string;
    price: number;
    image_url: string | File | null;
    status: MenuItemStatusEnum;
    short_description: string;
    menu_category_id: number;
    is_recommended: boolean;
}
