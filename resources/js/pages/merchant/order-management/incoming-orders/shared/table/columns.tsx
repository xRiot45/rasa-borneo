import { Badge } from '@/components/ui/badge';
import { OrderStatusEnum } from '@/enums/order-status';
import { PaymentMethodEnum } from '@/enums/payment-method';
import { PaymentStatusEnum } from '@/enums/payment-status';
import { Order } from '@/models/order';
import { formatCurrency } from '@/utils/format-currency';
import { formatDateTimeIndo } from '@/utils/format-date-time';
import { orderStatusMap } from '@/utils/order-status-map';
import { paymentStatusColorMap } from '@/utils/payment-status-color';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './components/data-table-column-header';
import { DataTableRowActions } from './components/data-table-row-actions';

export const columns: ColumnDef<Order>[] = [
    {
        id: 'no',
        header: () => <span className="text-sm font-medium text-gray-900 dark:text-gray-100">No</span>,
        cell: ({ row }) => <span className="text-sm text-gray-600 dark:text-gray-300">{row.index + 1}</span>,
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
                <div className="flex max-w-36 flex-col space-y-1 text-sm">
                    <h1>{date}</h1>
                    <span className="text-xs">{time}</span>
                </div>
            );
        },
        enableHiding: true,
        enableSorting: true,
    },
    // {
    //     id: 'orderer_info',
    //     header: ({ column }) => <DataTableColumnHeader column={column} title="Informasi Pemesan" />,
    //     cell: ({ row }) => {
    //         const name = row.original.orderer_name;
    //         const phone = row.original.orderer_phone_number;
    //         return (
    //             <div className="space-y-1 text-sm">
    //                 <h1 className="font-medium">{name}</h1>
    //                 <span className="text-sm">{phone}</span>
    //             </div>
    //         );
    //     },
    //     filterFn: (row, _columnId, filterValue) => {
    //         const name = row.original.orderer_name?.toLowerCase() ?? '';
    //         const phone = row.original.orderer_phone_number?.toLowerCase() ?? '';
    //         return name.includes(filterValue.toLowerCase()) || phone.includes(filterValue.toLowerCase());
    //     },
    //     enableSorting: false,
    //     enableHiding: false,
    // },
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
                method === PaymentMethodEnum.CASH ? 'bg-green-600 text-white border-none font-bold' : 'bg-blue-600 text-white border-none font-bold';

            return (
                <Badge variant="outline" className={`${color} rounded-sm`}>
                    {String(method).toUpperCase()}
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
                <Badge variant="outline" className={`${color} rounded-sm`}>
                    {String(status).toUpperCase()}
                </Badge>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
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
    {
        id: 'final_total',
        accessorKey: 'final_total',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total Akhir" />,
        cell: ({ row }) => <span className="text-sm">{formatCurrency(row.getValue('final_total'))}</span>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
        header: () => <span className="text-sm font-medium">Aksi</span>,
    },
];
