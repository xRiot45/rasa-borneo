import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { OrderTypeEnum } from '@/enums/order-type';
import { PaymentMethodEnum } from '@/enums/payment-method';
import { Coupon } from '@/models/coupon';
import { TableModel } from '@/models/table';
import { Transaction, TransactionForm } from '@/models/transactions';
import { formatCurrency } from '@/utils/format-currency';

interface RightCheckoutPanelProps {
    formData: TransactionForm;
    errors: Record<string, string>;
    transaction: Transaction;
    tables: TableModel[];
    coupons: Coupon[];
    selectedCouponId: number | null;
    onSelectCoupon: (value: string) => void;
    setData: <K extends keyof TransactionForm>(key: K, value: TransactionForm[K]) => void;
    finalTotal: number;
    handlePay: (method: 'cash' | 'midtrans') => void;
}

const RightCheckoutPanel: React.FC<RightCheckoutPanelProps> = ({
    formData,
    errors,
    tables,
    coupons,
    selectedCouponId,
    onSelectCoupon,
    setData,
    finalTotal,
    handlePay,
}) => {
    return (
        <Card className="border-none shadow-none">
            <CardContent className="space-y-4">
                {/* Note */}
                <div className="space-y-2">
                    <Label htmlFor="note">Catatan (Opsional)</Label>
                    <Input
                        id="note"
                        value={formData.note}
                        onChange={(e) => setData('note', e.target.value)}
                        placeholder="Contoh: tanpa sambal, level 2"
                    />
                    <InputError message={errors.note} />
                </div>

                {/* Table Selection */}
                {formData.order_type === OrderTypeEnum.DINEIN && (
                    <div className="space-y-2">
                        <Label htmlFor="dine_in_table_id">Nomor Meja</Label>
                        <Select value={formData.dine_in_table_id?.toString()} onValueChange={(value) => setData('dine_in_table_id', parseInt(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih nomor meja" />
                            </SelectTrigger>
                            <SelectContent>
                                {tables.map((table) => (
                                    <SelectItem key={table.id} value={table.id.toString()}>
                                        {table?.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.dine_in_table_id} />
                    </div>
                )}

                {/* Customer Info */}
                {formData.order_type === OrderTypeEnum.DELIVERY && (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="orderer_name">Nama Pemesan</Label>
                            <Input id="orderer_name" value={formData.orderer_name} onChange={(e) => setData('orderer_name', e.target.value)} />
                            <InputError message={errors.orderer_name} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="orderer_phone_number">Nomor Telepon</Label>
                            <Input
                                id="orderer_phone_number"
                                value={formData.orderer_phone_number}
                                onChange={(e) => setData('orderer_phone_number', e.target.value)}
                            />
                            <InputError message={errors.orderer_phone_number} />
                        </div>
                    </>
                )}

                {/* Cash Received Input */}
                {formData.payment_method === PaymentMethodEnum.CASH && (
                    <div className="space-y-2">
                        <Label htmlFor="cash_received_amount">Jumlah Uang yang Diterima</Label>
                        <Input
                            type="number"
                            id="cash_received_amount"
                            value={formData.cash_received_amount}
                            onChange={(e) => setData('cash_received_amount', parseInt(e.target.value))}
                            placeholder="Masukkan nominal uang dari pelanggan"
                        />
                        <InputError message={errors.cash_received_amount} />
                    </div>
                )}

                {/* Coupon */}
                {coupons.length > 0 && (
                    <div className="space-y-2">
                        <Label htmlFor="coupon_id">Gunakan Kupon</Label>
                        <Select value={selectedCouponId?.toString() ?? ''} onValueChange={onSelectCoupon}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih kupon" />
                            </SelectTrigger>
                            <SelectContent>
                                {coupons.map((coupon) => (
                                    <SelectItem key={coupon.id} value={coupon.id.toString()}>
                                        {coupon?.discount}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.coupon_id} />
                    </div>
                )}

                <Separator />

                {/* Final Total & Payment Buttons */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between font-semibold">
                        <span>Total Bayar</span>
                        <span>{formatCurrency(finalTotal)}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        {formData.payment_method === PaymentMethodEnum.CASH ? (
                            <Button onClick={() => handlePay('cash')} disabled={finalTotal <= 0}>
                                Bayar Sekarang (Tunai)
                            </Button>
                        ) : (
                            <Button onClick={() => handlePay('midtrans')} disabled={finalTotal <= 0}>
                                Bayar Sekarang (Midtrans)
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default RightCheckoutPanel;
