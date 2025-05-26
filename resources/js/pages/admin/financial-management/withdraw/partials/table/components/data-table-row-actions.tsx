import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { WithdrawStatusEnum } from '@/enums/withdraw-status';
import { Withdraw } from '@/models/financial-management/withdraw';
import { Icon } from '@iconify/react';
import { router } from '@inertiajs/react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { useState } from 'react';
import { toast } from 'sonner';
import UpdateStatusDialog from './dialogs/update-status-dialog';
import UploadTransferProofDialog from './dialogs/upload-transfer-proof-dialog';
import WithdrawDetailDialog from './dialogs/withdraw-detail-dialog';

const withdrawStatusIcons: Record<WithdrawStatusEnum, string> = {
    [WithdrawStatusEnum.PENDING]: 'mdi:clock-outline',
    [WithdrawStatusEnum.APPROVED]: 'mdi:check-circle-outline',
    [WithdrawStatusEnum.REJECTED]: 'mdi:close-circle-outline',
    [WithdrawStatusEnum.CANCELED]: 'mdi:cancel',
    [WithdrawStatusEnum.TRANSFERED]: 'mdi:bank-transfer',
};

export function DataTableRowActions({ row }: { row: Row<Withdraw> }) {
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<WithdrawStatusEnum | null>(null);
    const [showUploadDialog, setShowUploadDialog] = useState<boolean>(false);

    const handleSelectStatus = (status: WithdrawStatusEnum) => {
        setSelectedStatus(status);
        setShowDialog(true);
    };

    const handleConfirmUpdate = () => {
        router.put(
            route('admin.withdraw.updateStatus', { withdrawId: row.original.id }),
            { status: selectedStatus },
            {
                onSuccess: () => {
                    setShowDialog(false);
                    setSelectedStatus(null);
                    toast.success('Success', {
                        description: 'Status penarikan dana berhasil diubah',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                },
                onError: (error) => {
                    Object.keys(error).forEach((key) => {
                        toast.error('Error', {
                            description: error[key],
                            action: {
                                label: 'Tutup',
                                onClick: () => toast.dismiss(),
                            },
                        });
                    });
                },
            },
        );
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" className="data-[state=open]:bg-muted flex h-8 w-8 p-0">
                        <DotsHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[260px]">
                    <WithdrawDetailDialog withdraw={row.original} />
                    {Object.values(WithdrawStatusEnum).map((status) => (
                        <DropdownMenuItem key={status} className="cursor-pointer p-3 capitalize" onClick={() => handleSelectStatus(status)}>
                            {status}
                            <DropdownMenuShortcut>
                                <Icon icon={withdrawStatusIcons[status]} className="text-muted-foreground" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem onClick={() => setShowUploadDialog(true)} className="cursor-pointer justify-between p-3">
                        Upload Bukti Transfer
                        <Icon icon="tabler:transfer" />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <UpdateStatusDialog
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                selectedStatus={selectedStatus || ''}
                handleConfirmUpdate={handleConfirmUpdate}
            />

            <UploadTransferProofDialog withdrawId={row.original.id} open={showUploadDialog} onOpenChange={setShowUploadDialog} />
        </>
    );
}
