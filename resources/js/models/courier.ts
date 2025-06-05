import { GenderEnum } from '@/enums/gender-enum';
import { VehicleTypeEnum } from '@/enums/vehicle-type';
import { User } from './user';

export interface Courier {
    id: number;
    user: User;
    vehicle_type: VehicleTypeEnum;
    national_id: string;
    id_card_photo: string;
    age: number;
    birthplace: string;
    birthdate: Date;
    profile_image: string;
    gender: GenderEnum;
    driving_license_photo: string;
    license_plate: string;
    is_online: number;
    is_verified: boolean;

    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface CourierForm {
    // User fields
    full_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone_number: string;

    // Courier fields
    vehicle_type: VehicleTypeEnum;
    national_id: string;
    id_card_photo?: File | null; // nullable image
    age: number | string;
    birthplace: string;
    birthdate: Date | null;
    profile_image?: File | null; // nullable image
    gender: GenderEnum;
    driving_license_photo?: File | null; // nullable image
    license_plate: string;
}
