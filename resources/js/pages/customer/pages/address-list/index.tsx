import EmptyImage from '@/assets/errors/empty.svg';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CustomerLayout from '@/layouts/customer/layout';
import { CustomerAddress } from '@/models/customer-address';
import { Icon } from '@iconify/react';
import { Head, Link } from '@inertiajs/react';
import { MapPin } from 'lucide-react';

interface Props {
    data: CustomerAddress[];
}

export default function AddressListPage({ data }: Props) {
    return (
        <>
            <Head title="Daftar Alamat Saya" />
            <CustomerLayout>
                <main className="mt-22">
                    <div className="mb-5 flex flex-col items-start justify-between md:flex-row">
                        <div>
                            <h2 className="text-lg font-bold">Daftar Alamat Saya</h2>
                            <p className="text-muted-foreground text-sm">Daftar semua alamat saya yang tersedia</p>
                        </div>

                        <div className="mt-6 flex w-full flex-col gap-2 md:mt-0 md:w-auto md:flex-row">
                            <Link href={route('address-list.create')}>
                                <Button className="w-full cursor-pointer rounded-sm shadow-none">
                                    Tambah Alamat
                                    <Icon icon="ic:baseline-add" />
                                </Button>
                            </Link>

                            <Button variant="outline" className="w-full cursor-pointer rounded-sm shadow-none">
                                Filter
                                <Icon icon="mage:filter" />
                            </Button>
                        </div>
                    </div>

                    {data.length > 0 ? (
                        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {data?.map((item, index) => (
                                <Card
                                    key={index}
                                    className={`relative rounded-2xl border shadow-none transition-all duration-300 ${
                                        item.is_primary
                                            ? 'border-green-300 bg-green-50 dark:border-green-500 dark:bg-green-950'
                                            : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                                    }`}
                                >
                                    <CardContent className="space-y-5 p-6">
                                        {/* Label dan Utama */}
                                        <div className="flex items-center gap-2">
                                            <h1 className="text-md font-semibold text-black capitalize dark:text-white">{item.address_label}</h1>
                                            {item.is_primary ? (
                                                <Badge className="rounded bg-gray-200 text-xs font-medium text-gray-600 dark:bg-green-500/10 dark:text-green-400">
                                                    Alamat Utama
                                                </Badge>
                                            ) : null}
                                        </div>

                                        {/* Penerima dan Kontak */}
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-semibold text-black dark:text-white">{item.recipient_name}</h3>
                                            <p className="text-muted-foreground text-sm dark:text-zinc-400">{item.phone_number}</p>
                                            <p className="text-muted-foreground text-sm dark:text-zinc-400">{item.email}</p>
                                        </div>

                                        {/* Alamat */}
                                        <div className="text-muted-foreground flex items-start gap-2 text-sm dark:text-zinc-400">
                                            <MapPin className="mt-0.5 h-4 w-4 text-green-600 dark:text-green-400" />
                                            <p>{item.complete_address}</p>
                                        </div>

                                        {/* Tombol */}
                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            <Button
                                                onClick={() => (window.location.href = route('address-list.edit', item.id))}
                                                variant="outline"
                                                className="font-semi w-full cursor-pointer border-zinc-300 py-5 text-black shadow-none hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
                                            >
                                                Ubah Alamat
                                                <Icon icon="ic:baseline-edit" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                className="w-full cursor-pointer bg-red-600 py-5 font-semibold text-white shadow-none hover:bg-red-700"
                                            >
                                                Hapus Alamat
                                                <Icon icon="ic:baseline-delete" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <div className="flex grow items-center px-6 xl:px-10">
                                <div className="mx-auto space-y-2 text-center">
                                    <img src={EmptyImage} alt="Error" className="mx-auto mb-8 w-full max-w-lg lg:mb-12 2xl:mb-16" />
                                    <h1 className="text-[22px] font-bold text-gray-700 dark:text-gray-100">Alamat Anda Tidak Tersedia</h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Silahkan menambahkan alamat anda terlebih dahulu, agar bisa memudahkan <br /> dalam melakukan pembelian.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </CustomerLayout>
        </>
    );
}
