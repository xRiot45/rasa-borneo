import { WithdrawStatusEnum } from '@/enums/withdraw-status';

export const withdrawStatusColorMap: Record<WithdrawStatusEnum, string> = {
    [WithdrawStatusEnum.PENDING]: 'bg-yellow-100 border-yellow-600 text-yellow-600 font-bold',
    [WithdrawStatusEnum.APPROVED]: 'bg-green-100 border-green-600 text-green-600 font-bold',
    [WithdrawStatusEnum.REJECTED]: 'bg-red-100 border-red-600 text-red-600 font-bold',
    [WithdrawStatusEnum.CANCELED]: 'bg-gray-100 border-gray-600 text-gray-600 font-bold',
    [WithdrawStatusEnum.TRANSFERED]: 'bg-blue-100 border-blue-600 text-blue-600 font-bold',
};
