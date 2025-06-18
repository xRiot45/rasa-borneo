import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'sonner';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm<Required<{ password: string }>>({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('admin.setting.profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                passwordInput.current?.focus();
                toast.success('Success', {
                    description: 'Akun Berhasil Dihapus!',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
                closeModal();
            },
            onError: (errors) => {
                passwordInput.current?.focus();

                if (errors.current_password) {
                    toast.error('Password Salah', {
                        description: errors.current_password,
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                } else {
                    toast.error('Failed', {
                        description: 'Akun gagal dihapus',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                }
            },
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <div className="space-y-6">
            <HeadingSmall title="Hapus Akun" description="Hapus akun Anda dan semua sumber dayanya" />
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">Warning!</p>
                    <p className="text-sm">Harap lanjutkan dengan hati-hati, ini tidak dapat dibatalkan.</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Hapus Akun</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogTitle>Apakah Anda yakin ingin menghapus akun Anda?</DialogTitle>
                        <DialogDescription>
                            Setelah akun Anda dihapus, semua sumber daya dan datanya juga akan dihapus secara permanen. Masukkan kata sandi Anda untuk
                            mengonfirmasi bahwa Anda ingin menghapus akun Anda secara permanen.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={deleteUser}>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="sr-only">
                                    Password
                                </Label>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    className="rounded-lg py-6"
                                />

                                <InputError message={errors.password} />
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Batalkan
                                    </Button>
                                </DialogClose>

                                <Button variant="destructive" disabled={processing} asChild>
                                    <button type="submit">Hapus Akun</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
