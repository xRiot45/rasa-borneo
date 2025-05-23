import { OrderStatus } from './order-status';
import { Transaction } from './transactions';

export interface Order extends Transaction {
    latest_order_status: OrderStatus;
}
