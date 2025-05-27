import { Badge } from '@/components/ui/badge';
import { OrderStatusEnum } from '@/enums/order-status';
import { PaymentMethodEnum } from '@/enums/payment-method';
import { PaymentStatusEnum } from '@/enums/payment-status';
import { Transaction } from '@/models/transactions';
import { formatDateTimeIndo } from '@/utils/format-date-time';
import { orderStatusMap } from '@/utils/order-status-map';
import { paymentStatusColorMap } from '@/utils/payment-status-color';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './components/data-table-column-header';

export const columns: ColumnDef<Transaction>[] = [
    {
        id: 'no',
        accessorKey: 'no',
        header: () => <span className="text-md font-medium text-gray-900 dark:text-gray-200">No</span>,
        cell: ({ row }) => <span className="text-sm text-gray-600 dark:text-gray-200">{row.index + 1}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'transaction_code',
        accessorKey: 'transaction_code',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kode Transaksi" />,
        cell: ({ row }) => <span className="text-primary text-sm">{row.getValue('transaction_code')}</span>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        id: 'checked_out_at',
        accessorKey: 'checked_out_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal & Waktu Pemesanan" />,
        cell: ({ row }) => {
            const { date, time } = formatDateTimeIndo(row.getValue('checked_out_at'));

            return (
                <div className="flex flex-col space-y-1 text-sm">
                    <h1>{date}</h1>
                    <span className="text-xs">{time}</span>
                </div>
            );
        },
        enableHiding: true,
        enableSorting: true,
    },
    {
        id: 'order_type',
        accessorKey: 'order_type',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Metode Pemesanan" />,
        cell: ({ row }) => {
            const orderType: string = row.getValue('order_type');
            return <span className="text-primary text-sm capitalize">{orderType}</span>;
        },
        enableHiding: false,
        enableSorting: false,
    },
    {
        id: 'payment_method',
        accessorKey: 'payment_method',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Metode Pembayaran" />,
        cell: ({ row }) => {
            const method = row.getValue('payment_method');
            const color =
                method === PaymentMethodEnum.CASH
                    ? 'bg-green-100 text-green-600 border-green-600 font-bold'
                    : 'bg-blue-100 text-blue-600 border-blue-600 font-bold';

            return (
                <Badge variant="outline" className={`${color} rounded-sm capitalize`}>
                    {String(method)}
                </Badge>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'payment_status',
        accessorKey: 'payment_status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status Pembayaran" />,
        cell: ({ row }) => {
            const status = row.getValue('payment_status') as PaymentStatusEnum;
            const color = paymentStatusColorMap[status] ?? 'bg-muted text-muted-foreground';

            return (
                <Badge variant="outline" className={`${color} rounded-sm capitalize`}>
                    {status}
                </Badge>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    // {
    //     id: 'final_total',
    //     accessorKey: 'final_total',
    //     header: ({ column }) => <DataTableColumnHeader column={column} title="Total Akhir" />,
    //     cell: ({ row }) => <span className="text-sm">{formatCurrency(row.getValue('final_total'))}</span>,
    //     enableSorting: true,
    //     enableHiding: true,
    // },
    {
        id: 'latest_order_status',
        accessorKey: 'latest_order_status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status Pesanan" />,
        cell: ({ row }) => {
            const latestStatus = row.getValue('latest_order_status') as {
                status: OrderStatusEnum;
            } | null;

            if (!latestStatus || typeof latestStatus !== 'object') {
                return <span className="text-muted-foreground text-sm italic">Tidak tersedia</span>;
            }

            const status = latestStatus.status;
            const statusData = orderStatusMap[status];

            if (!statusData) {
                return (
                    <Badge variant="outline" className="bg-muted text-muted-foreground rounded-sm font-bold">
                        {status.toUpperCase()}
                    </Badge>
                );
            }

            return (
                <Badge variant="outline" className={`${statusData.className} rounded-sm font-bold`}>
                    {statusData.label}
                </Badge>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    // {
    //     id: 'actions',
    //     accessorKey: 'actions',
    //     header: () => <span className="text-md font-medium text-gray-900 dark:text-gray-200">Aksi</span>,
    //     cell: ({ row }) => <DataTableRowActions row={row as Row<Transaction>} />,
    //     enableHiding: false,
    // },
];
