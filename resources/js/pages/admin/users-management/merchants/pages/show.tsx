import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/layouts/admin/layout';
import { Merchant } from '@/models/merchant';
import { BreadcrumbItem } from '@/types';
import { formatDate } from '@/utils/format-date';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';

interface MerchantDetailPageProps {
    data: Merchant;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Pengguna',
        href: '#',
    },
    {
        title: 'Merchant / Penjual',
        href: '/admin/users-management/merchants',
    },
    {
        title: 'Detail Merchant',
        href: '#',
    },
];

export default function MerchantDetailPage({ data }: MerchantDetailPageProps) {
    return (
        <>
            <AdminLayout breadcrumbs={breadcrumbs}>
                <Head title="Detail Merchant" />

                <main className="my-10 px-4">
                    <Button onClick={() => window.history.back()}>
                        <Icon icon={'material-symbols:arrow-back-rounded'} className="mr-2" />
                        Kembali ke halaman sebelumnya
                    </Button>
                    <Card className="mx-auto mt-6 w-full px-4 shadow-none">
                        <CardHeader>
                            <CardTitle className="text-2xl">Detail Merchant</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Identitas Pengguna */}
                            <div>
                                <h2 className="mb-2 text-lg font-semibold">Identitas Pengguna</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="font-semibold">Nama Lengkap</Label>
                                        <p>{data.user.full_name}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Email</Label>
                                        <p>{data.user.email}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Nomor Telepon</Label>
                                        <p>{data.user.phone_number}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Tanggal Verifikasi Email</Label>
                                        <p>{data?.user?.email_verified_at ? formatDate(data.user.email_verified_at) : '-'}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Label className="font-semibold">Status Verifikasi : </Label>
                                        <Badge className={data.is_verified ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'}>
                                            {data.is_verified ? 'Terverifikasi' : 'Belum Verifikasi'}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Informasi Bisnis */}
                            <div>
                                <h2 className="mb-2 text-lg font-semibold">Informasi Bisnis</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="font-semibold">Nama Usaha</Label>
                                        <p>{data.business_name}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Email Usaha</Label>
                                        <p>{data.business_email}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Nomor Telepon Usaha</Label>
                                        <p>{data.business_phone}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Alamat Usaha</Label>
                                        <p>{data.business_address}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Kode Pos</Label>
                                        <p>{data.postal_code}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Kategori Usaha : </Label>
                                        <Badge>{data.business_category?.name}</Badge>
                                    </div>
                                    <div className="col-span-2">
                                        <Label className="font-semibold">Deskripsi Usaha</Label>
                                        <p>{data.business_description}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Informasi Rekening Bank */}
                            <div>
                                <h2 className="mb-2 text-lg font-semibold">Informasi Rekening Bank</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="font-semibold">Bank</Label>
                                        <p>{data.bank_code}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Nomor Rekening</Label>
                                        <p>{data.bank_account_number}</p>
                                    </div>
                                    <div>
                                        <Label className="font-semibold">Nama Pemilik Rekening</Label>
                                        <p>{data.bank_account_name}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Informasi Perpajakan */}
                            <div>
                                <h2 className="mb-2 text-lg font-semibold">Informasi Perpajakan</h2>
                                <div>
                                    <Label className="font-semibold">NPWP</Label>
                                    <p>{data.tax_identification_number !== '0' ? data.tax_identification_number : '-'}</p>
                                </div>
                            </div>

                            <Separator />

                            {/* Foto KTP */}
                            <div>
                                <Label className="mb-4 text-lg font-semibold">Foto KTP</Label>
                                {`${data.id_card_photo}` ? (
                                    <img src={`${data.id_card_photo}`} alt="Foto KTP" width={400} height={240} className="mt-2 rounded border" />
                                ) : (
                                    <p>Tidak ada foto KTP.</p>
                                )}
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
