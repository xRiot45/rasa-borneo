import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MerchantLayout from '@/layouts/merchant/layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import DeleteUser from './components/delete-user';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
}

type ProfileForm = {
    full_name: string;
    email: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan',
        href: '#',
    },
    {
        title: 'Profile',
        href: '/settings/profile',
    },
];

export default function Profile({ mustVerifyEmail, status }: Props) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, put, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        full_name: auth.user.full_name,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('merchant.setting.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Success', {
                    description: 'Profile Berhasil Diedit!',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
            },
            onError: () => {
                toast.error('Failed', {
                    description: 'Profile gagal diupdate',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
            },
        });
    };

    return (
        <MerchantLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <main className="space-y-6 p-4">
                <HeadingSmall title="Informasi Akun" description="Update data akun anda" />

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="full_name">Nama Lengkap</Label>

                        <Input
                            id="full_name"
                            className={cn('mt-2 rounded-lg py-6 shadow-none', errors.full_name && 'border border-red-500')}
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            required
                            autoComplete="full_name"
                            placeholder="Masukkan nama lengkap anda"
                        />

                        <InputError className="mt-2" message={errors.full_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Alamat Email</Label>

                        <Input
                            id="email"
                            type="email"
                            className={cn('mt-2 rounded-lg py-6 shadow-none', errors.email && 'border border-red-500')}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            readOnly
                            placeholder="Alamat email"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                        <div>
                            <p className="text-muted-foreground -mt-4 text-sm">
                                Your email address is unverified.{' '}
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                >
                                    Click here to resend the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>
                            Simpan Perubahan
                            {processing && <Loader className="ml-2 h-5 w-5" />}
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Saved</p>
                        </Transition>
                    </div>
                </form>
                <DeleteUser />
            </main>
        </MerchantLayout>
    );
}
