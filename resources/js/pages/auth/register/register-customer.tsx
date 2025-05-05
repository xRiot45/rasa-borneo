import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GenderEnum } from '@/enums/gender-enum';
import AuthLayout from '@/layouts/auth/auth-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

type RegisterFormStep1 = {
    full_name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
};

type RegisterFormStep2 = {
    birthplace: string;
    birthdate: string;
    gender: GenderEnum;
};

export default function RegisterCustomerPage() {
    const [step, setStep] = useState<1 | 2>(1);

    const { data, setData, processing, errors, reset } = useForm<RegisterFormStep1 & RegisterFormStep2>({
        full_name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        birthplace: '',
        birthdate: '',
        gender: GenderEnum.MALE,
    });

    const nextStep = () => setStep((prev) => (prev === 1 ? 2 : prev));
    const prevStep = () => setStep((prev) => (prev === 2 ? 1 : prev));

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(
            route('register.customer.store'),
            { ...data },
            {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Register Berhasil!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                    reset();
                },
                onError: () => {
                    toast.error('Error', {
                        description: 'Register Gagal!',
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
        <AuthLayout
            title="Daftar Sebagai Customer"
            description="Silakan isi data diri Anda untuk melanjutkan dan menikmati layanan pemesanan makanan secara online"
        >
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="mb-6 flex items-center justify-center gap-8">
                    <div className="flex flex-col items-center">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all ${
                                step >= 1 ? 'border-black bg-black text-white dark:bg-white dark:text-black' : 'border-muted text-muted-foreground'
                            }`}
                        >
                            1
                        </div>
                        <span className={`mt-2 text-sm ${step >= 1 ? 'font-medium text-black dark:text-white' : 'text-muted-foreground'}`}>
                            Info Akun
                        </span>
                    </div>
                    <div className="bg-muted-foreground h-px w-40"></div>
                    <div className="flex flex-col items-center">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all ${
                                step >= 2 ? 'border-black bg-black text-white dark:bg-white dark:text-black' : 'border-muted text-muted-foreground'
                            }`}
                        >
                            2
                        </div>
                        <span className={`mt-2 text-sm ${step >= 2 ? 'font-medium text-black dark:text-white' : 'text-muted-foreground'}`}>
                            Info Tambahan
                        </span>
                    </div>
                </div>

                {step === 1 && (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="full_name">Nama Lengkap</Label>
                                <Input
                                    id="full_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="full_name"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Masukkan nama lengkap anda"
                                    className="rounded-xl px-4 py-6"
                                />
                                <InputError message={errors.full_name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Alamat Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                    placeholder="email@example.com"
                                    className="rounded-xl px-4 py-6"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone_number">Nomor Telepon</Label>
                                <Input
                                    id="phone_number"
                                    type="number"
                                    required
                                    tabIndex={2}
                                    autoComplete="phone_number"
                                    value={data.phone_number}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                    disabled={processing}
                                    placeholder="Masukkan nomor telepon anda"
                                    className="rounded-xl px-4 py-6"
                                />
                                <InputError message={errors.phone_number} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    placeholder="Password"
                                    className="rounded-xl px-4 py-6"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    placeholder="Confirm password"
                                    className="rounded-xl px-4 py-6"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button
                                type="button"
                                onClick={nextStep}
                                disabled={processing}
                                className="w-full cursor-pointer bg-black py-6 transition-all dark:bg-white"
                            >
                                Lanjut
                            </Button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="full_name">Nama Lengkap</Label>
                                <Input
                                    id="full_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="full_name"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Masukkan nama lengkap anda"
                                    className="rounded-xl px-4 py-6"
                                />
                                <InputError message={errors.full_name} className="mt-2" />
                            </div>

                            <div className="flex flex-col items-center justify-between gap-4">
                                <Button
                                    type="submit"
                                    className="w-full cursor-pointer bg-black py-6 transition-all dark:bg-white"
                                    tabIndex={5}
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Register
                                </Button>
                                <Button type="button" onClick={prevStep} variant="outline" className="w-full cursor-pointer py-6">
                                    Kembali ke langkah sebelumnya
                                </Button>
                            </div>
                        </div>
                    </>
                )}

                <div className="text-muted-foreground text-center text-sm">
                    Sudah memiliki akun?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
