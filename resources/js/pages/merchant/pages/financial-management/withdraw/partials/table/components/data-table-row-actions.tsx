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

export function DataTableRowActions({ row }: { row: Row<Withdraw> }) {
    const withdrawIsPending = row.original.status === WithdrawStatusEnum.PENDING;
    const [showDialogCancelWithdraw, setShowDialogCancelWithdraw] = useState<boolean>(false);

    const confirmCancelWithdraw = () => {
        setShowDialogCancelWithdraw(true);
    };

    const handleCancelledWithdraw = (id: number) => {
        router.put(
            route('merchant.withdraw.cancelledWithdraw', id),
            {},
            {
                onSuccess: () => {
                    setShowDialogCancelWithdraw(false);
                    toast.success('Success', {
                        description: 'Penarikan Dana Berhasil Dibatalkan!',
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

                    {withdrawIsPending && (
                        <DropdownMenuItem className="cursor-pointer p-3 text-red-500" onClick={confirmCancelWithdraw}>
                            Batalkan Penarikan
                            <DropdownMenuShortcut>
                                <Icon icon={'material-symbols:cancel'} className="text-red-500" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={showDialogCancelWithdraw} onOpenChange={setShowDialogCancelWithdraw}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Batalkan Pengajuan Penarikan Dana</DialogTitle>
                        <DialogDescription>
                            Apakah anda yakin ingin membatalkan pengajuan penarikan dana ini? Anda tidak dapat mengembalikan penarikan dana yang telah
                            dibatalkan.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button variant="outline" className="cursor-pointer" onClick={() => setShowDialogCancelWithdraw(false)}>
                            Batalkan
                        </Button>
                        <Button variant="destructive" className="cursor-pointer" onClick={() => handleCancelledWithdraw(row.original.id)}>
                            Batalkan Penarikan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
