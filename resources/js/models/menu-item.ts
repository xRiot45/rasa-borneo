import { MenuItemStatusEnum } from '@/enums/menu-item-enum';

export interface MenuItemForm {
    name: string;
    price: number;
    image_url: string | File | null;
    status: MenuItemStatusEnum;
    short_description: string;
    menu_category_id: number;
    is_recommended: boolean;
}
