import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth/auth-layout';
import { cn } from '@/lib/utils';
import { LoginForm } from '@/models/auth/login';
import { Icon } from '@iconify/react';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    status?: string;
    canResetPassword: boolean;
}

export default function LoginPage({ status, canResetPassword }: Props) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { data, setData, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(
            route('login'),
            { ...data },
            {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Login Berhasil!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                    reset();
                },
                onError: () => {
                    toast.success('Failed', {
                        description: 'Email atau password yang anda masukkan salah!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                },
            },
        );
    };

    return (
        <AuthLayout title="Log In Ke Akun Anda" description="Masukkan email dan password anda untuk melanjutkan login ke akun anda">
            <Head title="Log in" />

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Alamat Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Masukkan email anda"
                            className={cn('mt-1 rounded-xl px-4 py-6', errors.email && 'border border-red-500')}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    Lupa password?
                                </TextLink>
                            )}
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Masukkan password anda"
                                className={cn('mt-1 rounded-xl px-4 py-6 pr-12', errors.password && 'border border-red-500')}
                            />
                            <Button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                                tabIndex={-1}
                            >
                                <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} className="h-5 w-5" />
                            </Button>
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">Ingatkan saya</Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-black py-6 transition-all dark:bg-white"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {!processing && <Icon icon="mdi:login" className="h-4 w-4" />}
                        Log in
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="flex w-full items-center justify-center gap-2 border py-6"
                        onClick={() => (window.location.href = route('google.redirect'))}
                    >
                        <Icon icon="flat-color-icons:google" className="h-5 w-5" />
                        Login dengan Google
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Sudah memiliki akun?{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        Register
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
