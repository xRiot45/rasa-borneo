import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { WithdrawStatusEnum } from '@/enums/withdraw-status';
import { Withdraw } from '@/models/financial-management/withdraw';
import { Icon } from '@iconify/react';
import { router } from '@inertiajs/react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { useState } from 'react';
import { toast } from 'sonner';
import WithdrawDetailDialog from './dialogs/withdraw-detail';

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

    const handleSelectStatus = (status: WithdrawStatusEnum) => {
        setSelectedStatus(status);
        setShowDialog(true);
    };

    const handleConfirmUpdate = () => {
        router.put(
            route('admin.withdraw.updateStatus', { id: row.original.id }),
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
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Update Status</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin mengubah status penarikan menjadi{' '}
                            <strong className="text-black uppercase dark:text-white">{selectedStatus}</strong>? Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDialog(false)}>
                            Batal
                        </Button>
                        <Button variant="default" onClick={handleConfirmUpdate}>
                            Konfirmasi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
