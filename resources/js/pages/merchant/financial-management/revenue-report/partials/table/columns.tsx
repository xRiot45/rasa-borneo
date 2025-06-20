import { Badge } from '@/components/ui/badge';
import { ReportTypeEnum } from '@/enums/report-type';
import { cn } from '@/lib/utils';
import { RevenueReport } from '@/models/financial-management/revenue-report';
import { formatCurrency } from '@/utils/format-currency';
import { reportTypeColorMap } from '@/utils/report-type-color-map';
import { ColumnDef, Row } from '@tanstack/react-table';
import { format } from 'date-fns';
import { DataTableColumnHeader } from './components/data-table-column-header';
import { DataTableRowActions } from './components/data-table-row-actions';

export const columns: ColumnDef<RevenueReport>[] = [
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
        accessorKey: 'report_date',
        header: 'Tanggal Laporan',
        cell: ({ row }) => format(new Date(row.original.report_date), 'dd/MM/yyyy'),
        filterFn: (row, columnId, value) => {
            const date = new Date(row.getValue(columnId));
            const from = value?.from ? new Date(value.from) : null;
            const to = value?.to ? new Date(value.to) : null;
            return (!from || date >= from) && (!to || date <= to);
        },
    },
    {
        id: 'total_transaction',
        accessorKey: 'total_transaction',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total Transaksi Yang Berhasil" />,
        cell: ({ row }) => <span className="max-w-36">{row.getValue('total_transaction')} Transaksi</span>,
        filterFn: (row, columnId, value) => {
            const val = row.getValue(columnId) as number;
            const min = value?.min ?? 0;
            const max = value?.max ?? Infinity;
            return val >= min && val <= max;
        },
        enableHiding: true,
        enableSorting: true,
    },
    {
        id: 'report_type',
        accessorKey: 'report_type',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tipe Laporan" />,
        cell: ({ row }) => {
            const type = row.getValue('report_type') as ReportTypeEnum;
            const colorClass = reportTypeColorMap[type] || 'bg-gray-100 border border-gray-600 text-gray-600';
            const label = {
                [ReportTypeEnum.DAILY]: 'Harian',
                [ReportTypeEnum.WEEKLY]: 'Mingguan',
                [ReportTypeEnum.MONTHLY]: 'Bulanan',
                [ReportTypeEnum.CUSTOM]: 'Custom',
            }[type];

            return <Badge className={`rounded-sm px-2 py-1 text-xs ${colorClass}`}>{label}</Badge>;
        },
        enableHiding: true,
        enableSorting: false,
    },
    {
        id: 'total_revenue',
        accessorKey: 'total_revenue',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total Pendapatan" />,
        cell: ({ row }) => <span className="max-w-36">{formatCurrency(row.getValue('total_revenue'))}</span>,
        filterFn: (row, columnId, value) => {
            const val = row.getValue(columnId) as number;
            const min = value?.min ?? 0;
            const max = value?.max ?? Infinity;
            return val >= min && val <= max;
        },
        enableHiding: true,
        enableSorting: true,
    },

    {
        id: 'actions',
        accessorKey: 'actions',
        header: () => <span className="text-md font-medium text-gray-900 dark:text-gray-200">Aksi</span>,
        cell: ({ row }) => <DataTableRowActions row={row as Row<RevenueReport>} />,
        enableHiding: false,
    },
];
