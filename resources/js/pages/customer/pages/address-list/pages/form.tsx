import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AddressLabelEnum } from '@/enums/address-label';
import CustomerLayout from '@/layouts/customer/layout';
import { cn } from '@/lib/utils';
import { CustomerAddress, CustomerAddressForm } from '@/models/customer-address';
import { Icon } from '@iconify/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
    customerAddress: CustomerAddress;
}

export default function FormPage({ customerAddress }: Props) {
    const isEdit = !!customerAddress?.id;
    const { data, setData, post, put, processing, errors, reset } = useForm<Required<CustomerAddressForm>>({
        address_label: isEdit ? customerAddress.address_label : AddressLabelEnum.HOME,
        complete_address: isEdit ? customerAddress.complete_address : '',
        note_to_courier: isEdit ? customerAddress.note_to_courier : '',
        recipient_name: isEdit ? customerAddress.recipient_name : '',
        email: isEdit ? customerAddress.email : '',
        phone_number: isEdit ? customerAddress.phone_number : '',
        is_primary: isEdit ? customerAddress.is_primary : false,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit && customerAddress) {
            put(route('customer.address.update', customerAddress.id), {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Alamat Berhasil Diubah',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });

                    // reset();
                },
                onError: (errors) => {
                    Object.keys(errors).forEach((key) => {
                        toast.error('Error', {
                            description: errors[key],
                            action: {
                                label: 'Tutup',
                                onClick: () => toast.dismiss(),
                            },
                        });
                    });
                },
            });
        } else if (!isEdit) {
            post(route('address-list.store'), {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Alamat Berhasil Ditambahkan',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });

                    reset();
                },
                onError: (errors) => {
                    Object.keys(errors).forEach((key) => {
                        toast.error('Error', {
                            description: errors[key],
                            action: {
                                label: 'Tutup',
                                onClick: () => toast.dismiss(),
                            },
                        });
                    });
                },
            });
        }
    };

    return (
        <>
            <Head title="Form Alamat" />
            <CustomerLayout>
                <main className="mt-22">
                    <div className="mb-8">
                        <h2 className="text-lg font-bold">{isEdit ? 'Edit Alamat' : 'Tambah Alamat'}</h2>
                        <p className="text-muted-foreground text-sm">
                            {isEdit ? `Edit Alamat ${customerAddress?.complete_address}` : 'Tambah Alamat Baru'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Label alamat  & Alamat Lengkap */}
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Label Alamat */}
                            <div className="grid gap-2">
                                <Label htmlFor="address_label">
                                    Label Alamat <strong className="text-red-500">*</strong>{' '}
                                </Label>
                                <Select value={data?.address_label} onValueChange={(value) => setData('address_label', value as AddressLabelEnum)}>
                                    <SelectTrigger className="w-full px-4 py-6">
                                        <SelectValue placeholder="Pilih Label Alamat" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(AddressLabelEnum).map((value) => (
                                            <SelectItem key={value} value={value} className="cursor-pointer p-3 capitalize">
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.address_label} className="mt-2" />
                            </div>

                            {/* Alamat Lengkap */}
                            <div className="grid gap-2">
                                <Label htmlFor="complete_address">
                                    Alamat Lengkap <strong className="text-red-500">*</strong>
                                </Label>
                                <Input
                                    id="complete_address"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="complete_address"
                                    value={data.complete_address}
                                    onChange={(e) => setData('complete_address', e.target.value)}
                                    disabled={processing}
                                    placeholder="Masukkan alamat lengkap anda"
                                    className={cn('mt-1 rounded-xl px-4 py-6', errors.complete_address && 'border border-red-500')}
                                />
                                <InputError message={errors.complete_address} className="mt-2" />
                            </div>
                        </div>

                        {/* Nama Penerima, Nomor Telepon, Email */}
                        <div className="mt-8 grid gap-4 lg:grid-cols-3">
                            <div className="grid gap-2">
                                <Label htmlFor="recipient_name">
                                    Nama Penerima <strong className="text-red-500">*</strong>
                                </Label>
                                <Input
                                    id="com"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="recipient_name"
                                    value={data.recipient_name}
                                    onChange={(e) => setData('recipient_name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Masukkan nama penerima / atas nama"
                                    className={cn('mt-1 rounded-xl px-4 py-6', errors.recipient_name && 'border border-red-500')}
                                />
                                <InputError message={errors.recipient_name} className="mt-2" />
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
                                    placeholder="Masukkan alamat email anda"
                                    className={cn('mt-1 rounded-xl px-4 py-6', errors.email && 'border border-red-500')}
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
                                    className={cn('mt-1 rounded-xl px-4 py-6', errors.phone_number && 'border border-red-500')}
                                />
                                <InputError message={errors.phone_number} />
                            </div>
                        </div>

                        {/* Catatan untuk kurir */}
                        <div className="mt-8 grid gap-2">
                            <Label htmlFor="note_to_courier">
                                Catatan untuk kurir <span className="text-muted-foreground font-light">(opsional)</span>
                            </Label>

                            <Textarea
                                id="note_to_courier"
                                value={data?.note_to_courier}
                                onChange={(e) => setData('note_to_courier', e.target.value)}
                                placeholder="Cth : Rumah warna biru di depan toko baju serba murah"
                                className="min-h-[100px] rounded-lg p-3"
                            />
                        </div>

                        {/* Is Primary */}
                        <div className="mt-4 flex items-center gap-3">
                            <Checkbox
                                id="is_primary"
                                checked={data.is_primary}
                                onCheckedChange={(e) => setData('is_primary', !!e)}
                                disabled={processing}
                                className="h-4 w-4 cursor-pointer"
                            />
                            <Label htmlFor="is_primary">Jadikan Alamat utama</Label>
                        </div>

                        <div className="mt-4 flex justify-end space-x-3">
                            <Link href={route('address-list.index')}>
                                <Button variant="destructive" className="cursor-pointer">
                                    Batalkan <Icon icon="iconoir:cancel" />
                                </Button>
                            </Link>
                            <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                {isEdit ? 'Simpan Perubahan' : 'Tambah Alamat'}{' '}
                                <Icon icon={isEdit ? 'heroicons-outline:check' : 'heroicons-outline:plus'} />
                            </Button>
                        </div>
                    </form>
                </main>
            </CustomerLayout>
        </>
    );
}
