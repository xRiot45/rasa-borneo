import { cn } from '@/lib/utils';
import { DetailProfitReport } from '@/models/financial-management/profit-report';
import { formatCurrency } from '@/utils/format-currency';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { DataTableColumnHeader } from './components/data-table-column-header';

export const columns: ColumnDef<DetailProfitReport>[] = [
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
        id: 'date',
        accessorKey: 'date',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal" />,
        cell: ({ row }) => <span>{format(new Date(row.original.date), 'dd/MM/yyyy')}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'total_revenue',
        accessorKey: 'total_revenue',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total Pemasukan" />,
        cell: ({ row }) => {
            const value = row.getValue<number>('total_revenue');
            return <span>{value && value !== 0 ? formatCurrency(value) : '-'}</span>;
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'total_expense',
        accessorKey: 'total_expense',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total Pengeluaran" />,
        cell: ({ row }) => {
            const value = row.getValue<number>('total_expense');
            return <span>{value && value !== 0 ? formatCurrency(value) : '-'}</span>;
        },
        enableSorting: false,
        enableHiding: false,
    },
];
