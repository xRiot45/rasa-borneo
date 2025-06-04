import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Withdraw } from '@/models/financial-management/withdraw';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { withdrawStatusColorMap } from '@/utils/withdraw-status-color';
import { Icon } from '@iconify/react';

interface Props {
    withdraw: Withdraw;
}

const WithdrawDetailDialog: React.FC<Props> = ({ withdraw }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="flex w-full cursor-pointer items-center justify-between gap-1 p-6 font-light">
                    Lihat Detail Pengajuan
                    <Icon icon={'mdi:eye'} className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Detail Penarikan Dana</DialogTitle>
                    <DialogDescription>Informasi lengkap mengenai pengajuan penarikan dana.</DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-6 text-sm">
                    {/* Informasi Penarikan */}
                    <div className="space-y-2">
                        <Label className="text-base font-bold">Informasi Penarikan</Label>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            <span className="text-muted-foreground font-medium">Kode Penarikan</span>
                            <span>: {withdraw.withdraw_code}</span>

                            <span className="text-muted-foreground font-medium">Jumlah Penarikan</span>
                            <span>: {formatCurrency(withdraw?.amount)}</span>
                        </div>
                    </div>

                    {/* Informasi Bank */}
                    <div className="space-y-2">
                        <Label className="text-base font-bold">Informasi Bank</Label>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            <span className="text-muted-foreground font-medium">Kode & Nama Bank</span>
                            <span>: {withdraw.bank_code}</span>

                            <span className="text-muted-foreground font-medium">Nomor Rekening</span>
                            <span>: {withdraw.bank_account_number}</span>

                            <span className="text-muted-foreground font-medium">Atas Nama Rekening</span>
                            <span>: {withdraw.bank_account_name}</span>
                        </div>
                    </div>

                    {/* Informasi Merchant */}
                    <div className="space-y-2">
                        <Label className="text-base font-bold">Informasi Merchant</Label>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            <span className="text-muted-foreground font-medium">Nama Merchant</span>
                            <span>: {withdraw?.merchant?.business_name}</span>

                            <span className="text-muted-foreground font-medium">Nomor Telepon Merchant</span>
                            <span>: {withdraw?.merchant?.business_phone}</span>

                            <span className="text-muted-foreground font-medium">Alamat Merchant</span>
                            <span>: {withdraw?.merchant?.business_address}</span>
                        </div>
                    </div>

                    {/* Status & Catatan */}
                    <div className="space-y-2">
                        <Label className="text-base font-bold">Status & Catatan</Label>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            <span className="text-muted-foreground font-medium">Status</span>
                            <Badge className={`${withdrawStatusColorMap[withdraw.status]} capitalize`}>{withdraw.status}</Badge>

                            <span className="text-muted-foreground font-medium">Catatan</span>
                            <span>: {withdraw.note || '-'}</span>
                        </div>
                    </div>

                    {/* Tanggal-Tanggal Penting */}
                    <div className="space-y-2">
                        <Label className="text-base font-bold">Informasi Tanggal</Label>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            <span className="text-muted-foreground font-medium">Tanggal & Waktu Pengajuan</span>
                            <span>: {formatDate(withdraw.requested_at)}</span>

                            <span className="text-muted-foreground font-medium">Tanggal & Waktu Disetujui</span>
                            <span>: {withdraw.approved_at ? formatDate(withdraw.approved_at) : '-'}</span>

                            <span className="text-muted-foreground font-medium">Tanggal & Waktu Ditolak</span>
                            <span>: {withdraw.rejected_at ? formatDate(withdraw.rejected_at) : '-'}</span>

                            <span className="text-muted-foreground font-medium">Tanggal & Waktu Dibatalkan</span>
                            <span>: {withdraw.cancelled_at ? formatDate(withdraw.cancelled_at) : '-'}</span>

                            <span className="text-muted-foreground font-medium">Tanggal & Waktu Transfer</span>
                            <span>: {withdraw.transferred_at ? formatDate(withdraw.transferred_at) : '-'}</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WithdrawDetailDialog;
