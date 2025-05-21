import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { PaymentMethodEnum } from '@/enums/payment-method';
import { TransactionForm } from '@/models/transactions';
import { Icon } from '@iconify/react';

interface Props {
    processing: boolean;
    formData: TransactionForm;
    handlePay: (paymentMethod: PaymentMethodEnum) => void;
    setShowPaymentMethodCashDialog: (value: boolean) => void;
    showPaymentMethodCashDialog: boolean;
}

const PaymentActionButton: React.FC<Props> = ({ processing, formData, handlePay, setShowPaymentMethodCashDialog, showPaymentMethodCashDialog }) => {
    return (
        <Dialog open={showPaymentMethodCashDialog} onOpenChange={setShowPaymentMethodCashDialog}>
            <Button
                type="submit"
                className="mt-4 w-full py-6 text-sm"
                disabled={processing}
                onClick={() => {
                    if (formData.payment_method === PaymentMethodEnum.CASH) {
                        setShowPaymentMethodCashDialog(true);
                    } else {
                        handlePay(PaymentMethodEnum.CASHLESS);
                    }
                }}
            >
                <Icon icon={formData.payment_method === PaymentMethodEnum.CASH ? 'mdi:cash' : 'streamline:bill-cashless'} />
                {formData.payment_method === PaymentMethodEnum.CASH ? 'Bayar dengan Cash / Tunai' : 'Bayar dengan Midtrans'}
            </Button>

            <DialogContent className="sm:max-w-2xl">
                <AlertDialogHeader>
                    <DialogTitle>Bayar dengan Tunai</DialogTitle>
                </AlertDialogHeader>
                <DialogDescription className="text-sm">
                    Cek semua data pembayaran diatas dan pastikan sudah benar. Jika sudah benar, klik tombol dibawah ini untuk melanjutkan proses nya
                </DialogDescription>
                <AlertDialogFooter className="mt-4">
                    <Button
                        className="w-full cursor-pointer py-6"
                        onClick={() => {
                            handlePay(PaymentMethodEnum.CASH);
                            setShowPaymentMethodCashDialog(false);
                        }}
                    >
                        <Icon icon="mdi:cash" width={24} height={24} />
                        Saya Mengerti & Selesaikan Pesanan
                    </Button>
                </AlertDialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentActionButton;
