import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type RegisterFormStep1 = {
    full_name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
};

// type RegisterFormStep2 = {};

// type RegisterFormStep3 = {};

// type RegisterFormStep4 = {};

export default function RegisterMerchantPage() {
    const [step, setStep] = useState<number>(1);

    const { data, setData, post, processing, errors, reset } = useForm<RegisterFormStep1>({
        full_name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
    });

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Daftar Sebagai Penjual" description="Silahkan isi data usaha anda untuk melanjutkan dan menjual produk anda secara online">
            <Head title="Register" />
            {/* Step Indicator */}
            <div className="mb-10 grid grid-cols-2 gap-10">
                {[
                    { stepNumber: 1, label: 'Infomasi Akun' },
                    { stepNumber: 2, label: 'Informasi Pribadi' },
                    { stepNumber: 3, label: 'Informasi Bisnis' },
                    { stepNumber: 4, label: 'Informasi Rekening Bank' },
                ].map(({ stepNumber, label }) => (
                    <div key={stepNumber} className="flex flex-col items-center">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all ${
                                step >= stepNumber
                                    ? 'border-black bg-black text-white dark:bg-white dark:text-black'
                                    : 'border-muted text-muted-foreground'
                            }`}
                        >
                            {stepNumber}
                        </div>
                        <span className={`mt-2 text-sm ${step >= stepNumber ? 'font-medium text-black dark:text-white' : 'text-muted-foreground'}`}>
                            {label}
                        </span>
                    </div>
                ))}
            </div>

            <form className="flex flex-col gap-6" onSubmit={submit}>
                {/* Step 1 => Informasi Akun */}
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

                {/* Step 2 => Informasi Pribadi */}
                {step === 2 && (
                    <>
                        <h1>Informasi Pribadi</h1>
                        <div className="flex flex-col items-center justify-between gap-4">
                            <Button
                                type="button"
                                onClick={nextStep}
                                disabled={processing}
                                className="w-full cursor-pointer bg-black py-6 transition-all dark:bg-white"
                            >
                                Lanjut
                            </Button>
                            <Button type="button" onClick={prevStep} variant="outline" className="w-full cursor-pointer py-6">
                                Kembali ke langkah sebelumnya
                            </Button>
                        </div>
                    </>
                )}

                {/* Step 3 => Informasi Bisnis */}
                {step === 3 && (
                    <>
                        <h1>Informasi Bisnis</h1>
                        <div className="flex flex-col items-center justify-between gap-4">
                            <Button
                                type="button"
                                onClick={nextStep}
                                disabled={processing}
                                className="w-full cursor-pointer bg-black py-6 transition-all dark:bg-white"
                            >
                                Lanjut
                            </Button>
                            <Button type="button" onClick={prevStep} variant="outline" className="w-full cursor-pointer py-6">
                                Kembali ke langkah sebelumnya
                            </Button>
                        </div>
                    </>
                )}

                {/* Step 4 => Informasi Rekening Bank */}
                {step === 4 && (
                    <>
                        <h1>Informasi Rekening Bank</h1>
                        <Button type="submit" className="cursor-pointer bg-black py-6 transition-all" tabIndex={5} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Register
                        </Button>
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
