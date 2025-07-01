import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/react-table';
import { CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CourierStatusFilter<TData>({ column, title = 'Status Verifikasi' }: { column: Column<TData, number>; title?: string }) {
    const [selectedValues, setSelectedValues] = useState<Set<number>>(new Set((column?.getFilterValue() as number[]) ?? []));

    const options = [
        { label: 'Terverifikasi', value: 1 },
        { label: 'Belum Diverifikasi', value: 0 },
    ];

    useEffect(() => {
        const currentFilter = column.getFilterValue() as number[] | undefined;
        setSelectedValues(new Set(currentFilter ?? []));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [column.getFilterValue()]);

    const handleSelect = (value: number) => {
        const newSelectedValues = new Set(selectedValues);
        if (newSelectedValues.has(value)) {
            newSelectedValues.delete(value);
        } else {
            newSelectedValues.add(value);
        }

        setSelectedValues(newSelectedValues);

        const filterValues = Array.from(newSelectedValues);
        column?.setFilterValue(filterValues.length ? filterValues : undefined);
    };

    const handleClearFilter = () => {
        setSelectedValues(new Set());
        column?.setFilterValue(undefined);
    };

    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="outline" size="sm" className="h-9 w-auto border-dashed">
                    <PlusCircledIcon className="h-4 w-4" />
                    {title}
                    {selectedValues.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                        {selectedValues.size} selected
                                    </Badge>
                                ) : (
                                    Array.from(selectedValues).map((value) => {
                                        const label = options.find((opt) => opt.value === value)?.label;
                                        return (
                                            <Badge key={value} variant="secondary" className="rounded-sm px-1 font-normal">
                                                {label}
                                            </Badge>
                                        );
                                    })
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.has(option.value);
                                return (
                                    <CommandItem key={option.value} onSelect={() => handleSelect(option.value)}>
                                        <div
                                            className={`border-primary flex h-4 w-4 items-center justify-center rounded-sm border ${
                                                isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50'
                                            }`}
                                        >
                                            <CheckIcon className={`h-4 w-4 ${!isSelected ? 'invisible' : ''}`} />
                                        </div>
                                        <span className="ml-2">{option.label}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem onSelect={handleClearFilter} className="justify-center text-center">
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
