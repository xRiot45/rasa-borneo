import { CourierAssignmentStatusEnum } from '@/enums/courier-assignment-status';
import { Transaction } from './transactions';

export interface MyDeliveries {
    id: number;
    transaction_id: number;
    courier_id: number;
    accepted_at?: string;
    status: CourierAssignmentStatusEnum;
    transaction: Transaction;
}

export interface DeliveryHistory {
    id: number;
    courier_id: number;
    transaction_id: number;
    accepted_at?: string;
    delivered_at?: string;
    completed_at?: string;
    proof_of_delivery?: string;
    status: CourierAssignmentStatusEnum;
    transaction: Transaction;
}
