import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover } from '@/components/ui/popover';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Column } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props<TData, TValue> {
    column: Column<TData, TValue>;
    title?: string;
}

export function DateFacetedFilter<TData, TValue>({ column, title = 'Tanggal' }: Props<TData, TValue>) {
    const selectedDate = column.getFilterValue() as Date | undefined;
    const [date, setDate] = useState<Date | undefined>(selectedDate);

    useEffect(() => {
        setDate(selectedDate);
    }, [selectedDate]);

    const handleSelect = (selected: Date | undefined) => {
        setDate(selected);
        column.setFilterValue(selected);
    };

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="outline" className="w-[250px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'LLL dd, y') : <span>{title}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="z-50 mt-4 w-auto rounded-md border bg-white p-0 shadow-lg" align="start">
                <Calendar mode="single" selected={date} onSelect={handleSelect} />
            </PopoverContent>
        </Popover>
    );
}
