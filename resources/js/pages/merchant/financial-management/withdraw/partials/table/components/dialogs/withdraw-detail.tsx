import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
                <Button variant="ghost" className="flex w-full cursor-pointer items-center justify-between gap-1 px-3 font-light">
                    Lihat Detail Pengajuan
                    <Icon icon={'mdi:eye'} className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Detail Penarikan Dana</DialogTitle>
                    <DialogDescription>Informasi lengkap mengenai pengajuan penarikan dana.</DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground font-semibold">Kode Penarikan</span>
                        <span>{withdraw.withdraw_code}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground font-semibold">Jumlah Penarikan</span>
                        <span>{formatCurrency(withdraw?.amount)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground font-semibold">Bank</span>
                        <span>{withdraw.bank_code}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground font-semibold">Nomor Rekening</span>
                        <span>{withdraw.bank_account_number}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground font-semibold">Atas Nama Rekening</span>
                        <span>{withdraw.bank_account_name}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground font-semibold">Status</span>
                        <Badge className={`${withdrawStatusColorMap[withdraw.status]} capitalize`}>{withdraw.status}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground font-semibold">Catatan</span>
                        <span>{withdraw.note || '-'}</span>
                    </div>

                    {/* Tanggal-tanggal penting */}
                    <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground font-semibold">Tanggal Pengajuan</span>
                        <span>{formatDate(withdraw.requested_at)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground font-semibold">Tanggal Disetujui</span>
                        <span>{withdraw.aproved_at ? formatDate(withdraw.aproved_at) : '-'}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground font-semibold">Tanggal Ditolak</span>
                        <span>{withdraw.rejected_at ? formatDate(withdraw.rejected_at) : '-'}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground font-semibold">Tanggal Dibatalkan</span>
                        <span>{withdraw.canceled_at ? formatDate(withdraw.canceled_at) : '-'}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground font-semibold">Tanggal Transfer</span>
                        <span>{withdraw.transferred_at ? formatDate(withdraw.transferred_at) : '-'}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WithdrawDetailDialog;
