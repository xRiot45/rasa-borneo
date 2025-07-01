import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Order } from '@/models/order';
import { Icon } from '@iconify/react';
import { Link } from '@inertiajs/react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

export function DataTableRowActions({ row }: { row: Row<Order> }) {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" className="data-[state=open]:bg-muted flex h-8 w-8 p-0">
                        <DotsHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[260px]">
                    <Link href={route('admin.order.show', row.original.transaction_code)} className="cursor-pointer">
                        <DropdownMenuItem className="cursor-pointer p-3">
                            Lihat Detail Pesanan
                            <DropdownMenuShortcut>
                                <Icon icon={'bx:detail'} />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
