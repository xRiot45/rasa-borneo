import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/models/menu-item';
import { formatCurrency } from '@/utils/format-currency';
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
            className: cn('p-4 ps-8'),
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Menu" />,
        cell: ({ row }) => (
            <div className="flex items-center space-x-3">
                <img src={`${row.original.image_url}`} alt={row.getValue('name')} className="h-16 w-16 rounded-md object-cover" />
                <div>
                    <span>{row.getValue('name')}</span>
                </div>
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'short_description',
        accessorKey: 'short_description',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Deskripsi Singkat" />,
        cell: ({ row }) => <span>{row.getValue('short_description')}</span>,
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
                tersedia: 'bg-green-100 text-green-600 border-green-500',
                habis: 'bg-red-100 text-red-500 border-red-500',
            };

            return <Badge className={`${statusColors[status] || 'bg-gray-500'} rounded-sm capitalize shadow-none`}>{status}</Badge>;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'is_recommended',
        accessorKey: 'is_recommended',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Rekomendasi" />,
        cell: ({ row }) => {
            const isRecommended = row.getValue('is_recommended');
            return (
                <Badge
                    className={`${isRecommended ? 'border-blue-500 bg-blue-100 text-blue-600' : 'border-gray-500 bg-gray-100 text-gray-600'} rounded-sm capitalize shadow-none`}
                >
                    {isRecommended ? 'Direkomendasikan' : 'Tidak Direkomendasikan'}
                </Badge>
            );
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
