export type RegisterFormStep1 = {
    full_name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
};

export type RegisterFormStep2 = {
    id_card_photo: string | File | null;
};

export type RegisterFormStep3 = {
    business_name: string;
    business_phone: string;
    business_email: string;
    postal_code: string;
    business_description: string;
    business_address: string;
    business_category_id: number;
};

export type RegisterFormStep4 = {
    bank_code: string;
    bank_account_number: string;
    bank_account_name: string;
};

export type RegisterFormStep5 = {
    tax_identification_number: string;
};
