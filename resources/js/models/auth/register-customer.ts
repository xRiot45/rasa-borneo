import { GenderEnum } from '@/enums/gender-enum';

export type RegisterAccountInfo = {
    full_name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
};

export type RegisterPersonalInfo = {
    birthplace: string;
    birthdate: Date | null;
    gender: GenderEnum | '';
};
