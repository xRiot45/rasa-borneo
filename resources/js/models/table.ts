export interface TableModel {
    id: number;
    name: string;
    capacity: number;
    is_available: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface TableForm {
    name: string;
    capacity: number;
}
