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
    const deletedAtAlreadyExist = row.original.deleted_at !== null;

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

    const handleSoftDelete = (id: number) => {
        router.delete(route('admin.merchants.softDelete', { id }), {
            onSuccess: () => {
                toast.success('Success', {
                    description: 'Merchant Berhasil Dihapus Sementara!',
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
        });
    };

    const handleForceDelete = (id: number) => {
        router.delete(route('admin.merchants.forceDelete', { id }), {
            onSuccess: () => {
                toast.success('Success', {
                    description: 'Merchant Berhasil Dihapus Permanen!',
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
        });
    };

    const handleRestoreData = (id: number) => {
        router.patch(
            route('admin.merchants.restore', { id }),
            {},
            {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Merchant Berhasil Direstore!',
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
                    <Link href={route('admin.merchants.edit', { id: row.original.id })} className="cursor-po">
                        <DropdownMenuItem className="cursor-pointer p-3">
                            Edit Merchant
                            <DropdownMenuShortcut>
                                <Icon icon={'heroicons:pencil'} />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>

                    <Link href={route('admin.merchants.show', { id: row.original.id })} className="cursor-po">
                        <DropdownMenuItem className="cursor-pointer p-3">
                            Lihat Detail Merchant
                            <DropdownMenuShortcut>
                                <Icon icon={'material-symbols:storefront'} />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>

                    {/* Verify Merchant */}
                    {!merchantIsVerified && (
                        <>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="cursor-pointer p-3 !text-blue-500" onSelect={(e) => e.preventDefault()}>
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
                            <DropdownMenuSeparator />
                        </>
                    )}

                    {/* Soft Delete */}
                    {!deletedAtAlreadyExist && (
                        <>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="cursor-pointer p-3 !text-amber-600" onSelect={(e) => e.preventDefault()}>
                                        Hapus Data Sementara
                                        <DropdownMenuShortcut>
                                            <Icon icon={'material-symbols:auto-delete'} className="!text-amber-600" />
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Hapus Data Sementara</AlertDialogTitle>
                                        <AlertDialogDescription>Apakah Kamu Yakin Ingin Menghapus Data ini Sementara?</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="cursor-pointer">Batal</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleSoftDelete(row.original.id)}
                                            className="cursor-pointer bg-amber-600 transition-all"
                                        >
                                            Hapus Sementara
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                    )}

                    {/* Restore Data */}
                    {deletedAtAlreadyExist && (
                        <>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="cursor-pointer p-3 !text-blue-500" onSelect={(e) => e.preventDefault()}>
                                        Pulihkan Data
                                        <DropdownMenuShortcut>
                                            <Icon icon={'fa-solid:trash-restore-alt'} className="!text-blue-500" />
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Pulihkan Data</AlertDialogTitle>
                                        <AlertDialogDescription>Apakah Kamu Yakin Ingin Memulihkan Data ini?</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="cursor-pointer">Batal</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleRestoreData(row.original.id)}
                                            className="cursor-pointer bg-blue-600 transition-all"
                                        >
                                            Pulihkan
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <DropdownMenuSeparator />
                        </>
                    )}

                    {/* Hard Delete */}
                    {deletedAtAlreadyExist && (
                        <>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="cursor-pointer p-3 !text-red-500" onSelect={(e) => e.preventDefault()}>
                                        Hapus Data Permanen
                                        <DropdownMenuShortcut>
                                            <Icon icon={'material-symbols:delete'} className="!text-red-500" />
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Hapus Data Permanen</AlertDialogTitle>
                                        <AlertDialogDescription>Apakah Kamu Yakin Ingin Menghapus Data ini?</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="cursor-pointer">Batal</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleForceDelete(row.original.id)}
                                            className="cursor-pointer bg-red-600 transition-all"
                                        >
                                            Hapus Permanen
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
