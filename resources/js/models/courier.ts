import { GenderEnum } from '@/enums/gender-enum';
import { VehicleTypeEnum } from '@/enums/vehicle-type';

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
