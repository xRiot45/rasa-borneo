import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { Table } from '@tanstack/react-table';
import { format } from 'date-fns';

interface ButtonCSVProps<TData> {
    table: Table<TData>;
}

export default function ButtonCSV<TData>({ table }: ButtonCSVProps<TData>) {
    const filters = table.getState().columnFilters;

    const startDateFilter = filters.find((f) => f.id === 'start_date') as { id: string; value: Date };
    const endDateFilter = filters.find((f) => f.id === 'end_date') as { id: string; value: Date };

    const startDate = startDateFilter?.value ? format(startDateFilter.value, 'yyyy-MM-dd') : null;
    const endDate = endDateFilter?.value ? format(endDateFilter.value, 'yyyy-MM-dd') : null;

    const exportUrl = new URL(route('merchant.profit-report.export'));

    if (startDate) exportUrl.searchParams.append('start_date', startDate);
    if (endDate) exportUrl.searchParams.append('end_date', endDate);

    return (
        <div className="flex gap-2">
            <a href={exportUrl.toString()}>
                <Button className="cursor-pointer bg-green-600 text-white hover:bg-green-700">
                    <span>Export Ke CSV</span>
                    <Icon icon="teenyicons:csv-solid" className="ml-2" />
                </Button>
            </a>
        </div>
    );
}
