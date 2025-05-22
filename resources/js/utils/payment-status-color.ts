import { PaymentStatusEnum } from '@/enums/payment-status';

export const paymentStatusColorMap: Record<PaymentStatusEnum, string> = {
    [PaymentStatusEnum.PAID]: 'bg-green-600 text-white border-none font-bold',
    [PaymentStatusEnum.PENDING]: 'bg-yellow-600 text-white border-none font-bold',
    [PaymentStatusEnum.FAILED]: 'bg-red-600 text-white border-none font-bold',
    [PaymentStatusEnum.CANCELLED]: 'bg-gray-600 text-white border-none font-bold',
};
