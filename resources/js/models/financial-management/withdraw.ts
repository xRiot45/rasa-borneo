import { WithdrawStatusEnum } from '@/enums/withdraw-status';
import { Courier } from '../courier';
import { Merchant } from '../merchant';

export interface Withdraw {
    id: number;
    merchant_id: number;
    courier_id: number;
    merchant: Merchant;
    courier: Courier;
    withdraw_code: string;
    amount: number;
    bank_code: string;
    bank_account_number: string;
    bank_account_name: string;
    status: WithdrawStatusEnum;
    note: string;
    requested_at: string;
    approved_at: string;
    rejected_at: string;
    cancelled_at: string;
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

export interface UploadTransferProofForm {
    transfer_proof: string | File | null;
}
