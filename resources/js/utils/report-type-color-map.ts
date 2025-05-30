import { ReportTypeEnum } from "@/enums/report-type";

export const reportTypeColorMap: Record<ReportTypeEnum, string> = {
    [ReportTypeEnum.DAILY]: 'bg-blue-100 border border-blue-600 text-blue-600 font-bold',
    [ReportTypeEnum.WEEKLY]: 'bg-purple-100 border border-purple-600 text-purple-600 font-bold',
    [ReportTypeEnum.MONTHLY]: 'bg-teal-100 border border-teal-600 text-teal-600 font-bold',
    [ReportTypeEnum.CUSTOM]: 'bg-indigo-100 border border-indigo-600 text-indigo-600 font-bold',
};
