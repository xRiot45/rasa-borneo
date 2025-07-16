import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { OrderTypeEnum } from '@/enums/order-type';
import { PaymentMethodEnum } from '@/enums/payment-method';
import { cn } from '@/lib/utils';
import { Coupon } from '@/models/coupon';
import { TableModel } from '@/models/table';
import { Transaction, TransactionForm } from '@/models/transactions';
import { formatCurrency } from '@/utils/format-currency';
import { Icon } from '@iconify/react';

interface Props {
    formData: TransactionForm;
    errors: Record<string, string>;
    setData: <K extends keyof TransactionForm>(key: K, value: TransactionForm[K]) => void;
    transaction: Transaction;
    tables: TableModel[];
    coupons: Coupon[];
    handleSelectCoupon: (value: string) => void;
    selectedCouponId: number | null;
    finalTotal: number;
}

const OrderDetailsForm: React.FC<Props> = ({
    formData,
    errors,
    setData,
    transaction,
    tables,
    coupons,
    handleSelectCoupon,
    selectedCouponId,
    finalTotal,
}) => {
    const cashOptions = [50000, 100000, 200000, 500000, 1000000];

    return (
        <>
            <div className="space-y-4">
                {/* Nomor Meja Select */}
                {formData?.order_type === OrderTypeEnum.DINEIN && (
                    <div className="flex flex-col gap-3">
                        <Label>
                            Pilih Meja <strong className="text-red-500">*</strong>
                        </Label>
                        <Select onValueChange={(value) => setData('dine_in_table_id', parseInt(value))}>
                            <SelectTrigger
                                className={cn(
                                    `mt-2 w-full cursor-pointer rounded-lg py-6 shadow-none ${errors?.dine_in_table_id && 'border-red-500'}`,
                                )}
                            >
                                <SelectValue placeholder="Pilih Meja" />
                            </SelectTrigger>
                            <SelectContent>
                                {tables.map((item: TableModel) => {
                                    return (
                                        <SelectItem
                                            key={item.id}
                                            value={String(item.id)}
                                            disabled={!item.is_available}
                                            className="cursor-pointer p-4"
                                        >
                                            <Icon icon="material-symbols:table-restaurant" className="mr-2" />
                                            {item.name} ({item.capacity} orang)
                                            {!item.is_available && ' - Tidak tersedia'}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>

                        <InputError message={errors.dine_in_table_id} />
                    </div>
                )}

                {/* Nama Pemesan & Nomor Telepon Pemesan */}
                {formData?.order_type !== OrderTypeEnum.DELIVERY && (
                    <div className="space-y-4">
                        <div className="flex flex-col gap-3">
                            <Label>
                                Nama Pemesan <strong className="text-red-500">*</strong>
                            </Label>
                            <Input
                                type="text"
                                placeholder="Nama Pemesan"
                                value={formData.orderer_name}
                                onChange={(e) => setData('orderer_name', e.target.value)}
                                className={cn(`w-full border py-6 shadow-none ${errors?.orderer_name && 'border-red-500'}`)}
                            />
                            <InputError message={errors.orderer_name} />
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>
                                Nomor Telepon Pemesan <strong className="text-red-500">*</strong>
                            </Label>
                            <Input
                                type="number"
                                placeholder="Nomor Telepon Pemesan"
                                value={formData.orderer_phone_number}
                                onChange={(e) => setData('orderer_phone_number', e.target.value)}
                                className={cn(`w-full border py-6 shadow-none ${errors?.orderer_phone_number && 'border-red-500'}`)}
                            />
                            <InputError message={errors.orderer_phone_number} />
                        </div>
                    </div>
                )}

                {/* Kupon Select */}
                <div>
                    <Label>Kupon Diskon</Label>
                    <Select onValueChange={handleSelectCoupon} value={selectedCouponId ? String(selectedCouponId) : undefined}>
                        <SelectTrigger className={cn('mt-2 w-full cursor-pointer rounded-lg py-6 shadow-none')}>
                            <SelectValue placeholder="Pilih Kupon Diskon" />
                        </SelectTrigger>
                        <SelectContent>
                            {coupons.map((item: Coupon) => {
                                const isPercentage = item.type === 'percentage';
                                const discountText = isPercentage ? `${item.discount}%` : `${formatCurrency(item?.discount)}`;
                                const minPurchaseText = `Min. Belanja ${formatCurrency(item?.minimum_purchase)}`;
                                const isDisabled = transaction?.subtotal_transaction_item < item.minimum_purchase;

                                return (
                                    <SelectItem key={item.id} value={String(item.id)} className="cursor-pointer p-4" disabled={isDisabled}>
                                        <Icon icon="mdi:percent-circle-outline" className="mr-2" />
                                        {`Diskon ${discountText} (${minPurchaseText})`}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>

                {/* Jumlah Uang Diterima */}
                {formData?.payment_method === PaymentMethodEnum.CASH && (
                    <div className="flex flex-col gap-3">
                        <Label>
                            Jumlah Uang yang Ingin Anda Bayarkan <strong className="text-red-500">*</strong>
                        </Label>
                        <RadioGroup
                            value={formData.cash_received_amount?.toString() ?? ''}
                            onValueChange={(value) => setData('cash_received_amount', parseInt(value))}
                            className={cn('mb-4 grid grid-cols-2 gap-6', errors.cash_received_amount && 'rounded border border-red-500 p-3')}
                        >
                            {[...cashOptions, finalTotal].map((amount, index) => (
                                <div key={index} className="mt-2 flex items-center space-x-2">
                                    <RadioGroupItem value={amount.toString()} id={`cash-${amount}`} className="cursor-pointer" />
                                    <Label htmlFor={`cash-${amount}`}>Rp {amount.toLocaleString('id-ID')}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                        <InputError message={errors.cash_received_amount} />
                    </div>
                )}

                {/* Note */}
                <div className="flex flex-col gap-2">
                    <Label>Tambahkan Catatan</Label>
                    <Textarea
                        className="mt-2 h-30 shadow-none"
                        placeholder="Cth : Tambahkan sendok"
                        onChange={(e) => setData('note', e.target.value)}
                        value={formData.note}
                    />
                </div>
            </div>

            {formData.payment_method === PaymentMethodEnum.CASH && (
                <p className="text-sm font-semibold text-red-500 italic">
                    *Jika Anda memilih pembayaran tunai, pastikan untuk menyiapkan uang pas sesuai total akhir.
                </p>
            )}
        </>
    );
};

export default OrderDetailsForm;
