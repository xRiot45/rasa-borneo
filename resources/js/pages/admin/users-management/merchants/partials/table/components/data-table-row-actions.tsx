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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Merchant } from '@/models/merchant';
import { Icon } from '@iconify/react';
import { Link, router } from '@inertiajs/react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

export function DataTableRowActions({ row }: { row: Row<Merchant> }) {
    const merchantIsVerified = row.original.is_verified;

    const handleVerifyMerchant = (id: number) => {
        router.put(
            route('admin.merchants.verify', { id }),
            {},
            {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Merchant Berhasil Diverifikasi!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                },
                onError: (error) => {
                    Object.keys(error).forEach((key) => {
                        toast.error('Error', {
                            description: error[key],
                            action: {
                                label: 'Tutup',
                                onClick: () => toast.dismiss(),
                            },
                        });
                    });
                },
            },
        );
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
                <DropdownMenuContent align="end" className="w-[250px]">
                    <Link href={route('admin.all-users.edit', { id: row.original.id })} className="cursor-po">
                        <DropdownMenuItem className="cursor-pointer">
                            Lihat Detail Merchant
                            <DropdownMenuShortcut>
                                <Icon icon={'material-symbols:storefront'} />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>

                    {!merchantIsVerified && (
                        <>
                            <DropdownMenuSeparator />
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="cursor-pointer !text-blue-500" onSelect={(e) => e.preventDefault()}>
                                        Verifikasi Merchant
                                        <DropdownMenuShortcut>
                                            <Icon icon={'material-symbols:verified'} className="!text-blue-500" />
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Verifikasi Merchant</AlertDialogTitle>
                                        <AlertDialogDescription>Apakah Kamu Yakin Ingin Memverifikasi Data Merchant Ini?</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="cursor-pointer">Batal</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleVerifyMerchant(row.original.id)}
                                            className="cursor-pointer bg-blue-600 transition-all"
                                        >
                                            {row.original.is_verified ? 'Tidak Verifikasi' : 'Verifikasi'}
                                            {row.original.is_verified ? (
                                                <LoaderCircle className="animate-spin" />
                                            ) : (
                                                <Icon icon={'material-symbols:verified'} />
                                            )}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
