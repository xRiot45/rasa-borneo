import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Merchant } from '@/models/merchant';
import { Icon } from '@iconify/react';

interface Props {
    merchants: Merchant[];
}

const MerchantSection: React.FC<Props> = ({ merchants }) => {
    return (
        <>
            <section className="mx-auto mt-12 w-full max-w-screen-xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold">Merchant Terdaftar</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Daftar mitra bisnis yang telah diverifikasi</p>
                    </div>

                    <Button className="text-primary text-sm font-medium" variant="link">
                        Lihat Semua Merchant
                        <Icon icon="icon-park-outline:right-c" className="ml-1" />
                    </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {merchants.slice(0, 6).map((merchant) => (
                        <Card key={merchant.id} className="group rounded-xl border shadow-none transition">
                            <div className="w-full overflow-hidden rounded-t-2xl">
                                <img
                                    src={`${merchant.store_profile?.cover_photo}`}
                                    alt={merchant.business_name}
                                    className="h-full w-full object-cover transition duration-300 group-hover:brightness-50"
                                />
                            </div>

                            <CardContent className="space-y-4 pb-5">
                                {/* Logo dan Nama */}
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-16 w-16 rounded-md">
                                        <AvatarImage
                                            src={`${merchant.store_profile?.logo_photo}`}
                                            alt={merchant.business_name}
                                            className="object-cover"
                                        />
                                    </Avatar>

                                    <div className="mb-4 flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h1 className="line-clamp-1 text-base font-semibold text-gray-900 dark:text-white">
                                                {merchant.business_name}
                                            </h1>
                                            {merchant.business_category?.name && (
                                                <Badge variant="default" className="rounded-sm">
                                                    {merchant.business_category.name}
                                                </Badge>
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-500 dark:text-gray-400">{merchant.business_phone}</p>
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <Icon icon="mingcute:location-line" className="mr-2" />
                                            <span className="line-clamp-2">{merchant.business_address}</span>
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full cursor-pointer py-5 text-sm font-medium">
                                    Lihat Detail Merchant
                                    <Icon icon="icon-park-outline:right-c" className="ml-2" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </>
    );
};

export default MerchantSection;
