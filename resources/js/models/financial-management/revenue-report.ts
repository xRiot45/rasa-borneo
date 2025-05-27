import { ReportTypeEnum } from '@/enums/report-type';

export interface RevenueReport {
    id: number;
    report_date: string;
    report_type: ReportTypeEnum.DAILY;
    total_transactions: number;
    total_revenue: number;
}
