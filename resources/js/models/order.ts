import { Courier } from './courier';
import { OrderStatus } from './order-status';
import { Transaction } from './transactions';

export interface Order extends Transaction {
    latest_order_status: OrderStatus;
    courier_assignment?: CourierAssignment;
}

export interface CourierAssignment {
    id: number;
    courier_id: number;
    transaction_id: number;
    accepted_at?: string;
    delivered_at?: string;
    completed_at?: string;
    proof_of_delivery?: string;
    courier: Courier;
}
