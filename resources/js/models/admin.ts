export interface Admin {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export type AdminForm = {
    full_name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
};
