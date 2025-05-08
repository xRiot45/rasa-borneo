export interface MenuCategory {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface MenuCategoryForm {
    name: string;
}
