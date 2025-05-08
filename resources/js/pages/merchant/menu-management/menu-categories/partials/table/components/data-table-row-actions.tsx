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
import { MenuCategory } from '@/models/menu-category';
import { Icon } from '@iconify/react';
import { Link, router } from '@inertiajs/react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { toast } from 'sonner';

export function DataTableRowActions({ row }: { row: Row<MenuCategory> }) {
    const deletedAtAlreadyExist = row.original.deleted_at !== null;

    const handleSoftDelete = () => {
        router.delete(route('merchant.menu-categories.softDelete', { menuCategory: row.original.slug }), {
            onSuccess: () => {
                toast.success('Success', {
                    description: 'Kategori Bisnis Berhasil Dihapus Sementara!',
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

    const handleForceDelete = () => {
        router.delete(route('merchant.menu-categories.forceDelete', { menuCategory: row.original.slug }), {
            onSuccess: () => {
                toast.success('Success', {
                    description: 'Kategori Bisnis Berhasil Dihapus Permanen!',
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

    const handleRestoreData = () => {
        router.patch(
            route('merchant.menu-categories.restore', { menuCategory: row.original.slug }),
            {},
            {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Kategori Bisnis Berhasil Direstore!',
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
                <DropdownMenuContent align="end" className="w-[260px]">
                    <Link href={route('merchant.menu-categories.edit', { menuCategory: row.original.slug })} className="cursor-pointer">
                        <DropdownMenuItem className="cursor-pointer p-3">
                            Edit Data
                            <DropdownMenuShortcut>
                                <Icon icon={'material-symbols:edit'} />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>

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
                                        <AlertDialogDescription>Apakah Kamu Yakin Ingin Menghapus Data ini?</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="cursor-pointer">Batal</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleSoftDelete()} className="cursor-pointer bg-amber-600 transition-all">
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
                                            <Icon icon={'material-symbols:delete'} className="!text-blue-500" />
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
                                        <AlertDialogAction onClick={() => handleRestoreData()} className="cursor-pointer bg-blue-600 transition-all">
                                            Pulihkan
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                    )}

                    {/* Hard Delete */}
                    {deletedAtAlreadyExist && (
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
                                    <AlertDialogAction onClick={() => handleForceDelete()} className="cursor-pointer bg-red-600 transition-all">
                                        Hapus Permanen
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
