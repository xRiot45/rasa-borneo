'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface DatePickerProps {
    date: Date | null;
    onChange: (date: Date | undefined) => void;
}

export function DatePicker({ date, onChange }: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="outline" className="w-full justify-start rounded-lg py-6 text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pilih tanggal</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="z-[999] w-auto p-0" align="start">
                <Calendar mode="single" selected={date || undefined} onSelect={onChange} initialFocus />
            </PopoverContent>
        </Popover>
    );
}
