export type NonEmptyArray<T> = [T, ...T[]];

export interface ExpenseReport {
    id: number;
    report_date: string;
    description: string;
    total_expense: number;
    expense_report_items: ExpenseReportItem[];
}

export interface ExpenseReportItem {
    name: string;
    category_id: number;
    expense_report_category?: ExpenseReportCategory;
    description: string;
    amount: string;
}

export interface ExpenseReportForm {
    report_date: Date | string;
    description?: string;
    items: NonEmptyArray<ExpenseReportItem>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface ExpenseReportCategory {
    id: number;
    name: string;
}

export interface ExpenseReportCategoryForm {
    name: string;
}
