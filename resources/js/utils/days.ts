import { DayEnum } from '@/enums/day-enum';

const days = Object.entries(DayEnum).map(([key, value]) => ({
    key,
    label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export default days;
