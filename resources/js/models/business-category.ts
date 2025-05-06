export type BusinessCategoryForm = {
    name: string;
};

export interface BusinessCategory {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
