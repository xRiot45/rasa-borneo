import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ExpenseReport } from '@/models/financial-management/expense-report';
import { Icon } from '@iconify/react';
import { Link, router } from '@inertiajs/react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { toast } from 'sonner';

export function DataTableRowActions({ row }: { row: Row<ExpenseReport> }) {
    const handleDeleteExpenseReport = (id: number) => {
        router.delete(route('merchant.expense-report.destroy', { id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Success', {
                    description: 'Laporan Pengeluaran Berhasil Dihapus',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
            },
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    toast.error('Error', {
                        description: errors[key],
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                });
            },
        });
    };

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
                    <Link href={route('merchant.expense-report.detailReport', { reportDate: row.original.report_date })}>
                        <DropdownMenuItem className="cursor-pointer p-3">
                            Lihat Detail Laporan
                            <DropdownMenuShortcut>
                                <Icon icon={'material-symbols:open-in-new'} />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem asChild className="p-4">
                        <a
                            href={route('merchant.expense-report.exportByDate', row.original.report_date)}
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
                    <Link href={route('merchant.expense-report.edit', { id: row.original.id })}>
                        <DropdownMenuItem className="cursor-pointer p-3">
                            Edit Laporan
                            <DropdownMenuShortcut>
                                <Icon icon={'material-symbols:edit'} />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="cursor-pointer p-3 !text-red-500" onSelect={(e) => e.preventDefault()}>
                                Hapus Data
                                <DropdownMenuShortcut>
                                    <Icon icon={'material-symbols:delete'} className="!text-red-500" />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Data</AlertDialogTitle>
                                <AlertDialogDescription>Apakah Kamu Yakin Ingin Menghapus Data ini?</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="cursor-pointer">Batal</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => handleDeleteExpenseReport(row?.original?.id)}
                                    className="cursor-pointer bg-red-600 transition-all"
                                >
                                    Hapus Permanen
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
