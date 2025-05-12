import EmptyImage from '@/assets/errors/empty.svg';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { StoreOperatingHour } from '@/models/store-management/store-operating-hour';
import dayTranslations from '@/utils/day-translation';
import { Icon } from '@iconify/react';

interface Props {
    data: StoreOperatingHour[];
}

const TabStoreOperatingHour: React.FC<Props> = ({ data }) => {
    return (
        <>
            <main>
                {data && data?.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {data.map((item, index) => {
                            return (
                                <Card
                                    key={index}
                                    className={`flex flex-col gap-6 rounded-2xl border p-6 shadow-none transition duration-300 ${
                                        item.is_closed ? 'border-red-300 bg-red-50 text-red-900' : 'border-green-300 bg-green-50 text-green-900'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <Label className="block text-lg font-semibold">{dayTranslations[item.day] || item.day}</Label>

                                        {item.is_closed ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 shadow">
                                                <Icon icon="mdi:close-circle-outline" className="text-lg text-red-600" />
                                                Toko Tutup
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 shadow">
                                                <Icon icon="mdi:check-circle-outline" className="text-lg text-green-600" />
                                                Toko Buka
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
                                        <div className="flex flex-col space-y-1">
                                            <Label className="text-muted-foreground text-sm">Waktu Buka</Label>
                                            <div className={`text-lg font-semibold ${item.is_closed ? 'text-gray-500' : 'text-green-800'}`}>
                                                {item.is_closed ? '-' : item.open_time}
                                            </div>
                                        </div>

                                        <span className="hidden md:inline">—</span>

                                        <div className="flex flex-col space-y-1">
                                            <Label className="text-muted-foreground text-sm">Waktu Tutup</Label>
                                            <div className={`text-lg font-semibold ${item.is_closed ? 'text-gray-500' : 'text-green-800'}`}>
                                                {item.is_closed ? '-' : item.close_time}
                                            </div>
                                        </div>
                                    </div>

                                    {item.is_closed ? (
                                        <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                                            <Icon icon="material-symbols:info-outline-rounded" className="text-base" />
                                            Toko tidak beroperasi pada hari ini.
                                        </div>
                                    ) : (
                                        <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                                            <Icon icon="material-symbols:info-outline-rounded" className="text-base" />
                                            Toko sedang beroperasi dengan jam normal.
                                        </div>
                                    )}
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex min-h-screen flex-col bg-white dark:bg-[#171717]">
                        <div className="flex grow items-center px-6 xl:px-10">
                            <div className="mx-auto text-center">
                                <img src={EmptyImage} alt="Error" className="mx-auto mb-8 w-full max-w-lg lg:mb-12 2xl:mb-16" />
                                <h1 className="text-[22px] font-bold text-gray-700 dark:text-gray-100">Jam Operasional Toko Belum Diatur</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Jam operasional toko belum diatur, silahkan kembali beberapa saat lagi.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default TabStoreOperatingHour;
