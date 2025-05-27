import { PaymentStatusEnum } from '@/enums/payment-status';

export const paymentStatusColorMap: Record<PaymentStatusEnum, string> = {
    [PaymentStatusEnum.PAID]: 'bg-green-100 border border-green-600 text-green-600 font-bold',
    [PaymentStatusEnum.PENDING]: 'bg-yellow-100 border border-yellow-600 text-yellow-600 font-bold',
    [PaymentStatusEnum.FAILED]: 'bg-red-100 border border-red-600 text-red-600 font-bold',
    [PaymentStatusEnum.CANCELLED]: 'bg-gray-100 border border-gray-600 text-gray-600 font-bold',
};
