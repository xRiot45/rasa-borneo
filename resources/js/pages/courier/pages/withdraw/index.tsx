import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import CourierLayout from '@/layouts/courier/layout';
import { cn } from '@/lib/utils';
import { Bank } from '@/models/bank';
import { WithdrawForm } from '@/models/financial-management/withdraw';
import { formatCurrency } from '@/utils/format-currency';
import { Icon } from '@iconify/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function WithdrawPage() {
    const { banks } = usePage<{ banks: Bank[] }>().props;
    const [search, setSearch] = useState<string>('');
    const [showDialogConfirm, setShowDialogConfirm] = useState<boolean>(false);
    const { data, setData, post, processing, errors } = useForm<Required<WithdrawForm>>({
        amount: 0,
        bank_code: '',
        bank_account_number: '',
        bank_account_name: '',
        note: '',
    });

    const filteredBanks = useMemo(() => {
        return banks.filter((bank) => `${bank.sandi_bank} - ${bank.nama_bank}`.toLowerCase().includes(search.toLowerCase()));
    }, [search, banks]);

    const confirmWithdrawRequest = () => {
        if (!data.amount || data.amount <= 0) {
            toast.error('Error', { description: 'Jumlah penarikan tidak boleh kosong atau nol' });
            return;
        }
        setShowDialogConfirm(true);
    };

    const handleSubmit = () => {
        post(route('courier.withdraw.requestWithdrawCourier'), {
            onSuccess: () => {
                setShowDialogConfirm(false);
                toast.success('Success', {
                    description: 'Penarikan Dana Berhasil Diajukan!',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
            },
            onError: (error) => {
                setShowDialogConfirm(false);
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
            <Head title="Penarikan Dana" />
            <CourierLayout>
                <main className="mt-22 p-4">
                    <Button onClick={() => window.history.back()}>
                        <Icon icon={'material-symbols:arrow-back-rounded'} className="mr-2" />
                        Kembali ke halaman sebelumnya
                    </Button>

                    <div className="mt-6">
                        <h2 className="text-lg font-bold">Penarikan Dana</h2>
                        <p className="text-muted-foreground text-sm">
                            Lengkapi form permintaan penarikan dan saldo akan ditransfer ke rekening Anda.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-10">
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
                                    {/* Input pencarian */}

                                    <Select onValueChange={(val) => setData('bank_code', val)} value={data.bank_code}>
                                        <SelectTrigger className="w-full rounded-lg py-6">
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
                                        disabled={processing}
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
                                        disabled={processing}
                                        placeholder="Masukkan nama pemilik rekening"
                                        className={cn('mt-2 rounded-lg py-6 shadow-none', errors.bank_account_name && 'border border-red-500')}
                                    />
                                    <InputError message={errors.bank_account_name} className="mt-2" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="note">Catatan</Label>

                                <Textarea
                                    id="note"
                                    value={data?.note}
                                    onChange={(e) => setData('note', e.target.value)}
                                    placeholder="Masukkan catatan penarikan dana"
                                    className="mt-2 min-h-[150px]"
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end space-x-3">
                            <Link href={route('courier.indexCourier')} className="cursor-pointer">
                                <Button variant="destructive">
                                    Batalkan <Icon icon="iconoir:cancel" />
                                </Button>
                            </Link>
                            <Button type="button" onClick={confirmWithdrawRequest} disabled={processing}>
                                Ajukan Penarikan Dana <Icon icon="ph:hand-withdraw" />
                            </Button>
                        </div>
                    </form>

                    <Dialog open={showDialogConfirm} onOpenChange={setShowDialogConfirm}>
                        <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Konfirmasi Penarikan Dana</DialogTitle>
                                <DialogDescription>
                                    Apakah kamu yakin ingin mengajukan penarikan dana sebesar{' '}
                                    <strong className="text-black dark:text-white">{formatCurrency(data.amount)}</strong>? <br />
                                    <span className="text-muted-foreground text-sm">
                                        Pastikan data yang Anda masukkan sudah benar.{' '}
                                        <strong className="text-red-500">Proses ini tidak dapat diubah dan dibatalkan setelah diajukan.</strong>
                                    </span>
                                </DialogDescription>
                            </DialogHeader>

                            <div className="mt-4 flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setShowDialogConfirm(false)} className="cursor-pointer">
                                    Batal
                                </Button>
                                <Button onClick={handleSubmit} disabled={processing} className="cursor-pointer">
                                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                    Ya, Ajukan
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </main>
            </CourierLayout>
        </>
    );
}
