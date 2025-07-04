import { cn } from '@/lib/utils';
import { ExpenseReportItem } from '@/models/financial-management/expense-report';
import { formatCurrency } from '@/utils/format-currency';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './components/data-table-column-header';

export const columns: ColumnDef<ExpenseReportItem>[] = [
    {
        id: 'no',
        accessorKey: 'no',
        header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
        cell: ({ row }) => <span className="text-sm">{row.index + 1}</span>,
        meta: {
            className: cn('p-4 ps-8'),
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Pengeluaran" />,
        cell: ({ row }) => <span className="text-sm">{row.original.name}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'expense_report_category',
        accessorKey: 'expense_report_category',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kategori Pengeluaran" />,
        cell: ({ row }) => <span className="text-sm">{row.original.expense_report_category?.name}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'description',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Deskripsi Pengeluaran" />,
        cell: ({ row }) => <span className="text-sm">{row.original.description}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'amount',
        accessorKey: 'amount',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Jumlah Pengeluaran" />,
        cell: ({ row }) => <span className="text-sm">{formatCurrency(Number(row.original.amount))}</span>,
        enableSorting: true,
        enableHiding: true,
    },
];
