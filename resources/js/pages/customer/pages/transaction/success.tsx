import PaymentSuccessImg from '@/assets/images/payment/payment-success.png';
import { Button } from '@/components/ui/button';
import CustomerLayout from '@/layouts/customer/layout';
import { Icon } from '@iconify/react';
import { Head, router } from '@inertiajs/react';

export default function TransactionSuccessPage() {
    return (
        <>
            <Head title="Pembayaran Berhasil" />
            <CustomerLayout>
                <main className="flex min-h-screen flex-col bg-white dark:bg-[#171717]">
                    <div className="flex grow items-center px-6 xl:px-10">
                        <div className="mx-auto text-center">
                            <img src={PaymentSuccessImg} alt="Error" className="mx-auto mb-8 w-full max-w-lg lg:mb-12 2xl:mb-16" />
                            <h1 className="text-gray-1000 text-[22px] leading-normal font-bold text-gray-700 lg:text-3xl dark:text-gray-100">
                                Pembayaran Berhasil
                            </h1>
                            <p className="text-sm leading-loose text-gray-500 mt-2 lg:text-base lg:leading-loose dark:text-gray-400">
                                Terima kasih telah melakukan pembayaran. Silahkan kembali ke halaman beranda
                            </p>

                            <div className="mt-6">
                                <Button className="cursor-pointer rounded-lg py-6" onClick={() => router.visit(route('home'))}>
                                    <Icon icon="material-symbols:home" />
                                    Kembali ke halaman beranda
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </CustomerLayout>
        </>
    );
}
