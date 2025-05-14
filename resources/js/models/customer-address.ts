import { AddressLabelEnum } from '@/enums/address-label';

export interface CustomerAddress {
    id: number;
    // address_label:
    //     | AddressLabelEnum.HOME
    //     | AddressLabelEnum.APARTEMENT
    //     | AddressLabelEnum.OFFICE
    //     | AddressLabelEnum.BOARDINGHOUSE
    //     | AddressLabelEnum.OTHERS;
    address_label: AddressLabelEnum;
    complete_address: string;
    note_to_courier: string;
    recipient_name: string;
    email: string;
    phone_number: string;
    is_primary: boolean;
}

export interface CustomerAddressForm {
    address_label: AddressLabelEnum;
    complete_address: string;
    note_to_courier: string;
    recipient_name: string;
    email: string;
    phone_number: string;
    is_primary: boolean;
}
