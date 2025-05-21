import { Badge } from '@/components/ui/badge';
import { PaymentMethodEnum } from '@/enums/payment-method';
import { PaymentStatusEnum } from '@/enums/payment-status';
import { Order } from '@/models/order';
import { formatCurrency } from '@/utils/format-currency';
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
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'orderer_name',
        accessorKey: 'orderer_name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Pemesan" />,
        cell: ({ row }) => <span className="text-sm text-gray-800 dark:text-gray-200">{row.getValue('orderer_name')}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'orderer_phone_number',
        accessorKey: 'orderer_phone_number',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nomor Telepon Pemesan" />,
        cell: ({ row }) => <span className="text-sm text-gray-800 dark:text-gray-200">{row.getValue('orderer_phone_number')}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'dine_in_table_label',
        accessorKey: 'dine_in_table_label',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nomor Meja" />,
        cell: ({ row }) => <span className="text-sm text-gray-800 dark:text-gray-200">{row.getValue('dine_in_table_label')}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'payment_method',
        accessorKey: 'payment_method',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Metode Pembayaran" />,
        cell: ({ row }) => {
            const method = row.getValue('payment_method');
            const color =
                method === PaymentMethodEnum.CASH ? 'bg-green-500 text-white border-none font-bold' : 'bg-blue-500 text-white border-none font-bold';

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
        id: 'final_total',
        accessorKey: 'final_total',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total Akhir" />,
        cell: ({ row }) => <span className="text-sm">{formatCurrency(row.getValue('final_total'))}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'note',
        accessorKey: 'note',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Catatan" />,
        cell: ({ row }) => <span className="text-sm">{row.getValue('note')}</span>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
        header: () => <span className="text-sm font-medium">Aksi</span>,
    },
];
