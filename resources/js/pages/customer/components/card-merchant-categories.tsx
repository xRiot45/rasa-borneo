import { Skeleton } from '@/components/ui/skeleton';
import gradients from '@/constants/gradient-colors';
import { BusinessCategory } from '@/models/business-category';
import { getCategoryIcon } from '@/utils/category-icons';
import { Link } from '@inertiajs/react';

interface Props {
    data: BusinessCategory[];
}

const CardMerchantCategories: React.FC<Props> = ({ data }) => {
    const isLoading = !data;

    return (
        <>
            <main>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, index) => (
                              <div key={index} className="bg-muted flex flex-col items-center justify-center space-y-4 rounded-xl p-4">
                                  <Skeleton className="h-6 w-6 rounded-full" />
                                  <Skeleton className="h-4 w-20" />
                              </div>
                          ))
                        : data?.map((category, index) => {
                              const CategoryIcon = getCategoryIcon(category?.name);

                              return (
                                  <Link key={category.id} href={route('merchant', { category: category?.name })}>
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
        </>
    );
};

export default CardMerchantCategories;
