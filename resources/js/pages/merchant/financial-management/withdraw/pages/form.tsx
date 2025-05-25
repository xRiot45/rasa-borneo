import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import MerchantLayout from '@/layouts/merchant/layout';
import { cn } from '@/lib/utils';
import { Bank } from '@/models/bank';
import { WithdrawForm } from '@/models/financial-management/withdraw';
import { Merchant } from '@/models/merchant';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    merchantBank: Merchant;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Keuangan',
        href: '#',
    },
    {
        title: 'Penarikan Dana',
        href: '/merchant/financial-management/withdraw',
    },
    {
        title: 'Ajukan Penarikan Dana',
        href: '#',
    },
];

export default function FormPage({ merchantBank }: Props) {
    const { banks } = usePage<{ banks: Bank[] }>().props;
    const [useMerchantBank, setUseMerchantBank] = useState<boolean>(false);

    const { data, setData, post, processing, errors } = useForm<Required<WithdrawForm>>({
        amount: 0,
        bank_code: '',
        bank_account_number: '',
        bank_account_name: '',
        note: '',
    });

    useEffect(() => {
        if (useMerchantBank) {
            setData('bank_code', merchantBank.bank_code);
            setData('bank_account_number', merchantBank.bank_account_number);
            setData('bank_account_name', merchantBank.bank_account_name);
        } else {
            setData('bank_code', '');
            setData('bank_account_number', '');
            setData('bank_account_name', '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useMerchantBank]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('merchant.withdraw.store'), {
            onSuccess: () => {
                toast.success('Success', {
                    description: 'Penarikan Dana Berhasil Diajukan!',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
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
        });
    };

    return (
        <>
            <Head title="Ajukan Penarikan Dana" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="amount">
                                Jumlah Penarikan <strong className="text-red-500">*</strong>
                            </Label>
                            <Input
                                id="amount"
                                type="number"
                                autoFocus
                                tabIndex={1}
                                autoComplete="amount"
                                value={data.amount}
                                onChange={(e) => setData('amount', parseInt(e.target.value))}
                                placeholder="Masukkan jumlah uang yang akan ditarik"
                                className={cn('mt-2 rounded-lg py-6 shadow-none', errors.amount && 'border border-red-500')}
                            />
                            <InputError message={errors.amount} className="mt-2" />
                        </div>

                        {/* Form Informasi Rekening Bank */}
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            {/* Bank Code */}
                            <div className="grid gap-0">
                                <Label htmlFor="bank_code">
                                    Pilih Bank <strong className="text-red-500">*</strong>
                                </Label>
                                <Select onValueChange={(val) => setData('bank_code', val)} value={data.bank_code} disabled={useMerchantBank}>
                                    <SelectTrigger className="mt-4 w-full rounded-lg py-6">
                                        <SelectValue placeholder="Pilih Bank Anda" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {banks.map((item: Bank, index) => (
                                            <SelectItem
                                                key={`${item.sandi_bank}-${item.nama_bank}-${index}`}
                                                value={`${item.sandi_bank}-${item.nama_bank}`}
                                            >
                                                {item.sandi_bank} - {item.nama_bank}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.bank_code} />
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
                                    disabled={useMerchantBank || processing}
                                    placeholder="Masukkan nomor rekening anda"
                                    className={cn('mt-2 rounded-lg py-6 shadow-none', errors.bank_account_number && 'border border-red-500')}
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
                                    disabled={useMerchantBank || processing}
                                    placeholder="Masukkan nama pemilik rekening"
                                    className={cn('mt-2 rounded-lg py-6 shadow-none', errors.bank_account_name && 'border border-red-500')}
                                />
                                <InputError message={errors.bank_account_name} className="mt-2" />
                            </div>

                            {/* ✅ Checkbox Gunakan Informasi Merchant */}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="useMerchantBank"
                                    checked={useMerchantBank}
                                    onCheckedChange={(checked) => setUseMerchantBank(Boolean(checked))}
                                />
                                <Label htmlFor="useMerchantBank">Gunakan informasi rekening bank saat anda mendaftar</Label>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="note">Catatan</Label>

                            <Textarea
                                id="note"
                                value={data?.note}
                                onChange={(e) => setData('note', e.target.value)}
                                placeholder="Masukkan catatan penarikan dana"
                                className="mt-2 min-h-[100px]"
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-3">
                        <Link href={route('merchant.withdraw.indexMerchant')} className="cursor-pointer">
                            <Button variant="destructive">
                                Batalkan <Icon icon="iconoir:cancel" />
                            </Button>
                        </Link>
                        <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Ajukan Penarikan Dana <Icon icon="ph:hand-withdraw" />
                        </Button>
                    </div>
                </form>
            </MerchantLayout>
        </>
    );
}
