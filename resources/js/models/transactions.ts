import { OrderLocationEnum } from '@/enums/order-location';
import { OrderTypeEnum } from '@/enums/order-type';
import { PaymentMethodEnum } from '@/enums/payment-method';
import { Merchant } from './merchant';
import { OrderStatus } from './order-status';

export interface TransactionItem {
    id: number;
    transaction_id: number;
    menu_item_id: number;
    merchant_id: number;
    menu_item_name: string;
    menu_item_price: number;
    menu_item_image_url: string;
    menu_item_category: string;
    quantity: number;
    note: string | null;
    subtotal: number;
    already_reviewed?: boolean;
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    id: number;
    transaction_code: string;
    customer_id: number;
    order_type: string | null;
    order_location: string | null;
    payment_method: string | null;
    payment_status: string;
    payment_reference: string | null;
    cash_received_amount: number;
    change_amount: number;
    customer_address_id: number | null;
    recipient_address_label: string | null;
    recipient_name: string | null;
    recipient_phone_number: string | null;
    recipient_email: string | null;
    recipient_address: string | null;
    delivery_note: string | null;
    dine_in_table_id: number | null;
    dine_in_table_label: string | null;
    orderer_name: string | null;
    orderer_phone_number: string | null;
    coupon_id: number | null;
    coupon_code: string | null;
    coupon_type: string | null;
    coupon_discount: number;
    note: string | null;
    subtotal_transaction_item: number;
    delivery_fee: number;
    application_service_fee: number;
    discount_total: number;
    final_total: number;
    checked_out_at: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    transaction_items: TransactionItem[];
    order_status: OrderStatus[];
    merchant: Merchant;
    latest_order_status: OrderStatus;
}

export interface TransactionForm {
    //   -- Informasi Tipe Order & Lokasi Order
    order_type: OrderTypeEnum;
    order_location: OrderLocationEnum;

    //   -- Informasi Pembayaran
    payment_method: PaymentMethodEnum;
    cash_received_amount: number | undefined;

    //   -- Snapshot dari table (khusus dine-in)
    dine_in_table_id: number | null;

    //   -- Informasi customer (khusus dine-in, takeway dan pickup)
    orderer_name: string;
    orderer_phone_number: string;

    //   -- Snapshot dari coupon_id (Informasi Kupon)
    coupon_id: number;

    //     -- Informasi Tambahan
    note: string;
}
