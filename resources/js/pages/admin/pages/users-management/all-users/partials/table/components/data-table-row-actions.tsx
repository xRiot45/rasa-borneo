import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { UserDeleteForm } from '@/models/user';
import { User } from '@/types';
import { Icon } from '@iconify/react';
import { Link, router, useForm } from '@inertiajs/react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function DataTableRowActions({ row }: { row: Row<User> }) {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const { data, setData, processing, reset } = useForm<Required<UserDeleteForm>>({
        password: '',
    });

    const handleDelete = (userId: number) => {
        router.delete(route('admin.all-users.destroy', { id: userId }), {
            data: { password: data.password },
            onSuccess: () => {
                toast.success('Success', {
                    description: 'Pengguna Berhasil Dihapus!',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
                setOpenDialog(false);
                reset();
            },
            onError: (error) => {
                reset();
                toast.error('Error', {
                    description: error.message || 'Pengguna Gagal Dihapus!',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
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
                    <Link href={route('admin.all-users.edit', { id: row.original.id })}>
                        <DropdownMenuItem className="flex items-center justify-between p-4">
                            Edit Data
                            <Icon icon={'material-symbols:edit'} />
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="flex items-center justify-between p-4 !text-red-500"
                        onSelect={(e) => {
                            e.preventDefault();
                            setOpenDialog(true); // trigger dialog dari luar
                        }}
                    >
                        Hapus Data
                        <Icon icon={'material-symbols:delete'} className="text-red-500" />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialog diletakkan DI LUAR dropdown */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Hapus Data</DialogTitle>
                        <DialogDescription>Apakah Kamu Yakin Ingin Menghapus Data ini?</DialogDescription>
                    </DialogHeader>
                    <Input
                        type="password"
                        placeholder="Masukkan password Anda"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="py-6"
                        autoFocus
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button" onClick={() => setOpenDialog(false)}>
                                Batal
                            </Button>
                        </DialogClose>
                        <Button
                            onClick={() => handleDelete(row.original.id)}
                            className="bg-red-600 text-white hover:bg-red-700"
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Hapus Pengguna
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
