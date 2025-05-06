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
import { Bank } from '@/models/bank';
import { BusinessCategory } from '@/models/business-category';
import { Head, useForm, usePage } from '@inertiajs/react';
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
    id_card_photo: string | File | null;
};

type RegisterFormStep3 = {
    business_name: string;
    business_phone: string;
    business_email: string;
    postal_code: string;
    business_description: string;
    business_address: string;
    business_category_id: number;
};

type RegisterFormStep4 = {
    bank_code: string;
    bank_account_number: string;
    bank_account_name: string;
};

type RegisterFormStep5 = {
    tax_identification_number: string;
};

export default function RegisterMerchantPage() {
    const { businessCategories } = usePage<{ businessCategories: BusinessCategory[] }>().props;
    const { banks } = usePage<{ banks: Bank[] }>().props;
    const [step, setStep] = useState<number>(1);

    const { data, setData, post, processing, errors, reset } = useForm<
        RegisterFormStep1 &
            RegisterFormStep2 &
            RegisterFormStep3 &
            RegisterFormStep4 &
            RegisterFormStep5 & {
                use_same_phone: boolean;
                use_same_email: boolean;
            }
    >({
        // Step 1
        full_name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',

        // Step 2
        id_card_photo: null,

        // Step 3
        business_name: '',
        business_phone: '',
        business_email: '',
        postal_code: '',
        business_description: '',
        business_address: '',
        business_category_id: 0,

        // Step 4
        bank_code: '',
        bank_account_number: '',
        bank_account_name: '',

        // Step 5
        tax_identification_number: '',

        // New state properties for checkboxes
        use_same_phone: false,
        use_same_email: false,
    });

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleFileChange = (file: File | null) => {
        setData('id_card_photo', file);
    };

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
                console.log(error);
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
        <AuthLayout title="Daftar Sebagai Penjual" description="Silahkan isi data usaha anda untuk melanjutkan dan menjual produk anda secara online">
            <Head title="Register" />
            {/* Step Indicator */}
            <div className="mb-10 grid grid-cols-2 gap-10">
                {[
                    { stepNumber: 1, label: 'Infomasi Akun' },
                    { stepNumber: 2, label: 'Informasi Pribadi' },
                    { stepNumber: 3, label: 'Informasi Bisnis' },
                    { stepNumber: 4, label: 'Informasi Rekening Bank' },
                    { stepNumber: 5, label: 'Informasi Perpajakan' },
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
                                <Label htmlFor="email">
                                    Alamat Email <strong className="text-red-500">*</strong>
                                </Label>
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
                                <Label htmlFor="phone_number">
                                    Nomor Telepon <strong className="text-red-500">*</strong>
                                </Label>
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
                                <Label htmlFor="password">
                                    Password <strong className="text-red-500">*</strong>
                                </Label>
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
                                <Label htmlFor="password_confirmation">
                                    Konfirmasi Password <strong className="text-red-500">*</strong>
                                </Label>
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

                {/* Step 2 => Informasi Pribadi Lainnya */}
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
                                    disabled={processing}
                                    className="w-full cursor-pointer bg-black py-6 transition-all dark:bg-white"
                                >
                                    Lanjut
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
                                    tabIndex={1}
                                    autoComplete="business_name"
                                    value={data.business_name}
                                    onChange={(e) => setData('business_name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Cth : Rumah Makan Domoro"
                                    className="rounded-xl px-4 py-6"
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
                                    className="rounded-xl px-4 py-6"
                                />
                                <InputError message={errors.business_phone} />

                                <div className="mt-2 flex items-center space-x-2">
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
                                    <Label htmlFor="use_same_phone" className="text-[13px]">
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
                                    tabIndex={2}
                                    autoComplete="business_email"
                                    value={data.business_email}
                                    onChange={(e) => setData('business_email', e.target.value)}
                                    disabled={processing}
                                    placeholder="Masukkan email bisnis (Jika tidak ada, isi dengan email pribadi)"
                                    className="rounded-xl px-4 py-6"
                                />
                                <InputError message={errors.email} />

                                <div className="mt-2 flex items-center space-x-2">
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
                                    <Label htmlFor="use_same_email" className="text-[13px]">
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
                                    tabIndex={1}
                                    autoComplete="business_address"
                                    value={data.business_address}
                                    onChange={(e) => setData('business_address', e.target.value)}
                                    disabled={processing}
                                    placeholder="Cth : Jl. A.Yani"
                                    className="rounded-xl px-4 py-6"
                                />
                                <InputError message={errors.business_address} className="mt-2" />
                            </div>

                            {/* Business Category */}
                            <div className="grid gap-2">
                                <Label htmlFor="business_category_id">
                                    Kategori Bisnis <strong className="text-red-500">*</strong>
                                </Label>
                                <Select onValueChange={(e) => setData('business_category_id', Number(e))}>
                                    <SelectTrigger className="mt-2 w-full py-6">
                                        <SelectValue placeholder="Pilih Kategori Bisnis" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {businessCategories.map((item: BusinessCategory) => (
                                            <SelectItem key={item.id} value={String(item.id)}>
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
                                    tabIndex={2}
                                    autoComplete="postal_code"
                                    value={data.postal_code}
                                    onChange={(e) => setData('postal_code', e.target.value)}
                                    disabled={processing}
                                    placeholder="Masukkan Kode Pos"
                                    className="rounded-xl px-4 py-6"
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
                                    className="min-h-[100px]"
                                />
                            </div>

                            {/* Button */}
                            <div className="flex flex-col items-center justify-between gap-3">
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
                            <Select onValueChange={(e) => setData('bank_code', e)}>
                                <SelectTrigger className="mt-2 w-full py-6">
                                    <SelectValue placeholder="Pilih Bank Anda" />
                                </SelectTrigger>
                                <SelectContent>
                                    {banks.map((item: Bank) => (
                                        <SelectItem
                                            key={item.id}
                                            value={String(item.sandi_bank + '-' + item.nama_bank)}
                                            className="cursor-pointer gap-10"
                                        >
                                            {item.sandi_bank} - {item.nama_bank}
                                        </SelectItem>
                                    ))}
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
                                tabIndex={2}
                                autoComplete="bank_account_number"
                                value={data.bank_account_number}
                                onChange={(e) => setData('bank_account_number', e.target.value)}
                                disabled={processing}
                                placeholder="Masukkan nomor rekening anda"
                                className="rounded-xl px-4 py-6"
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
                                className="rounded-xl px-4 py-6"
                            />
                            <InputError message={errors.bank_account_name} className="mt-2" />
                        </div>

                        {/* Button */}
                        <div className="flex flex-col items-center justify-between gap-3">
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
                                type="number"
                                required
                                tabIndex={2}
                                autoComplete="tax_identification_number"
                                value={data.tax_identification_number}
                                onChange={(e) => setData('tax_identification_number', e.target.value)}
                                disabled={processing}
                                placeholder="Isi 0 jika tidak memiliki NPWP"
                                className="rounded-xl px-4 py-6"
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
                                    disabled={processing}
                                >
                                    Selesaikan Pendaftaran
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
