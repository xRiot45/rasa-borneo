import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/layout';
import { Courier } from '@/models/courier';
import { BreadcrumbItem } from '@/types';
import { formatDate } from '@/utils/format-date';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';

interface Props {
    data: Courier;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pengguna',
        href: '#',
    },
    {
        title: 'Courier / Kurir',
        href: '/admin/users-management/couriers',
    },
    {
        title: 'Detail Kurir',
        href: '#',
    },
];

export default function CourierDetailPage({ data }: Props) {
    return (
        <>
            <Head title="Detail Kurir" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                <main className="my-8 px-4">
                    <Button onClick={() => window.history.back()}>
                        <Icon icon={'material-symbols:arrow-back-rounded'} className="mr-2" />
                        Kembali ke halaman sebelumnya
                    </Button>

                    {/* Akun Kurir */}
                    <Card className="mx-auto mt-6 w-full rounded-xl p-6 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-xl">Akun Kurir</CardTitle>
                            <CardDescription className="text-muted-foreground mt-0">Informasi akun kurir</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-1">
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
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Pribadi Kurir */}
                    <Card className="mx-auto mt-6 w-full rounded-xl p-6 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-xl">Data Pribadi Kurir</CardTitle>
                            <CardDescription className="text-muted-foreground mt-0">Informasi data pribadi kurir</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-1">
                                <div>
                                    <Label className="font-semibold">Nomor Induk Kependudukan (NIK)</Label>
                                    <p>{data.national_id || '-'}</p>
                                </div>
                                <div>
                                    <Label className="font-semibold">Foto Profil</Label>
                                    <img src={data?.profile_image} alt="Foto Profil" className="w-full max-w-xs rounded-md" />
                                </div>
                                <div>
                                    <Label className="font-semibold">Foto KTP</Label>
                                    <img src={data?.id_card_photo} alt="Foto KTP" className="w-full max-w-xs rounded-md" />
                                </div>
                                <div>
                                    <Label className="font-semibold">Tempat Lahir</Label>
                                    <p>{data.birthplace || '-'}</p>
                                </div>
                                <div>
                                    <Label className="font-semibold">Tanggal Lahir</Label>
                                    <p>{data.birthdate ? new Date(data.birthdate).toLocaleDateString() : '-'}</p>
                                </div>
                                <div>
                                    <Label className="font-semibold">Jenis Kelamin</Label>
                                    <p>{data.gender || '-'}</p>
                                </div>
                                <div>
                                    <Label className="font-semibold">Usia</Label>
                                    <p>{data.age || '-'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Kendaraan dan Dokumen */}
                    <Card className="mx-auto mt-6 w-full rounded-xl p-6 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-xl">Informasi Kendaraan</CardTitle>
                            <CardDescription className="text-muted-foreground mt-0">Detail kendaraan dan dokumen pendukung</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-1">
                                <div>
                                    <Label className="font-semibold">Jenis Kendaraan</Label>
                                    <p>{data.vehicle_type || '-'}</p>
                                </div>
                                <div>
                                    <Label className="font-semibold">Plat Kendaraan</Label>
                                    <p>{data.license_plate || '-'}</p>
                                </div>
                                <div>
                                    <Label className="font-semibold">Foto SIM</Label>
                                    <img src={data?.driving_license_photo} alt="Foto SIM" className="w-full max-w-xs rounded-md" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Metadata */}
                    <Card className="mx-auto mt-6 w-full rounded-xl p-6 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-xl">Data Sistem</CardTitle>
                            <CardDescription className="text-muted-foreground mt-0">Data teknis pembuatan akun</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-1">
                                <div>
                                    <Label className="font-semibold">Dibuat Pada</Label>
                                    <p>{formatDate(data.created_at as string) || '-'}</p>
                                </div>
                                <div>
                                    <Label className="font-semibold">Diperbarui Terakhir</Label>
                                    <p>{formatDate(data.updated_at as string) || '-'}</p>
                                </div>
                                {data.deleted_at && (
                                    <div>
                                        <Label className="font-semibold">Dihapus Pada</Label>
                                        <p>{formatDate(data.deleted_at)}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </AdminLayout>
        </>
    );
}
