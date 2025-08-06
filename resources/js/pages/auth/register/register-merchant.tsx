import ConfirmDialog from '@/components/confirm-dialog';
import FileDropzone from '@/components/file-dropzone';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AuthLayout from '@/layouts/auth/auth-layout';
import { cn } from '@/lib/utils';
import {
    RegisterBankAccountInfo,
    RegisterBusinessInfo,
    RegisterTaxInfo,
    RegisterUserAccountInfo,
    RegisterUserIdentityInfo,
} from '@/models/auth/register-merchant';
import { Bank } from '@/models/bank';
import { BusinessCategory } from '@/models/business-category';
import { Icon } from '@iconify/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function RegisterMerchantPage() {
    const { banks } = usePage<{ banks: Bank[] }>().props;
    const { businessCategories } = usePage<{ businessCategories: BusinessCategory[] }>().props;

    const [step, setStep] = useState<number>(1);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    const { data, setData, post, processing, errors, reset } = useForm<
        RegisterUserAccountInfo &
            RegisterUserIdentityInfo &
            RegisterBusinessInfo &
            RegisterBankAccountInfo &
            RegisterTaxInfo & {
                use_same_phone: boolean;
                use_same_email: boolean;
            }
    >({
        // Account Info
        full_name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',

        // Identity Info
        id_card_photo: null,

        // Business Info
        business_name: '',
        business_phone: '',
        business_email: '',
        postal_code: '',
        business_description: '',
        business_address: '',
        business_category_id: 0,

        // Bank Info
        bank_code: '',
        bank_account_number: '',
        bank_account_name: '',

        // Tax Info
        tax_identification_number: '',

        // New state properties for checkboxes
        use_same_phone: false,
        use_same_email: false,
    });

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const filteredBanks = useMemo(() => {
        return banks.filter((bank) => `${bank.sandi_bank} - ${bank.nama_bank}`.toLowerCase().includes(search.toLowerCase()));
    }, [search, banks]);

    const handleFileChange = (file: File | null) => {
        setData('id_card_photo', file);
    };

    const isStep1Valid =
        data.full_name.trim() !== '' &&
        data.email.trim() !== '' &&
        data.phone_number.trim() !== '' &&
        data.password.trim() !== '' &&
        data.password_confirmation.trim() !== '';

    const isStep2Valid =
        data.id_card_photo !== null &&
        data.id_card_photo instanceof File &&
        data.id_card_photo.size > 0 &&
        data.id_card_photo.type.startsWith('image/');

    const isStep3Valid =
        data.business_name.trim() !== '' &&
        data.business_phone.trim() !== '' &&
        data.business_email.trim() !== '' &&
        data.postal_code.trim() !== '' &&
        data.business_description.trim() !== '' &&
        data.business_address.trim() !== '' &&
        data.business_category_id !== 0;

    const isStep4Valid = data.bank_code.trim() !== '' && data.bank_account_number.trim() !== '' && data.bank_account_name.trim() !== '';

    const isStep5Valid = data.tax_identification_number.trim() !== '';

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        // Step 1
        formData.append('full_name', data.full_name);
        formData.append('email', data.email);
        formData.append('phone_number', data.phone_number);
        formData.append('password', data.password);
        formData.append('password_confirmation', data.password_confirmation);

        // Step2
        if (data.id_card_photo) {
            formData.append('id_card_photo', data.id_card_photo);
        }

        // Step 3
        formData.append('business_name', data.business_name);
        formData.append('business_phone', data.business_phone);
        formData.append('business_email', data.business_email);
        formData.append('postal_code', data.postal_code);
        formData.append('business_description', data.business_description);
        formData.append('business_address', data.business_address);
        formData.append('business_category_id', data.business_category_id.toString());

        // Step 4
        formData.append('bank_code', data.bank_code);
        formData.append('bank_account_number', data.bank_account_number);
        formData.append('bank_account_name', data.bank_account_name);

        // Step 5
        formData.append('tax_identification_number', data.tax_identification_number);

        post(route('register.merchant.store'), {
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
            onFinish: () => reset('password', 'password_confirmation'),

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
        <AuthLayout title="Daftar Sebagai Merchant" description="Silahkan isi data usaha anda untuk melanjutkan dan menjual produk anda secara online">
            <Head title="Register" />
            {/* Step Indicator */}
            <div className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
                {[
                    { stepNumber: 1, label: 'Infomasi Akun' },
                    { stepNumber: 2, label: 'Informasi Pribadi' },
                    { stepNumber: 3, label: 'Informasi Bisnis' },
                    { stepNumber: 4, label: 'Informasi Rekening Bank' },
                    { stepNumber: 5, label: 'Informasi Perpajakan' },
                ].map(({ stepNumber, label }) => (
                    <div key={stepNumber} className="flex items-center gap-4 sm:flex-col">
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

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {/* Step 1 => Informasi Akun */}
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
                                        'mt-2 rounded-md px-4 py-6 shadow-none placeholder:text-sm',
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
                                        'mt-2 rounded-md px-4 py-6 shadow-none placeholder:text-sm',
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
                                        'mt-2 rounded-md px-4 py-6 shadow-none placeholder:text-sm',
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
                                            'mt-2 rounded-md px-4 py-6 shadow-none placeholder:text-sm',
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
                                            'mt-2 rounded-md px-4 py-6 shadow-none placeholder:text-sm',
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

                {/* Step 2 => Informasi Pribadi */}
                {step === 2 && (
                    <>
                        <div className="grid gap-6">
                            {/* Foto KTP */}
                            <div className="grid gap-2">
                                <Label htmlFor="id_card_photo">
                                    Foto KTP <strong className="text-red-500">*</strong>
                                </Label>
                                <FileDropzone onFileChange={handleFileChange} error={errors.id_card_photo} />
                                <InputError message={errors.id_card_photo} className="mt-2" />
                            </div>

                            <div className="flex flex-col items-center justify-between gap-3">
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={processing || !isStep2Valid}
                                    className="w-full cursor-pointer bg-black py-6 transition-all dark:bg-white"
                                >
                                    Lanjut ke langkah selanjutnya
                                    <Icon icon="mdi:arrow-right" className="ml-2 h-5 w-5" />
                                </Button>
                                <Button type="button" onClick={prevStep} variant="outline" className="w-full cursor-pointer py-6">
                                    Kembali ke langkah sebelumnya
                                </Button>
                            </div>
                        </div>
                    </>
                )}

                {/* Step 3 => Informasi Bisnis */}
                {step === 3 && (
                    <>
                        <div className="grid gap-6">
                            {/* Business Name */}
                            <div className="grid gap-2">
                                <Label htmlFor="business_name">
                                    Nama Bisnis <strong className="text-red-500">*</strong>
                                </Label>
                                <Input
                                    id="business_name"
                                    type="text"
                                    required
                                    autoFocus
                                    autoComplete="business_name"
                                    value={data.business_name}
                                    onChange={(e) => setData('business_name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Cth : Rumah Makan Domoro"
                                    className={cn(
                                        'mt-2 rounded-lg px-4 py-6 shadow-none placeholder:text-sm',
                                        errors.business_name && 'border border-red-500',
                                    )}
                                />
                                <InputError message={errors.business_name} className="mt-2" />
                            </div>

                            {/* Business Phone */}
                            <div className="grid gap-2">
                                <Label htmlFor="business_phone">
                                    Nomor Telepon Bisnis <strong className="text-red-500">*</strong>
                                </Label>
                                <Input
                                    id="business_phone"
                                    type="number"
                                    required
                                    tabIndex={2}
                                    autoComplete="business_phone"
                                    value={data.business_phone}
                                    onChange={(e) => setData('business_phone', e.target.value)}
                                    disabled={processing}
                                    placeholder="Masukkan nomor telepon bisnis (Jika tidak ada, isi dengan nomor telepon pribadi)"
                                    className={cn(
                                        'mt-2 rounded-lg px-4 py-6 shadow-none placeholder:text-sm',
                                        errors.business_phone && 'border border-red-500',
                                    )}
                                />
                                <InputError message={errors.business_phone} />

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="use_same_phone"
                                        checked={data.use_same_phone}
                                        onCheckedChange={(checked) => {
                                            const isChecked = Boolean(checked);
                                            setData('use_same_phone', isChecked);
                                            setData('business_phone', isChecked ? data.phone_number : '');
                                        }}
                                        disabled={processing}
                                    />
                                    <Label htmlFor="use_same_phone" className="text-muted-foreground text-[12px]">
                                        Gunakan nomor telepon yang sama dengan nomor telepon akun
                                    </Label>
                                </div>
                            </div>

                            {/* Business Email */}
                            <div className="grid gap-2">
                                <Label htmlFor="business_email">
                                    Email Bisnis <strong className="text-red-500">*</strong>
                                </Label>
                                <Input
                                    id="business_email"
                                    type="email"
                                    required
                                    autoComplete="business_email"
                                    value={data.business_email}
                                    onChange={(e) => setData('business_email', e.target.value)}
                                    disabled={processing}
                                    placeholder="Masukkan email bisnis (Jika tidak ada, isi dengan email pribadi)"
                                    className={cn(
                                        'mt-2 rounded-lg px-4 py-6 shadow-none placeholder:text-sm',
                                        errors.business_email && 'border border-red-500',
                                    )}
                                />
                                <InputError message={errors.email} />

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="use_same_email"
                                        checked={data.use_same_email}
                                        onCheckedChange={(checked) => {
                                            const isChecked = Boolean(checked);
                                            setData('use_same_email', isChecked);
                                            setData('business_email', isChecked ? data.email : '');
                                        }}
                                        disabled={processing}
                                    />
                                    <Label htmlFor="use_same_email" className="text-muted-foreground text-[12px]">
                                        Gunakan email yang sama dengan email akun
                                    </Label>
                                </div>
                            </div>

                            {/* Business Address */}
                            <div className="grid gap-2">
                                <Label htmlFor="business_address">
                                    Alamat Bisnis <strong className="text-red-500">*</strong>
                                </Label>
                                <Input
                                    id="business_address"
                                    type="text"
                                    required
                                    autoFocus
                                    autoComplete="business_address"
                                    value={data.business_address}
                                    onChange={(e) => setData('business_address', e.target.value)}
                                    disabled={processing}
                                    placeholder="Cth : Jl. A.Yani"
                                    className={cn(
                                        'mt-2 rounded-lg px-4 py-6 shadow-none placeholder:text-sm',
                                        errors.business_address && 'border border-red-500',
                                    )}
                                />
                                <InputError message={errors.business_address} className="mt-2" />
                            </div>

                            {/* Business Category */}
                            <div className="grid gap-2">
                                <Label htmlFor="business_category_id">
                                    Kategori Bisnis <strong className="text-red-500">*</strong>
                                </Label>
                                <Select onValueChange={(e) => setData('business_category_id', Number(e))}>
                                    <SelectTrigger className="mt-2 w-full rounded-lg py-6 shadow-none">
                                        <SelectValue placeholder="Pilih Kategori Bisnis" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {businessCategories.map((item: BusinessCategory) => (
                                            <SelectItem key={item.id} value={String(item.id)} className="cursor-pointer p-4 capitalize">
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.business_category_id} className="mt-2" />
                            </div>

                            {/* Postal Code */}
                            <div className="grid gap-2">
                                <Label htmlFor="postal_code">
                                    Kode Pos <strong className="text-red-500">*</strong>
                                </Label>
                                <Input
                                    id="postal_code"
                                    type="number"
                                    required
                                    autoComplete="postal_code"
                                    value={data.postal_code}
                                    onChange={(e) => setData('postal_code', e.target.value)}
                                    disabled={processing}
                                    placeholder="Masukkan Kode Pos"
                                    className={cn(
                                        'mt-2 rounded-lg px-4 py-6 shadow-none placeholder:text-sm',
                                        errors.postal_code && 'border border-red-500',
                                    )}
                                />
                                <InputError message={errors.postal_code} />
                            </div>

                            {/* Business Description */}
                            <div className="grid gap-2">
                                <Label htmlFor="business_desciption">
                                    Deskripsi Bisnis <strong className="text-red-500">*</strong>
                                </Label>

                                <Textarea
                                    id="business_desciption"
                                    value={data?.business_description}
                                    onChange={(e) => setData('business_description', e.target.value)}
                                    placeholder="Deskripsi Bisnis anda"
                                    className={cn(
                                        'mt-2 min-h-[120px] rounded-lg shadow-none placeholder:text-sm',
                                        errors.business_email && 'border border-red-500',
                                    )}
                                />
                            </div>

                            {/* Button */}
                            <div className="flex flex-col items-center justify-between gap-3">
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    disabled={processing || !isStep3Valid}
                                    className="w-full cursor-pointer bg-black py-6 transition-all dark:bg-white"
                                >
                                    Lanjut ke langkah selanjutnya
                                    <Icon icon="mdi:arrow-right" className="ml-2 h-5 w-5" />
                                </Button>
                                <Button type="button" onClick={prevStep} variant="outline" className="w-full cursor-pointer py-6">
                                    Kembali ke langkah sebelumnya
                                </Button>
                            </div>
                        </div>
                    </>
                )}

                {/* Step 4 => Informasi Rekening Bank */}
                {step === 4 && (
                    <>
                        {/* Bank Code */}
                        <div className="grid gap-2">
                            <Label htmlFor="bank_code">
                                Pilih Bank <strong className="text-red-500">*</strong>
                            </Label>
                            <Select onValueChange={(val) => setData('bank_code', val)}>
                                <SelectTrigger className="mt-2 w-full rounded-lg py-6 shadow-none">
                                    <SelectValue placeholder="Pilih Bank Anda" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[300px] overflow-y-auto">
                                    <Input
                                        placeholder="Cari bank..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="fixed top-0 z-50 mb-2 w-full bg-white py-6 shadow-none dark:bg-zinc-900"
                                    />
                                    <div className="mt-12">
                                        {filteredBanks.length > 0 ? (
                                            filteredBanks.map((item, index) => (
                                                <SelectItem
                                                    className="p-4"
                                                    key={`${item.sandi_bank}-${item.nama_bank}-${index}`}
                                                    value={`${item.sandi_bank}-${item.nama_bank}`}
                                                >
                                                    {item.sandi_bank} - {item.nama_bank}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center text-sm">Bank tidak ditemukan</div>
                                        )}
                                    </div>
                                </SelectContent>
                            </Select>
                            <InputError message={''} className="mt-2" />
                        </div>

                        {/* Bank Account Number */}
                        <div className="grid gap-2">
                            <Label htmlFor="bank_account_number">
                                Nomor Rekening <strong className="text-red-500">*</strong>
                            </Label>
                            <Input
                                id="bank_account_number"
                                type="number"
                                required
                                autoComplete="bank_account_number"
                                value={data.bank_account_number}
                                onChange={(e) => setData('bank_account_number', e.target.value)}
                                disabled={processing}
                                placeholder="Masukkan nomor rekening anda"
                                className={cn(
                                    'mt-2 rounded-lg px-4 py-6 shadow-none placeholder:text-sm',
                                    errors.bank_account_number && 'border border-red-500',
                                )}
                            />
                            <InputError message={errors.bank_account_number} />
                        </div>

                        {/* Bank Account Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="bank_account_name">
                                Nama Pemilik Rekening <strong className="text-red-500">*</strong>
                            </Label>
                            <Input
                                id="bank_account_name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="bank_account_name"
                                value={data.bank_account_name}
                                onChange={(e) => setData('bank_account_name', e.target.value)}
                                disabled={processing}
                                placeholder="Masukkan nama pemilik rekening"
                                className={cn(
                                    'mt-2 rounded-lg px-4 py-6 shadow-none placeholder:text-sm',
                                    errors.bank_account_name && 'border border-red-500',
                                )}
                            />
                            <InputError message={errors.bank_account_name} className="mt-2" />
                        </div>

                        {/* Button */}
                        <div className="flex flex-col items-center justify-between gap-3">
                            <Button
                                type="button"
                                onClick={nextStep}
                                disabled={processing || !isStep4Valid}
                                className="w-full cursor-pointer bg-black py-6 transition-all dark:bg-white"
                            >
                                Lanjut ke langkah selanjutnya
                                <Icon icon="mdi:arrow-right" className="ml-2 h-5 w-5" />
                            </Button>
                            <Button type="button" onClick={prevStep} variant="outline" className="w-full cursor-pointer py-6">
                                Kembali ke langkah sebelumnya
                            </Button>
                        </div>
                    </>
                )}

                {/* Step 5 => Informasi Perpajakan */}
                {step === 5 && (
                    <>
                        {/* Tax Identification Number */}
                        <div className="grid gap-2">
                            <Label htmlFor="tax_identification_number">
                                NPWP <strong className="text-muted-foreground italic">(Opsional)</strong>
                            </Label>
                            <Input
                                id="tax_identification_number"
                                type="text"
                                required
                                autoComplete="tax_identification_number"
                                value={data.tax_identification_number}
                                onChange={(e) => setData('tax_identification_number', e.target.value)}
                                disabled={processing}
                                placeholder="Isi 0 jika tidak memiliki NPWP"
                                className={cn(
                                    'mt-2 rounded-lg px-4 py-6 shadow-none placeholder:text-sm',
                                    errors.tax_identification_number && 'border border-red-500',
                                )}
                            />
                            <InputError message={errors.tax_identification_number} />
                        </div>

                        {/* Button */}
                        <div className="flex flex-col items-center justify-between gap-3">
                            <ConfirmDialog
                                title="Apakah Semua Data Sudah Benar?"
                                description="Periksa kembali data yang anda masukkan dan tekan 'Register Akun' untuk melanjutkan. Akun Anda akan diverifikasi oleh admin dalam 1×24 jam."
                                confirmText="Register Akun"
                                onConfirm={(e) => handleSubmit(e)}
                            >
                                <Button
                                    type="button"
                                    className="w-full cursor-pointer bg-black py-6 transition-all"
                                    tabIndex={5}
                                    disabled={processing || !isStep5Valid}
                                >
                                    Selesaikan Pendaftaran
                                    <Icon icon="mdi:register" className="mr-2 h-5 w-5" />
                                </Button>
                            </ConfirmDialog>

                            <Button type="button" onClick={prevStep} variant="outline" className="w-full cursor-pointer py-6">
                                Kembali ke langkah sebelumnya
                            </Button>
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
