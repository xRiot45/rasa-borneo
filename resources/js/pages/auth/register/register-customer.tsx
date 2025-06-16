import InputError from '@/components/input-error';
import Stepper from '@/components/stepper';
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
import { RegisterAccountInfo, RegisterPersonalInfo } from '@/models/auth/register-customer';
import { Icon } from '@iconify/react';
import { Head, router, useForm } from '@inertiajs/react';
import { CalendarIcon, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

export default function RegisterCustomerPage() {
    const [step, setStep] = useState<1 | 2>(1);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);

    const { data, setData, processing, errors, reset } = useForm<RegisterAccountInfo & RegisterPersonalInfo>({
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
        <>
            <Head title="Daftar Sebagai Customer" />
            <AuthLayout
                title="Daftar Sebagai Customer"
                description="Silakan isi data diri Anda untuk melanjutkan dan menikmati layanan pemesanan makanan secara online"
            >
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    {/* Step Indicator */}
                    <Stepper currentStep={step} steps={['Info Akun', 'Info Tambahan']} />

                    {step === 1 && (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="full_name">
                                        Nama Lengkap <strong className="text-red-500">*</strong>
                                    </Label>
                                    <Input
                                        id="full_name"
                                        type="text"
                                        required
                                        autoFocus
                                        autoComplete="full_name"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Masukkan nama lengkap anda"
                                        className={cn(
                                            'mt-2 rounded-xl px-4 py-6 shadow-none placeholder:text-sm',
                                            errors.full_name && 'border border-red-500',
                                        )}
                                    />
                                    <InputError message={errors.full_name} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">
                                        Alamat Email <strong className="text-red-500">*</strong>
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        placeholder="Masukkan alamat email anda"
                                        className={cn(
                                            'mt-2 rounded-xl px-4 py-6 shadow-none placeholder:text-sm',
                                            errors.email && 'border border-red-500',
                                        )}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone_number">
                                        Nomor Telepon <strong className="text-red-500">*</strong>
                                    </Label>
                                    <Input
                                        id="phone_number"
                                        type="number"
                                        required
                                        autoComplete="phone_number"
                                        value={data.phone_number}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        disabled={processing}
                                        placeholder="Masukkan nomor telepon anda"
                                        className={cn(
                                            'mt-2 rounded-xl px-4 py-6 shadow-none placeholder:text-sm',
                                            errors.phone_number && 'border border-red-500',
                                        )}
                                    />
                                    <InputError message={errors.phone_number} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">
                                        Password <strong className="text-red-500">*</strong>
                                    </Label>
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
                                            className={cn(
                                                'mt-2 rounded-xl px-4 py-6 shadow-none placeholder:text-sm',
                                                errors.password && 'border border-red-500',
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute top-8 right-4 -translate-y-1/2 cursor-pointer rounded-md"
                                        >
                                            <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} className="h-5 w-5" />
                                        </Button>
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">
                                        Konfirmasi Password <strong className="text-red-500">*</strong>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password_confirmation"
                                            type={showPasswordConfirmation ? 'text' : 'password'}
                                            required
                                            autoComplete="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            disabled={processing}
                                            placeholder="Konfirmasi password anda"
                                            className={cn(
                                                'mt-2 rounded-xl px-4 py-6 shadow-none placeholder:text-sm',
                                                errors.password_confirmation && 'border border-red-500',
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                            className="absolute top-8 right-4 -translate-y-1/2 cursor-pointer rounded-md"
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
                                    Lanjut ke langkah selanjutnya
                                    <Icon icon="mdi:arrow-right" className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="birthplace">
                                        Tempat Lahir <strong className="text-red-500">*</strong>
                                    </Label>
                                    <Input
                                        id="birthplace"
                                        type="text"
                                        required
                                        autoFocus
                                        autoComplete="birthplace"
                                        value={data.birthplace}
                                        onChange={(e) => setData('birthplace', e.target.value)}
                                        disabled={processing}
                                        placeholder="Masukkan tempat lahir anda anda"
                                        className={cn(
                                            'mt-2 rounded-xl px-4 py-6 shadow-none placeholder:text-sm',
                                            errors.birthplace && 'border border-red-500',
                                        )}
                                    />
                                    <InputError message={errors.birthplace} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="birthdate">
                                        Tanggal Lahir <strong className="text-red-500">*</strong>
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="mt-2 w-full rounded-lg px-4 py-6 shadow-none placeholder:text-sm"
                                            >
                                                {data.birthdate instanceof Date && !isNaN(data.birthdate.getTime()) ? (
                                                    <span>{data.birthdate.toDateString()}</span>
                                                ) : (
                                                    <span className="text-sm text-gray-400">Masukkan Tanggal Lahir</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-5 w-5 text-gray-500" />
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-full p-2">
                                            <Input
                                                type="text"
                                                value={inputValue}
                                                onChange={handleInputBirthdate}
                                                className="mb-2 py-6 text-center shadow-none"
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
                                    <Label htmlFor="gender">
                                        Jenis Kelamin <strong className="text-red-500">*</strong>
                                    </Label>
                                    <Select onValueChange={(value) => setData('gender', value as GenderEnum)}>
                                        <SelectTrigger className="w-full px-4 py-6 shadow-none">
                                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(GenderEnum).map((value) => (
                                                <SelectItem key={value} value={value} className="cursor-pointer p-4 capitalize">
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
                                        {!processing && <Icon icon="mdi:register" className="ml-2 h-5 w-5" />}
                                        Daftar Sekarang
                                    </Button>
                                    <Button type="button" onClick={prevStep} variant="outline" className="w-full cursor-pointer py-6">
                                        <Icon icon="mdi:arrow-left" className="mr-2 h-5 w-5" />
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
        </>
    );
}
