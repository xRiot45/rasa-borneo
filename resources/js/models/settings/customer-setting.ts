import { GenderEnum } from '@/enums/gender-enum';

export type CustomerProfileForm = {
    full_name: string;
    email: string;
    phone_number: string;
    birthplace?: string;
    birthdate?: Date | null;
    profile_image: File | null;
    gender: GenderEnum.MALE | GenderEnum.FEMALE;
};
