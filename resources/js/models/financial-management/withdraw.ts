import { WithdrawStatusEnum } from '@/enums/withdraw-status';
import { Merchant } from '../merchant';

export interface Withdraw {
    id: number;
    merchant_id: number;
    merchant: Merchant;
    withdraw_code: string;
    amount: number;
    bank_code: string;
    bank_account_number: string;
    bank_account_name: string;
    status: WithdrawStatusEnum;
    note: string;
    requested_at: string;
    aproved_at: string;
    rejected_at: string;
    canceled_at: string;
    transferred_at: string;
    created_at: string;
    updated_at: string;
}

export interface WithdrawForm {
    amount: number;
    bank_code: string;
    bank_account_number: string;
    bank_account_name: string;
    note?: string;
}
