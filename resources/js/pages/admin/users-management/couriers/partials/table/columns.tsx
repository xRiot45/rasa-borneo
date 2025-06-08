import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Courier } from '@/models/courier';
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
            className: cn('pe-22'),
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
        meta: {
            className: cn('pe-22'),
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'user.email',
        accessorKey: 'user.email',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
        cell: ({ row }) => <span className="max-w-36">{row.getValue('user.email')}</span>,
        meta: {
            className: cn('pe-22'),
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'user.phone_number',
        accessorKey: 'user.phone_number',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nomor Telepon" />,
        cell: ({ row }) => <span className="max-w-36">{row.getValue('user.phone_number')}</span>,
        meta: {
            className: cn('pe-22'),
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'is_verified',
        accessorKey: 'is_verified',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status Verifikasi" />,
        cell: ({ row }) => {
            const isVerified = row.original.is_verified === true;
            return (
                <Badge className={isVerified ? 'rounded-sm border-blue-600 bg-blue-100 text-blue-600' : 'border-red-600 bg-red-100 text-red-600'}>
                    {isVerified ? 'Terverifikasi' : 'Belum Diverifikasi'}
                </Badge>
            );
        },
        meta: {
            className: cn('pe-20'),
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
        cell: ({ row }) => <DataTableRowActions row={row as Row<Courier>} />,
        meta: {
            className: cn('pe-22'),
        },
        enableHiding: false,
        enableSorting: false,
    },
];
