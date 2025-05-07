import { GenderEnum } from '@/enums/gender-enum';
import { User } from './user';

export interface Customer {
    id: number;
    birthplace: string;
    birthdate: Date;
    gender: GenderEnum.MALE | GenderEnum.FEMALE;
    user: User;
}
