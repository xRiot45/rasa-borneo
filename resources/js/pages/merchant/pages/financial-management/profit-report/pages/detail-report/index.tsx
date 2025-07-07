import { Button } from '@/components/ui/button';
import MerchantLayout from '@/layouts/merchant/layout';
import { DetailProfitReport, ProfitReport } from '@/models/financial-management/profit-report';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';
import DetailProfitReportTable from './table';
import { columns } from './table/columns';

interface Props {
    profitReport: ProfitReport;
    reportDetails: DetailProfitReport[];
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
    {
        title: 'Detail Laporan Laba',
        href: '#',
    },
];

export default function ShowProfitReportPage({ profitReport, reportDetails }: Props) {
    console.log(reportDetails);
    return (
        <>
            <Head title="Detail Laporan Laba" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-2 p-4">
                    <Button onClick={() => window.history.back()} className="mb-6">
                        <Icon icon={'famicons:arrow-back'} className="mr-2 h-4 w-4" />
                        Kembali ke halaman sebelumnya
                    </Button>
                    <div className="mt-4 mb-2 flex flex-wrap items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Detail Laporan Laba</h2>
                            <p className="text-muted-foreground mt-1.5 text-[14px]">
                                Rentang Tanggal Laporan Laba :{' '}
                                <strong>
                                    {profitReport?.start_date} - {profitReport?.end_date}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <DetailProfitReportTable data={reportDetails} columns={columns} />
                </div>
            </MerchantLayout>
        </>
    );
}
