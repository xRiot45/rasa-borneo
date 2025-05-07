import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/admin/layout';
import { Customer } from '@/models/customer';
import { BreadcrumbItem } from '@/types';
import { formatDate } from '@/utils/format-date';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';

interface CustomerDetailPageProps {
    data: Customer;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pengguna',
        href: '#',
    },
    {
        title: 'Customer / Penjual',
        href: '/admin/users-management/customers',
    },
    {
        title: 'Detail Customer',
        href: '#',
    },
];

export default function CustomerDetailPage({ data }: CustomerDetailPageProps) {
    return (
        <>
            <AdminLayout breadcrumbs={breadcrumbs}>
                <Head title="Detail Customer" />

                <main className="my-8 px-4">
                    <Button onClick={() => window.history.back()}>
                        <Icon icon={'material-symbols:arrow-back-rounded'} className="mr-2" />
                        Kembali ke halaman sebelumnya
                    </Button>
                    <Card className="mx-auto mt-6 w-full px-4 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-2xl">Detail Customer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Identitas Pengguna */}
                            <div>
                                <h2 className="mb-2 text-lg font-semibold">Identitas Pengguna</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="font-semibold">Nama Lengkap</Label>
                                        <p>{data?.user?.full_name || '-'}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Email</Label>
                                        <p>{data?.user?.email || '-'}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Nomor Telepon</Label>
                                        <p>{data?.user?.phone_number || '-'}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Tanggal Verifikasi Email</Label>
                                        <p>{data?.user?.email_verified_at ? formatDate(data.user.email_verified_at) : '-'}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Tempat Lahir</Label>
                                        <p>{data?.birthplace || '-'}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Tanggal Lahir</Label>
                                        <p>{data?.birthdate ? format(new Date(data?.birthdate), 'yyyy-MM-dd') : '-'}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Jenis Kelamin</Label>
                                        <p className="capitalize">{data?.gender || '-'}</p>
                                    </div>
                                </div>
                            </div>
                            <Separator />

                            {/* Informasi Timestamp */}
                            <div>
                                <h2 className="mb-2 text-lg font-semibold">Informasi Waktu</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="font-semibold">Dibuat Pada</Label>
                                        <p>{data.created_at ? formatDate(data.created_at) : '-'}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Diperbarui Pada</Label>
                                        <p>{data.updated_at ? formatDate(data.updated_at) : '-'}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Dihapus Pada</Label>
                                        <p>{data.deleted_at ? formatDate(data.deleted_at) : '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </AdminLayout>
        </>
    );
}
