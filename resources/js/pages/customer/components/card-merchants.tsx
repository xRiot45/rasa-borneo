import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Merchant } from '@/models/merchant';
import { Icon } from '@iconify/react';
import { Link } from '@inertiajs/react';

interface Props {
    data: Merchant[];
}

const CardMerchant: React.FC<Props> = ({ data }) => {
    const isLoading = !data;

    return (
        <>
            <main>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {isLoading
                        ? Array.from({ length: 6 }).map((_, index) => (
                              <Card key={index} className="rounded-xl border shadow-none transition">
                                  <Skeleton className="h-40 w-full rounded-t-2xl" />

                                  <CardContent className="space-y-4 pb-5">
                                      <div className="flex items-start gap-4">
                                          <Skeleton className="h-20 w-20 rounded-md" />

                                          <div className="flex-1 space-y-2">
                                              <Skeleton className="h-4 w-24 rounded-sm" />
                                              <Skeleton className="h-5 w-3/4" />
                                              <Skeleton className="h-4 w-1/2" />
                                              <Skeleton className="h-4 w-4/5" />
                                          </div>
                                      </div>
                                      <Skeleton className="h-10 w-full rounded-md" />
                                  </CardContent>
                              </Card>
                          ))
                        : data?.map((merchant) => (
                              <Card key={merchant.id} className="group rounded-xl border shadow-none transition">
                                  <div className="w-full overflow-hidden rounded-t-2xl">
                                      <img
                                          src={`${merchant.store_profile?.cover_photo}`}
                                          alt={merchant.business_name}
                                          className="h-full w-full object-cover transition duration-300"
                                      />
                                  </div>

                                  <CardContent className="space-y-4 pb-5">
                                      <div className="flex items-start gap-4">
                                          <Avatar className="h-20 w-20 rounded-md">
                                              <AvatarImage
                                                  src={`${merchant.store_profile?.logo_photo}`}
                                                  alt={merchant.business_name}
                                                  className="object-cover"
                                              />
                                          </Avatar>

                                          <div className="mb-4 flex-1 space-y-1">
                                              <div className="flex flex-col items-start justify-between">
                                                  {merchant.business_category?.name && (
                                                      <Badge variant="default" className="mb-1 rounded-sm">
                                                          {merchant.business_category.name}
                                                      </Badge>
                                                  )}
                                                  <h1 className="line-clamp-1 text-base font-semibold text-gray-900 dark:text-white">
                                                      {merchant.business_name}
                                                  </h1>
                                              </div>

                                              <p className="text-sm text-gray-500 dark:text-gray-400">{merchant.business_phone}</p>
                                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                  <Icon icon="mingcute:location-line" className="mr-2" />
                                                  <span className="line-clamp-2">{merchant.business_address}</span>
                                              </div>
                                          </div>
                                      </div>

                                      <Link href={route('merchant.show', { merchant: merchant.slug })}>
                                          <Button className="w-full cursor-pointer py-5 text-sm font-medium">
                                              Lihat Detail Merchant
                                              <Icon icon="icon-park-outline:right-c" className="ml-2" />
                                          </Button>
                                      </Link>
                                  </CardContent>
                              </Card>
                          ))}
                </div>
            </main>
        </>
    );
};

export default CardMerchant;
