/* eslint-disable @typescript-eslint/no-explicit-any */
import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
    interface Window {
        snap: any;
        Echo: any;
    }

    interface PageProps {
        flash: { [key: string]: string };
    }
}

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        className: string;
    }
}
