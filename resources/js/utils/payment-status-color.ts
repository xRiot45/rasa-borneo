import { PaymentStatusEnum } from '@/enums/payment-status';

export const paymentStatusColorMap: Record<PaymentStatusEnum, string> = {
    [PaymentStatusEnum.PAID]: 'bg-green-500 text-white border-none font-bold',
    [PaymentStatusEnum.PENDING]: 'bg-yellow-500 text-white border-none font-bold',
    [PaymentStatusEnum.FAILED]: 'bg-red-500 text-white border-none font-bold',
    [PaymentStatusEnum.CANCELLED]: 'bg-gray-500 text-white border-none font-bold',
};
