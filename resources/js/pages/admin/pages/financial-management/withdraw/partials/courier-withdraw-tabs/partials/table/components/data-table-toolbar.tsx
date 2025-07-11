import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WithdrawStatusEnum } from '@/enums/withdraw-status';
import { DataTableToolbarProps } from '@/types/tanstack';
import { Icon } from '@iconify/react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder="Cari kode penarikan..."
                    value={(table.getColumn('withdraw_code')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('withdraw_code')?.setFilterValue(event.target.value)}
                    className="h-10 w-full shadow-none sm:w-[150px] lg:w-[250px]"
                />
                <div className="flex gap-x-2">
                    {table.getColumn('status') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('status')}
                            title="Cari berdasarkan status"
                            options={Object.values(WithdrawStatusEnum).map((status) => ({
                                label: status,
                                value: status,
                            }))}
                        />
                    )}
                </div>

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
