import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GenderEnum } from '@/enums/gender-enum';
import AuthLayout from '@/layouts/auth/auth-layout';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import { Head, router, useForm } from '@inertiajs/react';
import { CalendarIcon, LoaderCircle } from 'lucide-react';
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
    birthdate: Date | null;
    gender: GenderEnum | '';
};

export default function RegisterCustomerPage() {
    const [step, setStep] = useState<1 | 2>(1);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);

    const { data, setData, processing, errors, reset } = useForm<RegisterFormStep1 & RegisterFormStep2>({
        full_name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        birthplace: '',
        birthdate: null,
        gender: '',
    });

    const nextStep = () => setStep((prev) => (prev === 1 ? 2 : prev));
    const prevStep = () => setStep((prev) => (prev === 2 ? 1 : prev));

    const [inputValue, setInputValue] = useState(() => {
        return data?.birthdate instanceof Date && !isNaN(data?.birthdate.getTime()) ? data.birthdate.toISOString().split('T')[0] : '';
    });

    const handleInputBirthdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        const parsedData = new Date(event.target.value);
        if (!isNaN(parsedData.getTime())) {
            setData('birthdate', parsedData);
        }
    };

    const isStep1Valid =
        data.full_name.trim() !== '' &&
        data.email.trim() !== '' &&
        data.phone_number.trim() !== '' &&
        data.password.trim() !== '' &&
        data.password_confirmation.trim() !== '';

    const isStep2Valid = data.birthplace.trim() !== '' && data.birthdate instanceof Date && !isNaN(data.birthdate.getTime()) && data.gender !== '';

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
        <AuthLayout
            title="Daftar Sebagai Customer"
            description="Silakan isi data diri Anda untuk melanjutkan dan menikmati layanan pemesanan makanan secara online"
        >
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {/* Step Indicator */}
                <div className="mb-6 flex items-center justify-center gap-8">
                    <div className="flex w-28 flex-col items-center">
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
                    <div className="bg-muted-foreground h-px w-28"></div>
                    <div className="flex w-28 flex-col items-center">
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
                                    className={cn('mt-1 rounded-xl px-4 py-6', errors.full_name && 'border border-red-500')}
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
                                    placeholder="Masukkan alamat email anda"
                                    className={cn('mt-1 rounded-xl px-4 py-6', errors.email && 'border border-red-500')}
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
                                    className={cn('mt-1 rounded-xl px-4 py-6', errors.phone_number && 'border border-red-500')}
                                />
                                <InputError message={errors.phone_number} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        tabIndex={3}
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

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password_confirmation"
                                        type={showPasswordConfirmation ? 'text' : 'password'}
                                        required
                                        tabIndex={3}
                                        autoComplete="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={processing}
                                        placeholder="Konfirmasi Password anda"
                                        className={cn('mt-1 rounded-xl px-4 py-6 pr-12', errors.password_confirmation && 'border border-red-500')}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                                        tabIndex={-1}
                                    >
                                        <Icon icon={showPasswordConfirmation ? 'mdi:eye-off' : 'mdi:eye'} className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            <Button
                                type="button"
                                onClick={nextStep}
                                disabled={processing || !isStep1Valid}
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
                                <Label htmlFor="birthplace">Tempat Lahir</Label>
                                <Input
                                    id="birthplace"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="birthplace"
                                    value={data.birthplace}
                                    onChange={(e) => setData('birthplace', e.target.value)}
                                    disabled={processing}
                                    placeholder="Masukkan nama lengkap anda"
                                    className={cn('mt-1 rounded-xl px-4 py-6', errors.birthplace && 'border border-red-500')}
                                />
                                <InputError message={errors.birthplace} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="birthdate">Tanggal Lahir</Label>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button type="button" variant="outline" className="mt-2.5 w-full px-4 py-6">
                                            {data.birthdate instanceof Date && !isNaN(data.birthdate.getTime()) ? (
                                                <span>{data.birthdate.toDateString()}</span>
                                            ) : (
                                                <span className="text-sm text-gray-400">Masukkan Tanggal Lahir</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-5 w-5 text-gray-500" />
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-auto p-2">
                                        <Input
                                            type="text"
                                            value={inputValue}
                                            onChange={handleInputBirthdate}
                                            className="mb-2 py-6 text-center"
                                            placeholder="tahun-bulan-tanggal"
                                        />

                                        <Calendar
                                            mode="single"
                                            selected={data.birthdate ?? new Date()}
                                            onSelect={(date) => {
                                                setData('birthdate', date ?? null);
                                                setInputValue(date ? date.toISOString().split('T')[0] : '');
                                            }}
                                            disabled={(date) => date > new Date()}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <InputError message={errors.birthplace} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="gender">Jenis Kelamin</Label>
                                <Select onValueChange={(value) => setData('gender', value as GenderEnum)}>
                                    <SelectTrigger className="w-full px-4 py-6">
                                        <SelectValue placeholder="Pilih Jenis Kelamin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(GenderEnum).map((value) => (
                                            <SelectItem key={value} value={value} className="capitalize">
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.gender} className="mt-2" />
                            </div>

                            <div className="flex flex-col items-center justify-between gap-4">
                                <Button
                                    type="submit"
                                    className="w-full cursor-pointer bg-black py-6 transition-all dark:bg-white"
                                    tabIndex={5}
                                    disabled={processing || !isStep2Valid}
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Daftar Sekarang
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
