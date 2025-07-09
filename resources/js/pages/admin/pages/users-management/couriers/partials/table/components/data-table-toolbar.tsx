import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableToolbarProps } from '@/types/tanstack';
import { Icon } from '@iconify/react';
import { DataTableViewOptions } from './data-table-view-options';
import { CourierStatusFilter } from './filters/status-filter';

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="items-center justify-between lg:flex">
            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                <Input
                    placeholder="Cari nama lengkap kurir..."
                    value={(table.getColumn('user.full_name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('user.full_name')?.setFilterValue(event.target.value)}
                    className="h-10 w-full shadow-none sm:w-[150px] lg:w-[250px]"
                />

                <Input
                    placeholder="Cari email kurir..."
                    value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
                    className="h-10 w-full shadow-none sm:w-[150px] lg:w-[250px]"
                />

                <Input
                    placeholder="Cari nomor telepon kurir..."
                    value={(table.getColumn('user.phone_number')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('user.phone_number')?.setFilterValue(event.target.value)}
                    className="h-10 w-full shadow-none sm:w-[150px] lg:w-[250px]"
                />

                <div className="flex gap-x-2">
                    {table.getColumn('is_verified') && <CourierStatusFilter column={table.getColumn('is_verified')} />}
                </div>

                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 cursor-pointer px-2 lg:px-3">
                        Reset
                        <Icon icon={'material-symbols:close'} className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            <div className="flex justify-between gap-2">
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}
