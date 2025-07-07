import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReportTypeEnum } from '@/enums/report-type';
import MerchantLayout from '@/layouts/merchant/layout';
import { ProfitReport } from '@/models/financial-management/profit-report';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { DatePicker } from './components/date-picker';
import ProfitReportTable from './partials/table';
import { columns } from './partials/table/columns';

interface Props {
    profitReports: ProfitReport[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Keuangan',
        href: '#',
    },
    {
        title: 'Laporan Laba',
        href: '/merchant/financial-management/profit-report',
    },
];

const reportTypeLabels: Record<ReportTypeEnum, string> = {
    [ReportTypeEnum.DAILY]: 'Harian - Laporan untuk hari ini',
    [ReportTypeEnum.WEEKLY]: 'Mingguan - Laporan 7 hari terakhir',
    [ReportTypeEnum.MONTHLY]: 'Bulanan - Laporan bulan ini',
    [ReportTypeEnum.CUSTOM]: 'Custom - Laporan kustom',
};

export default function ProfitReportPage({ profitReports }: Props) {
    const [selectedValue, setSelectedValue] = useState<ReportTypeEnum | ''>('');
    const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const onSelectItem = (value: ReportTypeEnum) => {
        setSelectedValue(value);
        if (value === ReportTypeEnum.CUSTOM) {
            setOpenDialogConfirm(false);
        } else {
            setOpenDialogConfirm(true);
        }
    };

    const handleConfirm = () => {
        if (selectedValue === ReportTypeEnum.CUSTOM && (!startDate || !endDate)) {
            toast.error('Error', {
                description: 'Tanggal mulai dan akhir wajib diisi untuk laporan custom.',
            });
            return;
        }

        setOpenDialogConfirm(false);
        handleSubmit(selectedValue as ReportTypeEnum);
    };

    const handleSubmit = (selectedValue: ReportTypeEnum) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: Record<string, any> = { report_type: selectedValue };

        if (selectedValue === ReportTypeEnum.CUSTOM) {
            data.start_date = startDate ? format(startDate, 'yyyy-MM-dd') : undefined;
            data.end_date = endDate ? format(endDate, 'yyyy-MM-dd') : undefined;
        }

        router.post(route('merchant.profit-report.store'), data, {
            onSuccess: () => {
                setSelectedValue('');
                toast.success('Success', {
                    description: 'Laporan Laba Berhasil Dibuat!',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
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
    };

    return (
        <>
            <Head title="Laporan Laba" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <main className="p-4">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-gray-700 dark:text-gray-200">Laporan Laba</h2>
                            <p className="text-muted-foreground mt-1.5 text-[14px]">Kelola laporan laba toko anda</p>
                        </div>

                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                            <Select onValueChange={onSelectItem} value={selectedValue}>
                                <SelectTrigger className="h-10 w-full rounded-lg border px-4 text-white shadow-none transition focus:ring-2 sm:w-[400px]">
                                    <SelectValue placeholder="Buat Laporan Anda" />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg border border-gray-200 shadow-none">
                                    <SelectGroup>
                                        <SelectLabel className="text-xs tracking-wider text-gray-500 uppercase">Pilih Jenis Laporan</SelectLabel>
                                        {Object.entries(reportTypeLabels).map(([value, label]) => (
                                            <SelectItem key={value} value={value} className="cursor-pointer p-4">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {selectedValue === ReportTypeEnum.CUSTOM && (
                        <div className="mt-4 rounded-lg border p-6 shadow-none">
                            <h3 className="mb-4 text-lg font-semibold">Buat Laporan Custom</h3>
                            <div className="space-y-4">
                                <div className="mt-6 space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="start_date" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            Tanggal Mulai
                                        </Label>
                                        <DatePicker date={startDate} onChange={(date) => setStartDate(date ?? null)} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="end_date" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            Tanggal Akhir
                                        </Label>
                                        <DatePicker date={endDate} onChange={(date) => setEndDate(date ?? null)} />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button variant="outline" onClick={() => setSelectedValue('')}>
                                        Batal
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            if (!startDate || !endDate) {
                                                toast.error('Error', {
                                                    description: 'Tanggal mulai dan akhir wajib diisi untuk laporan custom.',
                                                });
                                                return;
                                            }
                                            handleSubmit(ReportTypeEnum.CUSTOM);
                                        }}
                                    >
                                        Buat Laporan
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {openDialogConfirm && (
                        <Dialog open={openDialogConfirm} onOpenChange={setOpenDialogConfirm}>
                            <DialogContent className="sm:max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Konfirmasi Laporan</DialogTitle>
                                    <DialogDescription>Apakah Anda yakin ingin membuat laporan {selectedValue}?</DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setOpenDialogConfirm(false)}>
                                        Batal
                                    </Button>
                                    <Button onClick={handleConfirm}>Konfirmasi</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}

                    <div className="mt-6">
                        <ProfitReportTable data={profitReports} columns={columns} />
                    </div>
                </main>
            </MerchantLayout>
        </>
    );
}
