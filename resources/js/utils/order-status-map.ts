import { OrderStatusEnum } from '@/enums/order-status';

export const orderStatusMap: Record<OrderStatusEnum, { label: string; className: string }> = {
    [OrderStatusEnum.PENDING]: {
        label: 'Menunggu',
        className: 'bg-gray-100 border border-gray-600 text-gray-600',
    },
    [OrderStatusEnum.CONFIRMED]: {
        label: 'Dikonfirmasi',
        className: 'bg-blue-100 border border-blue-600 text-blue-600',
    },
    [OrderStatusEnum.PROCESSING]: {
        label: 'Diproses',
        className: 'bg-yellow-100 border border-yellow-600 text-yellow-600',
    },
    [OrderStatusEnum.READY_FOR_DELIVERY]: {
        label: 'Siap Diantar',
        className: 'bg-cyan-100 border border-cyan-600 text-cyan-600',
    },
    [OrderStatusEnum.READY_TO_SERVE]: {
        label: 'Siap Disajikan',
        className: 'bg-purple-100 border border-purple-600 text-purple-600',
    },
    [OrderStatusEnum.DELIVERING]: {
        label: 'Diantar',
        className: 'bg-emerald-100 border border-emerald-600 text-emerald-600',
    },
    [OrderStatusEnum.COMPLETED]: {
        label: 'Selesai',
        className: 'bg-green-100 border border-green-600 text-green-600',
    },
    // [OrderStatusEnum.CANCELLED]: {
    //   label: 'Dibatalkan',
    //   className: 'bg-red-100 border border-red-600 text-red-600',
    // },
};
