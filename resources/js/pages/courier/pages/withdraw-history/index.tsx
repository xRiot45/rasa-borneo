import EmptyData from '@/components/empty-img';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { WithdrawStatusEnum } from '@/enums/withdraw-status';
import CourierLayout from '@/layouts/courier/layout';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';
import { withdrawStatusColorMap } from '@/utils/withdraw-status-color';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';

interface WithdrawData {
    id: number;
    courier_id: number | null;
    merchant_id: number | null;
    withdraw_code: string;
    amount: number;
    bank_code: string;
    bank_account_number: string;
    bank_account_name: string;
    status: string;
    note: string;
    requested_at: string;
    approved_at: string | null;
    rejected_at: string | null;
    cancelled_at: string | null;
    transferred_at: string | null;
    transfer_proof: string | null;
}

interface Props {
    data: WithdrawData[];
}

export default function WithdrawHistoryPage({ data }: Props) {
    return (
        <>
            <Head title="Riwayat Penarikan Dana" />
            <CourierLayout>
                <main className="mt-22">
                    <Button onClick={() => window.history.back()} className="cursor-pointer">
                        <Icon icon={'material-symbols:arrow-back-rounded'} className="mr-2" />
                        Kembali ke halaman sebelumnya
                    </Button>
                    <div className="mt-6">
                        <h2 className="text-lg font-bold">Riwayat Penarikan Dana</h2>
                        <p className="text-muted-foreground text-sm">Lihat semua riwayat penarikan dana yang telah kamu ajukan</p>
                    </div>

                    {data.length === 0 ? (
                        <EmptyData
                            title="Belum ada riwayat penarikan"
                            description="Anda belum melakukan penarikan dana, silahkan ajukan penarikan dana"
                        />
                    ) : (
                        data.map((item) => (
                            <Card key={item.id} className="mx-auto my-6 w-full rounded-xl py-6 shadow-none">
                                <CardHeader>
                                    <CardTitle className="text-xl">Penarikan Dana</CardTitle>
                                    <p className="text-muted-foreground text-sm">{item.withdraw_code}</p>
                                </CardHeader>
                                <CardContent className="space-y-5 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Nama Pemilik Rekening</span>
                                        <span>{item.bank_account_name}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">No. Rekening</span>
                                        <span>{item.bank_account_number}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Bank</span>
                                        <span>{item.bank_code}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Jumlah Penarikan</span>
                                        <span>{formatCurrency(item.amount)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Status</span>
                                        <Badge className={`capitalize ${withdrawStatusColorMap[item.status as WithdrawStatusEnum]}`}>
                                            {item.status}
                                        </Badge>
                                    </div>
                                    {item.status === WithdrawStatusEnum.APPROVED && item.approved_at && (
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">Disetujui pada</span>
                                            <span>{formatDate(item.approved_at)}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Catatan</span>
                                        <span>{item.note || '-'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Tanggal Penarikan</span>
                                        <span>{formatDate(item.requested_at)}</span>
                                    </div>

                                    {item.transfer_proof && (
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">Bukti Transfer</span>
                                            <div className="pt-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" className="cursor-pointer">
                                                            Lihat Bukti Transfer
                                                            <Icon icon="material-symbols:open-in-new-rounded" className="ml-2" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-md">
                                                        <DialogHeader>
                                                            <DialogTitle>Bukti Transfer</DialogTitle>
                                                        </DialogHeader>
                                                        <img
                                                            src={`${item.transfer_proof}`}
                                                            alt="Bukti Transfer"
                                                            className="h-auto w-full rounded-md object-contain"
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </main>
            </CourierLayout>
        </>
    );
}
