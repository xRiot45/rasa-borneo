import { Button } from '@/components/ui/button';
import CustomerLayout from '@/layouts/customer/layout';
import { Icon } from '@iconify/react';
import { Head, Link } from '@inertiajs/react';

export default function AddressListPage() {
    return (
        <>
            <Head title="Daftar Alamat Saya" />
            <CustomerLayout>
                <main className="mt-22">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Daftar Alamat Saya</h2>
                            <p className="text-muted-foreground text-sm">Daftar semua alamat saya yang tersedia</p>
                        </div>

                        <Link href={route('address-list.create')}>
                            <Button className="cursor-pointer">
                                Tambah Alamat
                                <Icon icon="ic:baseline-create" />
                            </Button>
                        </Link>
                    </div>
                </main>
            </CustomerLayout>
        </>
    );
}
