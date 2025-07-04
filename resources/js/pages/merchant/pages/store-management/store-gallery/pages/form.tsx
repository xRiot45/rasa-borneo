import FileDropzone from '@/components/file-dropzone';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import MerchantLayout from '@/layouts/merchant/layout';
import { StoreGallery, StoreGalleryForm } from '@/models/store-management/store-gallery';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Toko',
        href: '#',
    },
    {
        title: 'Galeri Toko',
        href: '/admin/store-management/store-gallery',
    },
    {
        title: 'Form Galeri Toko',
        href: '#',
    },
];

export default function FormPage({ storeGallery }: { storeGallery: StoreGallery }) {
    const isEdit = !!storeGallery?.id;
    const { data, setData, post, processing, errors } = useForm<Required<StoreGalleryForm>>({
        image_url: isEdit ? storeGallery.image_url : null,
    });

    const handleFileChange = (file: File | null) => {
        setData('image_url', file);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (data.image_url instanceof File) {
            formData.append('image_url', data.image_url);
        }

        if (isEdit) {
            formData.append('_method', 'put');
            router.post(route('merchant.store-gallery.update', storeGallery.id), formData, {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Galeri Toko Berhasil Diubah!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                },
                onError: (errors) => {
                    Object.keys(errors).forEach((key) => {
                        toast.error('Error', {
                            description: errors[key],
                            action: {
                                label: 'Tutup',
                                onClick: () => toast.dismiss(),
                            },
                        });
                    });
                },
            });
        } else {
            post(route('merchant.store-gallery.store'), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Galeri Toko Berhasil Ditambahkan!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                },
                onError: (errors) => {
                    Object.keys(errors).forEach((key) => {
                        toast.error('Error', {
                            description: errors[key],
                            action: {
                                label: 'Tutup',
                                onClick: () => toast.dismiss(),
                            },
                        });
                    });
                },
            });
        }
    };

    return (
        <>
            <Head title={isEdit ? 'Edit Galeri Toko' : 'Tambah Galeri Toko'} />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <form className="mb-12 space-y-4 p-4" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="image_url">Galeri Toko</Label>
                            <FileDropzone
                                onFileChange={handleFileChange}
                                error={errors.image_url}
                                initialImage={data.image_url instanceof File ? undefined : data.image_url}
                                description="Drag & drop galeri toko anda di sini, atau klik untuk memilih"
                            />
                        </div>

                        {/* Button */}
                        <div className="mt-4 flex justify-end space-x-3">
                            <Link href={route('merchant.store-gallery.indexMerchant')} className="cursor-pointer">
                                <Button variant="destructive">
                                    Batalkan
                                    <Icon icon="iconoir:cancel" />
                                </Button>
                            </Link>
                            <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                {isEdit ? 'Ubah Galeri Toko' : 'Tambah Galeri Toko'}
                                <Icon icon={isEdit ? 'heroicons:check' : 'heroicons:plus'} />
                            </Button>
                        </div>
                    </div>
                </form>
            </MerchantLayout>
        </>
    );
}
