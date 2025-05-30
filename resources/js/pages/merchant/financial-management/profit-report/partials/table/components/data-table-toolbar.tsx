import { Button } from '@/components/ui/button';
import { DataTableToolbarProps } from '@/types/tanstack';
import { Icon } from '@iconify/react';

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                {/* {table.getColumn('report_date') && <DateRangeFacetedFilter column={table.getColumn('report_date')} title="Rentang Tanggal Laporan" />}

                {table.getColumn('total_transaction') && (
                    <TransactionRangeFacetedFilter column={table.getColumn('total_transaction')} title="Total Transaksi Yang Berhasil" />
                )}

                {table.getColumn('total_revenue') && <RevenueRangeFilter column={table.getColumn('total_revenue')} title="Total Pendapatan" />}

                {table.getColumn('total_expense') && <RevenueRangeFilter column={table.getColumn('total_expense')} title="Total Pengeluaran" />}

                {table.getColumn('gross_profit') && <RevenueRangeFilter column={table.getColumn('gross_profit')} title="Laba Kotor" />}

                {table.getColumn('net_profit') && <RevenueRangeFilter column={table.getColumn('net_profit')} title="Laba Bersih" />} */}

                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 cursor-pointer px-2 lg:px-3">
                        Reset
                        <Icon icon={'material-symbols:close'} className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
