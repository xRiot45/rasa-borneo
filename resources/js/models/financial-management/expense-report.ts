export type NonEmptyArray<T> = [T, ...T[]];

export interface ExpenseReportItem {
    name: string;
    description: string;
    amount: number;
}

export interface ExpenseReportForm {
    report_date: Date | string;
    description?: string;
    category_id: number;
    items: NonEmptyArray<ExpenseReportItem>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface ExpenseReport {
    id: number;
}

export interface ExpenseReportCategory {
    id: number;
    name: string;
}

export interface ExpenseReportCategoryForm {
    name: string;
}
