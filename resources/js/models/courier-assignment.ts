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
