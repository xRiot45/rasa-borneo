import { ReportTypeEnum } from '@/enums/report-type';

export interface ProfitReport {
    id: number;
    start_date: string;
    end_date: string;
    report_type: ReportTypeEnum;
    total_revenue: number;
    total_expense: number;
    gross_profit: number;
    net_profit: number;
    created_at?: string;
    updated_at?: string;
}
