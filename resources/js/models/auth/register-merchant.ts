// Step 1 - Informasi Akun Pengguna
export type RegisterUserAccountInfo = {
    full_name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
};

// Step 2 - Dokumen Identitas
export type RegisterUserIdentityInfo = {
    id_card_photo: string | File | null;
};

// Step 3 - Informasi Bisnis
export type RegisterBusinessInfo = {
    business_name: string;
    business_phone: string;
    business_email: string;
    postal_code: string;
    business_description: string;
    business_address: string;
    business_category_id: number;
};

// Step 4 - Informasi Rekening Bank
export type RegisterBankAccountInfo = {
    bank_code: string;
    bank_account_number: string;
    bank_account_name: string;
};

// Step 5 - Informasi NPWP
export type RegisterTaxInfo = {
    tax_identification_number: string;
};
