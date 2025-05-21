import SummaryRow from '@/components/summary-row';
import { OrderTypeEnum } from '@/enums/order-type';
import { PaymentMethodEnum } from '@/enums/payment-method';
import { Transaction, TransactionForm } from '@/models/transactions';
import { formatCurrency } from '@/utils/format-currency';

interface Props {
    transaction: Transaction;
    formData: TransactionForm;
    deliveryFee: number;
    couponDiscount: number;
    finalTotal: number;
}

const TransactionSummary: React.FC<Props> = ({ transaction, formData, deliveryFee, couponDiscount, finalTotal }) => {
    return (
        <main className="space-y-4">
            <SummaryRow label="Subtotal" value={formatCurrency(transaction?.subtotal_transaction_item)} />
            {formData.order_type === OrderTypeEnum.DELIVERY && <SummaryRow label="Biaya Pengiriman" value={formatCurrency(deliveryFee)} />}

            <SummaryRow label="Biaya Layanan Aplikasi" value={formatCurrency(transaction?.application_service_fee)} />
            <SummaryRow label="Diskon" value={couponDiscount > 0 ? `- ${formatCurrency(couponDiscount)}` : '- Rp. 0'} className="text-red-500" />

            <SummaryRow label="Total Akhir" value={formatCurrency(finalTotal)} />
            {formData?.payment_method === PaymentMethodEnum.CASH && (
                <SummaryRow
                    label="Kembalian"
                    value={
                        (formData.cash_received_amount ?? 0) >= finalTotal
                            ? formatCurrency((formData.cash_received_amount ?? 0) - finalTotal)
                            : formatCurrency(0)
                    }
                />
            )}
        </main>
    );
};

export default TransactionSummary;
