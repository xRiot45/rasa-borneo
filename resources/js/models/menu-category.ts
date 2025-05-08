export interface MenuCategory {
    id: number;
    name: string;
    slug: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface MenuCategoryForm {
    name: string;
}
