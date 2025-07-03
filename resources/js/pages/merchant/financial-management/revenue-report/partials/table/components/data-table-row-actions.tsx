import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { RevenueReport } from '@/models/financial-management/revenue-report';
import { Icon } from '@iconify/react';
import { Link } from '@inertiajs/react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

export function DataTableRowActions({ row }: { row: Row<RevenueReport> }) {
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
                    <DropdownMenuItem asChild className="p-4">
                        <Link href={route('merchant.revenue-report.detailReport', { reportDate: row.original.report_date })} className="p-3">
                            Lihat Detail Laporan
                            <DropdownMenuShortcut>
                                <Icon icon={'material-symbols:open-in-new'} />
                            </DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="p-4">
                        <a
                            href={route('merchant.revenue-report.exportByDate', row.original.report_date)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3"
                        >
                            Export Ke CSV
                            <DropdownMenuShortcut>
                                <Icon icon={'teenyicons:csv-solid'} />
                            </DropdownMenuShortcut>
                        </a>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
