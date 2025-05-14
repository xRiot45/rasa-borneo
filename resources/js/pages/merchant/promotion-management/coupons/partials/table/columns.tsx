import { Badge } from '@/components/ui/badge';
import { CouponTypeEnum } from '@/enums/coupon-type';
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
        cell: ({ row }) => <span className="text-sm text-gray-600 dark:text-gray-200">{row.index + 1}</span>,
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
                            ? 'rounded-sm border-none bg-blue-500 text-white'
                            : 'rounded-sm border-none bg-green-500 text-white'
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
    // {
    //     id: 'created_at',
    //     accessorKey: 'created_at',
    //     header: ({ column }) => <DataTableColumnHeader column={column} title="Dibuat Pada" />,
    //     cell: ({ row }) => <span className="max-w-36">{formatDate(row.getValue('created_at'))}</span>,
    //     enableHiding: true,
    //     enableSorting: true,
    // },
    // {
    //     id: 'updated_at',
    //     accessorKey: 'updated_at',
    //     header: ({ column }) => <DataTableColumnHeader column={column} title="Diubah Pada" />,
    //     cell: ({ row }) => <span className="max-w-36">{formatDate(row.getValue('updated_at'))}</span>,
    //     enableHiding: true,
    //     enableSorting: true,
    // },
    {
        id: 'is_active',
        accessorKey: 'is_active',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status Kupon" />,
        cell: ({ row }) => {
            const isActive = row.getValue<boolean>('is_active');
            return (
                <Badge
                    variant="outline"
                    className={isActive ? 'rounded-sm border-none bg-green-500 text-white' : 'rounded-sm border-none bg-red-500 text-white'}
                >
                    {isActive ? 'Aktif' : 'Tidak Aktif'}
                </Badge>
            );
        },
        enableHiding: false,
        enableSorting: false,
    },
    {
        id: 'actions',
        accessorKey: 'actions',
        header: () => <span className="text-md font-medium text-gray-900 dark:text-gray-200">Aksi</span>,
        cell: ({ row }) => <DataTableRowActions row={row as Row<Coupon>} />,
        enableHiding: false,
    },
];
