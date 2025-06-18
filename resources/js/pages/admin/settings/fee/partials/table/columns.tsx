import { cn } from '@/lib/utils';
import { FeeItem } from '@/models/fee';
import { formatCurrency } from '@/utils/format-currency';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTableColumnHeader } from './components/data-table-column-header';
import { DataTableRowActions } from './components/data-table-row-actions';

export const columns: ColumnDef<FeeItem>[] = [
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
        id: 'type',
        accessorKey: 'type',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Jenis Biaya" />,
        cell: ({ row }) => <span className="capitalize">{row.original.type}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'amount',
        accessorKey: 'amount',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Jumlah Biaya" />,
        cell: ({ row }) => <span>{formatCurrency(row.original.amount)}</span>,
        enableSorting: false,
        enableHiding: false,
    },

    {
        id: 'actions',
        accessorKey: 'actions',
        header: () => <span className="text-md font-medium text-gray-900 dark:text-gray-200">Aksi</span>,
        cell: ({ row }) => <DataTableRowActions row={row as Row<FeeItem>} />,
        enableHiding: false,
    },
];
