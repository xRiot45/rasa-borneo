import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BusinessCategory } from '@/models/business-category';
import { DataTableToolbarProps } from '@/types/tanstack';
import { Icon } from '@iconify/react';
import { usePage } from '@inertiajs/react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { MerchantStatusFilter } from './data-table-status-filter';
import { DataTableViewOptions } from './data-table-view-options';

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const { businessCategories }: { businessCategories: BusinessCategory[] } = usePage<{ businessCategories: BusinessCategory[] }>().props;
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="items-center justify-between lg:flex">
            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                <Input
                    placeholder="Cari nama usaha..."
                    value={(table.getColumn('business_name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('business_name')?.setFilterValue(event.target.value)}
                    className="h-8 w-full sm:w-[150px] lg:w-[250px]"
                />

                <Input
                    placeholder="Cari email usaha..."
                    value={(table.getColumn('business_email')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('business_email')?.setFilterValue(event.target.value)}
                    className="h-8 w-full sm:w-[150px] lg:w-[250px]"
                />

                <Input
                    placeholder="Cari nomor telepon usaha..."
                    value={(table.getColumn('business_phone')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('business_phone')?.setFilterValue(event.target.value)}
                    className="h-8 w-full sm:w-[150px] lg:w-[250px]"
                />

                <div className="flex gap-x-2">
                    {table.getColumn('business_category') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('business_category')}
                            title="Cari Berdasarkan Kategori Usaha"
                            options={businessCategories.map((businessCategory) => ({
                                label: businessCategory.name,
                                value: businessCategory.name,
                            }))}
                        />
                    )}
                </div>

                <div className="flex gap-x-2">
                    <div className="flex gap-x-2">
                        {table.getColumn('merchant_status') && <MerchantStatusFilter column={table.getColumn('merchant_status')} />}
                    </div>
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
