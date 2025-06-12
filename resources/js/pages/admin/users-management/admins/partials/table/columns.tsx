import { Admin } from '@/models/admin';
import { formatDate } from '@/utils/format-date';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTableColumnHeader } from './components/data-table-column-header';
import { DataTableRowActions } from './components/data-table-row-actions';

export const columns: ColumnDef<Admin>[] = [
    {
        id: 'no',
        accessorKey: 'no',
        header: () => <span className="text-md font-medium text-gray-900 dark:text-gray-200">No</span>,
        cell: ({ row }) => <span className="text-sm text-gray-600 dark:text-gray-200">{row.index + 1}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'full_name',
        accessorKey: 'full_name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Lengkap" />,
        cell: ({ row }) => <span className="max-w-36">{row.getValue('full_name')}</span>,
        enableHiding: true,
        enableSorting: true,
    },
    {
        id: 'email',
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email Pengguna" />,
        cell: ({ row }) => <span className="max-w-36">{row.getValue('email')}</span>,
        enableHiding: true,
        enableSorting: true,
    },
    {
        id: 'phone_number',
        accessorKey: 'phone_number',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nomor Telepon Pengguna" />,
        cell: ({ row }) => <span className="max-w-36">{row.getValue('phone_number')}</span>,
        enableHiding: true,
        enableSorting: true,
    },

    {
        id: 'created_at',
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Mendaftar Pada" />,
        cell: ({ row }) => <span className="max-w-36">{formatDate(row.getValue('created_at'))}</span>,
        enableHiding: true,
        enableSorting: true,
    },
    {
        id: 'actions',
        accessorKey: 'actions',
        header: () => <span className="text-md font-medium text-gray-900 dark:text-gray-200">Aksi</span>,
        cell: ({ row }) => <DataTableRowActions row={row as Row<Admin>} />,
        enableHiding: false,
    },
];
