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
import { BusinessCategory } from '@/models/business-category';
import { Icon } from '@iconify/react';
import { Link, router } from '@inertiajs/react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { toast } from 'sonner';

export function DataTableRowActions({ row }: { row: Row<BusinessCategory> }) {
    const deletedAtAlreadyExist = row.original.deleted_at !== null;

    const handleSoftDelete = (id: number) => {
        router.delete(route('admin.business-category.softDelete', { id }), {
            onSuccess: () => {
                toast('Success', {
                    description: 'Kategori Bisnis Berhasil Dihapus!',
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

    const handleHardDelete = (id: number) => {
        router.delete(route('admin.business-category.destroy', { id }), {
            onSuccess: () => {
                toast('Success', {
                    description: 'Kategori Bisnis Berhasil Dihapus!',
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
                    <Link href={route('admin.business-category.edit', { id: row.original.id })} className="cursor-po">
                        <DropdownMenuItem className="cursor-pointer">
                            Edit Data
                            <DropdownMenuShortcut>
                                <Icon icon={'material-symbols:edit'} />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    {!deletedAtAlreadyExist && (
                        <>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="cursor-pointer !text-amber-600" onSelect={(e) => e.preventDefault()}>
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
                                        <AlertDialogAction
                                            onClick={() => handleSoftDelete(row.original.id)}
                                            className="cursor-pointer bg-amber-600 transition-all"
                                        >
                                            Hapus
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <DropdownMenuSeparator />
                        </>
                    )}

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="cursor-pointer !text-red-500" onSelect={(e) => e.preventDefault()}>
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
                                    onClick={() => handleHardDelete(row.original.id)}
                                    className="cursor-pointer bg-red-600 transition-all"
                                >
                                    Hapus
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
