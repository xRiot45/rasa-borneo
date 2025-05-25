import MerchantLayout from '@/layouts/merchant/layout';
import { Head } from '@inertiajs/react';

export default function WithdrawPage() {
    return (
        <>
            <Head title="Penarikan Dana" />
            <MerchantLayout>
                <h1>Penarikan dana</h1>
            </MerchantLayout>
        </>
    );
}
