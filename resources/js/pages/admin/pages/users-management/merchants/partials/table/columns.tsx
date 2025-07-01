import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Merchant } from '@/models/merchant';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTableColumnHeader } from './components/data-table-column-header';
import { DataTableRowActions } from './components/data-table-row-actions';

export const columns: ColumnDef<Merchant>[] = [
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
        id: 'business_name',
        accessorKey: 'business_name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Usaha" />,
        cell: ({ row }) => <span>{row.original?.business_name || '-'}</span>,
        meta: {
            className: cn('pe-22'),
        },
        enableHiding: false,
        enableSorting: false,
    },
    {
        id: 'business_email',
        accessorKey: 'business_email',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email Usaha" />,
        cell: ({ row }) => <span className="max-w-36">{row.original?.business_email || '-'}</span>,
        meta: {
            className: cn('pe-22'),
        },
        enableHiding: false,
        enableSorting: false,
    },
    {
        id: 'business_phone',
        accessorKey: 'business_phone',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nomor Telepon Usaha" />,
        cell: ({ row }) => <span>{row.original?.business_phone || '-'}</span>,
        meta: {
            className: cn('pe-22'),
        },
        enableHiding: false,
        enableSorting: false,
    },
    {
        id: 'business_address',
        accessorKey: 'business_address',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Alamat Usaha" />,
        cell: ({ row }) => <span className="max-w-36">{row.original?.business_address || '-'}</span>,
        meta: {
            className: cn('pe-22'),
        },
        enableHiding: false,
        enableSorting: false,
    },
    {
        id: 'business_category',
        accessorKey: 'business_category',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kategori Usaha" />,
        cell: ({ row }) => <span className="max-w-36">{row.original?.business_category?.name || '-'}</span>,
        meta: {
            className: cn('pe-22'),
        },
        accessorFn: (row) => {
            return row?.business_category?.name || '';
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
        enableHiding: false,
        enableSorting: false,
    },
    {
        id: 'merchant_status',
        accessorKey: 'merchant_status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status Verifikasi" />,
        cell: ({ row }) => {
            const isVerified = row.original.is_verified === 1;
            return (
                <Badge className={isVerified ? 'rounded-sm border-blue-500 bg-blue-100 text-blue-500' : 'border-red-500 bg-red-100 text-red-500'}>
                    {isVerified ? 'Terverifikasi' : 'Belum Diverifikasi'}
                </Badge>
            );
        },
        meta: {
            className: cn('pe-22'),
        },
        accessorFn: (row) => row.is_verified,
        filterFn: (row, id, value) => {
            return value.includes(row.original.is_verified);
        },
        enableHiding: false,
        enableSorting: false,
    },
    {
        id: 'actions',
        accessorKey: 'actions',
        header: () => <span className="text-md font-medium text-gray-900 dark:text-gray-200">Aksi</span>,
        cell: ({ row }) => <DataTableRowActions row={row as Row<Merchant>} />,
        meta: {
            className: cn('pe-20'),
        },
        enableHiding: false,
    },
];
