import { OrderStatusEnum } from '@/enums/order-status';
import { orderStatusMap } from '@/utils/order-status-map';
import { Badge } from './ui/badge';

const OrderStatusBadge = ({ status }: { status: OrderStatusEnum }) => {
    const { label, className } = orderStatusMap[status] || {
        label: status,
        className: 'bg-gray-100 border text-gray-600',
    };

    return <Badge className={`rounded-sm text-xs font-medium ${className}`}>{label}</Badge>;
};

export default OrderStatusBadge;
