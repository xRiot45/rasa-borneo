export interface Fee {
    delivery_fee: {
        id: number;
        type: string;
        amount: number;
    };
    application_service_fee: {
        id: number;
        type: string;
        amount: number;
    };
}

export interface FeeItem {
    id: number;
    type: string;
    amount: number;
}
