import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { WithdrawStatusEnum } from '@/enums/withdraw-status';
import { cn } from '@/lib/utils';
import { Withdraw } from '@/models/financial-management/withdraw';
import { formatCurrency } from '@/utils/format-currency';
import { withdrawStatusColorMap } from '@/utils/withdraw-status-color';
import { Icon } from '@iconify/react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTableColumnHeader } from './components/data-table-column-header';
import { DataTableRowActions } from './components/data-table-row-actions';

export const columns: ColumnDef<Withdraw>[] = [
    {
        id: 'no',
        accessorKey: 'no',
        header: () => <span className="text-md font-medium text-gray-900 dark:text-gray-200">No</span>,
        cell: ({ row }) => <span>{row.index + 1}</span>,
        meta: {
            className: cn('p-4 ps-8'),
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'withdraw_code',
        accessorKey: 'withdraw_code',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Penarikan" />,
        cell: ({ row }) => <span>{row.getValue('withdraw_code')}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'merchant.business_name',
        accessorKey: 'merchant.business_name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Merchant" />,
        cell: ({ row }) => <span>{row.getValue('merchant.business_name') || '-'}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'amount',
        accessorKey: 'amount',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Jumlah Penarikan" />,
        cell: ({ row }) => <span>{formatCurrency(row.getValue('amount'))}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'bank_code',
        accessorKey: 'bank_code',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kode & Nama Bank" />,
        cell: ({ row }) => <span>{row.getValue('bank_code')}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'bank_account_number',
        accessorKey: 'bank_account_number',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nomor Rekening" />,
        cell: ({ row }) => <span>{row.getValue('bank_account_number')}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'bank_account_name',
        accessorKey: 'bank_account_name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Pemilik Rekening" />,
        cell: ({ row }) => <span>{row.getValue('bank_account_name')}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'transfer_proof',
        accessorKey: 'transfer_proof',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Bukti Transfer" />,
        cell: ({ row }) => {
            const proofUrl = row.getValue('transfer_proof') as string | null;

            const isAvailable = !!proofUrl;

            return (
                <div className="pt-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="cursor-pointer" disabled={!isAvailable}>
                                Lihat Bukti Transfer
                                <Icon icon="material-symbols:open-in-new-rounded" className="ml-2" />
                            </Button>
                        </DialogTrigger>
                        {isAvailable && (
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Bukti Transfer</DialogTitle>
                                </DialogHeader>
                                <img src={proofUrl} alt="Bukti Transfer" className="h-auto w-full rounded-md object-contain" />
                            </DialogContent>
                        )}
                    </Dialog>
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'status',
        accessorKey: 'status',
        accessorFn: (row) => row.status,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const status: WithdrawStatusEnum = row.getValue('status');
            const statusClass = withdrawStatusColorMap[status] || 'bg-gray-200 text-gray-800';

            return <Badge className={`capitalize ${statusClass}`}>{status.toLowerCase()}</Badge>;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
        enableSorting: true,
        enableHiding: true,
    },
    {
        id: 'actions',
        accessorKey: 'actions',
        header: () => <span className="text-md font-medium text-gray-900 dark:text-gray-200">Aksi</span>,
        cell: ({ row }) => <DataTableRowActions row={row as Row<Withdraw>} />,
        enableHiding: false,
    },
];
