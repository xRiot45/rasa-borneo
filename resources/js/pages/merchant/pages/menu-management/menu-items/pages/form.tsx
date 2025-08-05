import FileDropzone from '@/components/file-dropzone';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { MenuItemStatusEnum } from '@/enums/menu-item-enum';
import MerchantLayout from '@/layouts/merchant/layout';
import { cn } from '@/lib/utils';
import { MenuCategory } from '@/models/menu-category';
import { MenuItem, MenuItemForm } from '@/models/menu-item';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Menu',
        href: '#',
    },
    {
        title: 'Menu',
        href: '/merchant/menu-management/menu-items',
    },
    {
        title: 'Form menu',
        href: '#',
    },
];

export default function FormPage({ menuItem }: { menuItem: MenuItem }) {
    const isEdit = !!menuItem?.id;

    const { menuCategoriesMerchant } = usePage<{ menuCategoriesMerchant: MenuCategory[] }>().props;
    const { data, setData, post, processing, errors, reset } = useForm<Required<MenuItemForm>>({
        name: isEdit ? menuItem?.name : '',
        price: isEdit ? menuItem?.price : 0,
        image_url: isEdit ? menuItem?.image_url : null,
        menu_category_id: isEdit ? menuItem?.menu_category_id : 0,
        status: isEdit ? menuItem?.status : MenuItemStatusEnum.AVAILABLE,
        short_description: isEdit ? menuItem?.short_description : '',
        is_recommended: isEdit ? Boolean(menuItem?.is_recommended) : false,
    });

    const handleFileChange = (file: File | null) => {
        setData('image_url', file);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const formData = new FormData();
        const appendFormData = (key: string, value: MenuItemForm[keyof MenuItemForm]) => {
            if (key === 'image_url' && value instanceof File) {
                formData.append(key, value);
            } else if (key === 'is_recommended') {
                formData.append(key, value ? '1' : '0');
            } else {
                formData.append(key, String(value));
            }
        };

        if (isEdit && menuItem) {
            Object.entries(data).forEach(([key, value]) => {
                const originalValue = menuItem[key as keyof MenuItem];

                if (key === 'image_url') {
                    if (value instanceof File) {
                        appendFormData(key, value);
                    }
                } else {
                    if (value !== originalValue) {
                        appendFormData(key, value);
                    }
                }
            });

            formData.append('_method', 'PUT');
            router.post(route('merchant.menu-items.update', { id: menuItem?.id }), formData, {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Menu Berhasil Diedit!',
                        action: { label: 'Tutup', onClick: () => toast.dismiss() },
                    });
                    reset();
                },
                onError: (errors) => {
                    Object.keys(errors).forEach((key) => {
                        toast.error('Error', {
                            description: errors[key],
                            action: { label: 'Tutup', onClick: () => toast.dismiss() },
                        });
                    });
                },
            });
        } else {
            Object.entries(data).forEach(([key, value]) => {
                appendFormData(key, value);
            });

            post(route('merchant.menu-items.store'), {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Menu Berhasil Ditambahkan!',
                        action: { label: 'Tutup', onClick: () => toast.dismiss() },
                    });
                    reset();
                },
                onError: (errors) => {
                    Object.keys(errors).forEach((key) => {
                        toast.error('Error', {
                            description: errors[key],
                            action: { label: 'Tutup', onClick: () => toast.dismiss() },
                        });
                    });
                },
            });
        }
    };

    return (
        <>
            <Head title={isEdit ? 'Edit Menu' : 'Tambah Menu'} />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <form className="mb-12 space-y-4 p-4" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        {/* Nama Menu */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">
                                Nama Menu <strong className="text-red-500">*</strong>
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Masukkan nama menu"
                                className={cn('mt-2 rounded-xl px-4 py-6 shadow-none placeholder:text-sm', errors.name && 'border border-red-500')}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* Harga Menu */}
                        <div className="grid gap-2">
                            <Label htmlFor="price">
                                Harga Menu <strong className="text-red-500">*</strong>
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                required
                                value={data.price}
                                onChange={(e) => setData('price', parseInt(e.target.value))}
                                placeholder="Masukkan harga menu"
                                className={cn('mt-2 rounded-xl px-4 py-6 shadow-none placeholder:text-sm', errors.price && 'border border-red-500')}
                            />
                            <InputError message={errors.price} className="mt-2" />
                        </div>

                        {/* Gambar menu */}
                        <div className="grid gap-2">
                            <Label htmlFor="image_url">
                                Gambar Menu <strong className="text-red-500">*</strong>
                            </Label>
                            <FileDropzone
                                onFileChange={handleFileChange}
                                error={errors.image_url}
                                initialImage={data.image_url instanceof File ? undefined : data.image_url}
                            />
                            <InputError message={errors.image_url} className="mt-2" />
                        </div>

                        {/* Kategori Menu */}
                        <div className="grid gap-2">
                            <Label htmlFor="menu_category_id">
                                Kategori Menu <strong className="text-red-500">*</strong>
                            </Label>
                            <Select
                                onValueChange={(value) => setData('menu_category_id', parseInt(value))}
                                value={data.menu_category_id ? String(data.menu_category_id) : ''} // <-- FIXED
                            >
                                <SelectTrigger
                                    className={cn('mt-2 w-full rounded-lg py-6 shadow-none', errors.menu_category_id && 'border border-red-500')}
                                >
                                    <SelectValue placeholder="Pilih Kategori Menu" />
                                </SelectTrigger>
                                <SelectContent>
                                    {menuCategoriesMerchant && menuCategoriesMerchant.length > 0 ? (
                                        menuCategoriesMerchant.map((item: MenuCategory) => (
                                            <SelectItem key={item.id} value={String(item.id)} className="cursor-pointer p-3 capitalize">
                                                {item.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="0" disabled>
                                            Tidak ada kategori
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>

                            <InputError message={errors.menu_category_id} className="mt-2" />
                        </div>

                        {/* Status Menu */}
                        <div className="grid gap-2">
                            <Label htmlFor="status">
                                Status Menu <strong className="text-red-500">*</strong>
                            </Label>
                            <Select onValueChange={(value) => setData('status', value as MenuItemStatusEnum)} value={data.status}>
                                <SelectTrigger className={cn('mt-2 w-full rounded-lg py-6 shadow-none', errors.status && 'border border-red-500')}>
                                    <SelectValue placeholder="Pilih Status Menu" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(MenuItemStatusEnum).map((value) => (
                                        <SelectItem key={value} value={value} className="cursor-pointer p-3 capitalize">
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} className="mt-2" />
                        </div>

                        {/* Short Description */}
                        <div className="grid gap-2">
                            <Label htmlFor="short_description">
                                Deskripsi Singkat Menu <strong className="text-red-500">*</strong>
                            </Label>
                            <Textarea
                                id="short_description"
                                value={data.short_description}
                                onChange={(e) => setData('short_description', e.target.value)}
                                placeholder="Cth : Nasi Goreng Spesial dengan sayur"
                                className={cn('mt-2 min-h-[150px] rounded-xl p-4', errors.short_description && 'border border-red-500')}
                            />
                        </div>

                        {/* Is Recommended */}
                        <div className="flex items-center">
                            <Label htmlFor="is_recommended" className="mr-4">
                                Rekomendasi Menu
                            </Label>
                            <Switch
                                id="is_recommended"
                                checked={data.is_recommended}
                                onCheckedChange={(checked) => setData('is_recommended', checked)}
                                disabled={processing}
                            />
                        </div>

                        {/* Button */}
                        <div className="mt-4 flex justify-end space-x-3">
                            <Link href={route('merchant.menu-items.index')} className="cursor-pointer">
                                <Button variant="destructive">
                                    Batalkan <Icon icon="iconoir:cancel" />
                                </Button>
                            </Link>
                            <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                {isEdit ? 'Edit Menu' : 'Tambah Menu'} <Icon icon={isEdit ? 'material-symbols:edit' : 'heroicons:plus'} />
                            </Button>
                        </div>
                    </div>
                </form>
            </MerchantLayout>
        </>
    );
}
