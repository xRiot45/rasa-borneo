import { StoreOperatingHour } from '@/models/store-management/store-operating-hour';
import dayjs from 'dayjs';

export const isMerchantClosedNow = (schedules: StoreOperatingHour[]) => {
    const now = dayjs();
    const today = now.format('dddd').toUpperCase();
    const currentTime = now.format('HH:mm:ss');

    const todaySchedule = schedules.find((s) => s.day === today);

    if (!todaySchedule) return true;
    if (todaySchedule.is_closed) return true;

    const { open_time, close_time } = todaySchedule;

    return currentTime < open_time || currentTime > close_time;
};
