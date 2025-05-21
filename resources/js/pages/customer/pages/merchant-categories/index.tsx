import EmptyImage from '@/assets/errors/empty.svg';
import CustomerLayout from '@/layouts/customer/layout';
import { BusinessCategory } from '@/models/business-category';
import { Head } from '@inertiajs/react';
import CardMerchantCategories from '../../components/card-merchant-categories';

interface Props {
    data: BusinessCategory[];
}

export default function MerchantCategoriesPage({ data }: Props) {
    return (
        <>
            <Head title="Kategori Menu" />
            <CustomerLayout>
                <main className="mt-22">
                    <div className="mb-6">
                        <h2 className="text-lg font-black">Kategori Toko</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Daftar kategori toko yang tersedia</p>
                    </div>

                    {!data ? (
                        <div className="flex flex-col">
                            <div className="flex grow items-center px-6 xl:px-10">
                                <div className="mx-auto text-center">
                                    <img src={EmptyImage} alt="Error" className="mx-auto mb-8 w-full max-w-lg lg:mb-12 2xl:mb-16" />
                                    <h1 className="text-[22px] font-bold text-gray-700 dark:text-gray-100">Tidak Ada Merchant / Penjual</h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Penjual tidak tersedia untuk saat ini, silahkan kembali beberapa saat lagi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <CardMerchantCategories data={data} />
                    )}
                </main>
            </CustomerLayout>
        </>
    );
}
