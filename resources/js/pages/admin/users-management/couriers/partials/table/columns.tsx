import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Courier } from '@/models/courier';
import { formatDate } from '@/utils/format-date';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTableColumnHeader } from './components/data-table-column-header';
import { DataTableRowActions } from './components/data-table-row-actions';

export const columns: ColumnDef<Courier>[] = [
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
        id: 'user.full_name',
        accessorKey: 'user.full_name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Lengkap" />,
        cell: ({ row }) => {
            const fullName = row.getValue('user.full_name') as string;
            const profileImage = row.original.profile_image;

            return (
                <div className="flex max-w-36 items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={profileImage || undefined} alt={fullName} />
                        <AvatarFallback>{fullName?.charAt(0) || '?'}</AvatarFallback>
                    </Avatar>
                    <span>{fullName}</span>
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'user.email',
        accessorKey: 'user.email',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
        cell: ({ row }) => <span className="max-w-36">{row.getValue('user.email')}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'user.phone_number',
        accessorKey: 'user.phone_number',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nomor Telepon" />,
        cell: ({ row }) => <span className="max-w-36">{row.getValue('user.phone_number')}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'is_verified',
        accessorKey: 'is_verified',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status Verifikasi" />,
        cell: ({ row }) => {
            const isVerified = row.original.is_verified === 1;
            return (
                <Badge className={isVerified ? 'rounded-sm border-blue-600 bg-blue-100 text-blue-600' : 'border-red-600 bg-red-100 text-red-600'}>
                    {isVerified ? 'Terverifikasi' : 'Belum Diverifikasi'}
                </Badge>
            );
        },
        accessorFn: (row) => row.is_verified,
        filterFn: (row, id, value) => {
            return value.includes(row.original.is_verified);
        },
        enableHiding: false,
        enableSorting: false,
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
        id: 'updated_at',
        accessorKey: 'updated_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Diubah Pada" />,
        cell: ({ row }) => <span className="max-w-36">{formatDate(row.getValue('updated_at'))}</span>,
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
        header: () => <span className="text-md font-medium text-gray-900 dark:text-gray-200">Aksi</span>,
        cell: ({ row }) => <DataTableRowActions row={row as Row<Courier>} />,
        meta: {
            className: cn('pe-22'),
        },
        enableHiding: false,
        enableSorting: false,
    },
];
