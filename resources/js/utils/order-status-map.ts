import { OrderStatusEnum } from '@/enums/order-status';

export const orderStatusMap: Record<OrderStatusEnum, { label: string; className: string }> = {
    [OrderStatusEnum.PENDING]: {
        label: 'Menunggu',
        className: 'bg-gray-600 text-white',
    },
    [OrderStatusEnum.CONFIRMED]: {
        label: 'Dikonfirmasi',
        className: 'bg-blue-600 text-white',
    },
    [OrderStatusEnum.PROCESSING]: {
        label: 'Diproses',
        className: 'bg-yellow-600 text-white',
    },
    [OrderStatusEnum.READY_FOR_DELIVERY]: {
        label: 'Siap Diantar',
        className: 'bg-cyan-600 text-white',
    },
    [OrderStatusEnum.READY_TO_SERVE]: {
        label: 'Siap Disajikan',
        className: 'bg-purple-600 text-white',
    },
    [OrderStatusEnum.DELIVERING]: {
        label: 'Diantar',
        className: 'bg-emerald-600 text-white',
    },
    [OrderStatusEnum.COMPLETED]: {
        label: 'Selesai',
        className: 'bg-green-600 text-white',
    },
    // [OrderStatusEnum.CANCELLED]: {
    //     label: 'Dibatalkan',
    //     className: 'bg-red-600 text-white',
    // },
};
