import gradients from '@/constants/gradient-colors';
import CustomerLayout from '@/layouts/customer/layout';
import { MenuCategory } from '@/models/menu-category';
import { getCategoryIcon } from '@/utils/category-icons';
import { Head, Link } from '@inertiajs/react';

interface Props {
    data: MenuCategory[];
}

export default function MenuCategoriesPage({ data }: Props) {
    return (
        <>
            <Head title="Kategori Menu" />
            <CustomerLayout>
                <main className="mt-22">
                    <div className="mb-6">
                        <h2 className="text-lg font-black">Kategori Menu</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Daftar kategori menu yang tersedia</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {data.slice(0, 6).map((category, index) => {
                            const CategoryIcon = getCategoryIcon(category.name);

                            return (
                                <Link key={category.id} href={route('menu', { category: category.slug })}>
                                    <div
                                        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl bg-gradient-to-br p-4 text-white transition-all ${gradients[index % gradients.length]} space-y-4 hover:scale-[1.04]`}
                                    >
                                        <div className="mb-3">
                                            <CategoryIcon className="h-6 w-6 text-white" />
                                        </div>
                                        <span className="text-center text-sm font-bold">{category.name}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </main>
            </CustomerLayout>
        </>
    );
}
