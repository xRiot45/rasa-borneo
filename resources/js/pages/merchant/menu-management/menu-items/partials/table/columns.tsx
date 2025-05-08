import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/models/menu-item';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTableColumnHeader } from './components/data-table-column-header';
import { DataTableRowActions } from './components/data-table-row-actions';

export const columns: ColumnDef<MenuItem>[] = [
    {
        id: 'no',
        accessorKey: 'no',
        header: () => <span className="text-md font-medium text-gray-900 dark:text-gray-200">No</span>,
        cell: ({ row }) => <span className="text-sm text-gray-600 dark:text-gray-200">{row.index + 1}</span>,
        meta: {
            className: cn('ps-10'),
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Menu" />,
        cell: ({ row }) => (
            <div className="flex items-center space-x-3">
                <img src={`${row.original.image_url}`} alt={row.getValue('name')} className="h-16 w-16 rounded-md object-cover" />
                <div>
                    <span className="block font-medium">{row.getValue('name')}</span>
                </div>
            </div>
        ),
        meta: {
            className: cn('pe-22 lg:pe-0'),
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'menu_category',
        accessorKey: 'menu_category',
        accessorFn: (row) => row.menu_category?.name,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kategori" />,
        cell: ({ row }) => <span>{row.getValue('menu_category')}</span>,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'price',
        accessorKey: 'price',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Harga" />,
        cell: ({ row }) => <span>{formatCurrency(row.getValue('price'))}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'status',
        accessorKey: 'status',
        accessorFn: (row) => row.status,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const status: string = row.getValue('status') ?? '';
            const statusColors: Record<string, string> = {
                tersedia: 'bg-green-500',
                habis: 'bg-red-500',
            };

            return <Badge className={`${statusColors[status] || 'bg-gray-500'} capitalize shadow-none`}>{status}</Badge>;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'created_at',
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Dibuat Pada" />,
        cell: ({ row }) => <span>{formatDate(row.getValue('created_at'))}</span>,
        enableHiding: true,
        enableSorting: true,
    },
    {
        id: 'updated_at',
        accessorKey: 'updated_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Diubah Pada" />,
        cell: ({ row }) => <span>{formatDate(row.getValue('updated_at'))}</span>,
        enableHiding: true,
        enableSorting: true,
    },
    {
        id: 'deleted_at',
        accessorKey: 'deleted_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Dihapus Pada" />,
        cell: ({ row }) => {
            const deletedAt = row.getValue('deleted_at');
            return <span className="max-w-36">{deletedAt ? formatDate(String(deletedAt)) : '-'}</span>;
        },
        enableHiding: true,
        enableSorting: true,
    },
    {
        id: 'actions',
        accessorKey: 'actions',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
        cell: ({ row }) => <DataTableRowActions row={row as Row<MenuItem>} />,
        enableHiding: false,
        enableSorting: false,
    },
];
