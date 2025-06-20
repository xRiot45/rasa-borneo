import { cn } from '@/lib/utils';
import { MerchantReview } from '@/models/merchant/customer_interaction';
import { formatDate } from '@/utils/format-date';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Star } from 'lucide-react';
import { DataTableColumnHeader } from './components/data-table-column-header';
import { DataTableRowActions } from './components/data-table-row-actions';

export const columns: ColumnDef<MerchantReview>[] = [
    {
        id: 'no',
        accessorKey: 'no',
        header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
        cell: ({ row }) => <span>{row.index + 1}</span>,
        meta: {
            className: cn('p-4 ps-8'),
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'rating',
        accessorKey: 'rating',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Rating" />,
        cell: ({ row }) => {
            const rating = row.original.rating;
            return (
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={16} className={i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                    ))}
                </div>
            );
        },
        enableSorting: true,
        enableHiding: false,
    },
    {
        id: 'comment',
        accessorKey: 'comment',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Komentar" />,
        cell: ({ row }) => <span className="text-sm">{row.original.comment}</span>,
        meta: {
            className: cn('w-72 break-words whitespace-normal'),
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'customer',
        accessorKey: 'customer',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Pemberi Ulasan" />,
        cell: ({ row }) => {
            const user = row.original.customer.user;
            return (
                <div>
                    <div className="font-medium">{user.full_name}</div>
                    <div className="text-sm text-gray-500 dark:text-white">{user.email}</div>
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'created_at',
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Ulasan" />,
        cell: ({ row }) => <span className="text-sm">{formatDate(row.original.created_at ?? '')}</span>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        id: 'actions',
        accessorKey: 'actions',
        header: () => <span className="text-md font-medium text-gray-900 dark:text-gray-200">Aksi</span>,
        cell: ({ row }) => <DataTableRowActions row={row as Row<MerchantReview>} />,
        enableHiding: false,
    },
];
