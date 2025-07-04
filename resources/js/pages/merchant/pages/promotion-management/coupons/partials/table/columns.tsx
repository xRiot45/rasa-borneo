import { Badge } from '@/components/ui/badge';
import { CouponTypeEnum } from '@/enums/coupon-type';
import { cn } from '@/lib/utils';
import { Coupon } from '@/models/coupon';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTableColumnHeader } from './components/data-table-column-header';
import { DataTableRowActions } from './components/data-table-row-actions';

export const columns: ColumnDef<Coupon>[] = [
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
        id: 'code',
        accessorKey: 'code',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Kupon" />,
        cell: ({ row }) => <span className="max-w-36">{row.getValue('code')}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'type',
        accessorKey: 'type',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tipe Kupon" />,
        cell: ({ row }) => {
            const type = row.getValue<CouponTypeEnum>('type');

            return (
                <Badge
                    variant="outline"
                    className={
                        type === CouponTypeEnum.PERCENTAGE
                            ? 'rounded-sm border border-blue-600 bg-blue-100 text-blue-600'
                            : 'rounded-sm border border-green-600 bg-green-100 text-green-600'
                    }
                >
                    {type === CouponTypeEnum.PERCENTAGE ? 'Persentase' : 'Potongan'}
                </Badge>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'discount',
        accessorKey: 'discount',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Diskon" />,
        cell: ({ row }) => {
            const discount = row.getValue<number>('discount');
            const type = row.getValue<CouponTypeEnum>('type');

            return <span className="max-w-36">{type === CouponTypeEnum.PERCENTAGE ? `${discount}%` : `${formatCurrency(discount)}`}</span>;
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'minimum_purchase',
        accessorKey: 'minimum_purchase',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Minimum Pembelian" />,
        cell: ({ row }) => <span className="max-w-36">{formatCurrency(row.getValue('minimum_purchase'))}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'start_date',
        accessorKey: 'start_date',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Mulai Kupon" />,
        cell: ({ row }) => <span className="max-w-36">{formatDate(row.getValue('start_date'))}</span>,
        enableHiding: true,
        enableSorting: true,
    },
    {
        id: 'end_date',
        accessorKey: 'end_date',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Berakhir Kupon" />,
        cell: ({ row }) => <span className="max-w-36">{formatDate(row.getValue('end_date'))}</span>,
        enableHiding: true,
        enableSorting: true,
    },
    {
        id: 'is_active',
        accessorKey: 'is_active',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status Kupon" />,
        cell: ({ row }) => {
            const isActive = row.getValue<boolean>('is_active');
            return (
                <Badge
                    variant="outline"
                    className={
                        isActive
                            ? 'rounded-sm border border-green-600 bg-green-100 text-green-600'
                            : 'rounded-sm border border-red-600 bg-red-100 text-red-600'
                    }
                >
                    {isActive ? 'Aktif' : 'Tidak Aktif'}
                </Badge>
            );
        },
        enableHiding: false,
        enableSorting: false,
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
        cell: ({ row }) => <DataTableRowActions row={row as Row<Coupon>} />,
        enableHiding: false,
    },
];
