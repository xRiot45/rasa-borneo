import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { Table } from '@tanstack/react-table';
import { format } from 'date-fns';

interface ButtonPartialsProps<TData> {
    table: Table<TData>;
}

interface DateFilterValue {
    from?: Date;
    to?: Date;
}

export default function ButtonCSV<TData>({ table }: ButtonPartialsProps<TData>) {
    const filters = table.getState().columnFilters;
    const dateFilter = filters.find((f) => f.id === 'report_date') as { id: string; value: DateFilterValue };
    const from = dateFilter?.value?.from ? format(dateFilter.value.from, 'yyyy-MM-dd') : null;
    const to = dateFilter?.value?.to ? format(dateFilter.value.to, 'yyyy-MM-dd') : null;

    const exportUrl = new URL(route('merchant.expense-report.export'));

    if (from) exportUrl.searchParams.append('from', from);
    if (to) exportUrl.searchParams.append('to', to);

    return (
        <div className="flex gap-2">
            <a href={exportUrl.toString()}>
                <Button className="cursor-pointer bg-green-600 hover:bg-green-700">
                    <span>Export Ke CSV</span>
                    <Icon icon={'teenyicons:csv-solid'} className="text-background" />
                </Button>
            </a>
        </div>
    );
}
