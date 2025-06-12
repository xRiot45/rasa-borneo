import { GenderEnum } from '@/enums/gender-enum';
import { User } from './user';

export interface Customer {
    id: number;
    birthplace: string;
    birthdate: Date;
    gender: GenderEnum.MALE | GenderEnum.FEMALE;
    user: User;
    profile_image: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export type CustomerForm = {
    full_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone_number: string;
    birthplace: string;
    birthdate: Date;
    gender: GenderEnum.MALE | GenderEnum.FEMALE;
    profile_image: string | File | null;
};
