import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MerchantLayout from '@/layouts/merchant/layout';
import { cn } from '@/lib/utils';
import { ExpenseReportCategory, ExpenseReportCategoryForm } from '@/models/financial-management/expense-report';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
    expenseReportCategory: ExpenseReportCategory;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Keuangan',
        href: '#',
    },
    {
        title: 'Kategori Laporan Pengeluaran',
        href: '/merchant/financial-management/expense-report-category',
    },
    {
        title: 'Form Kategori Laporan Pengeluaran',
        href: '#',
    },
];

export default function FormPage({ expenseReportCategory }: Props) {
    const isEdit = !!expenseReportCategory?.id;

    const { data, setData, post, put, processing, errors, reset } = useForm<Required<ExpenseReportCategoryForm>>({
        name: isEdit ? expenseReportCategory.name : '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit && expenseReportCategory) {
            put(route('merchant.expense-report-category.update', { id: expenseReportCategory?.id }), {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Kategori Laporan Pengeluaran Berhasil Diedit!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                    reset();
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
            post(route('merchant.expense-report-category.store'), {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Kategori Laporan Pengeluaran Berhasil Ditambahkan!',
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                    reset();
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
            <Head title={isEdit ? 'Edit Kategori Laporan Pengeluaran' : 'Tambah Kategori Laporan Pengeluaran'} />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <form onSubmit={handleSubmit} className="space-y-8 p-4">
                    <div className="grid gap-4">
                        <div className="grid gap-1">
                            <Label htmlFor="name">
                                Nama Kategori Laporan Pengeluaran <strong className="text-red-500">*</strong>
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                tabIndex={2}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Masukkan nama kategori"
                                className={cn('mt-2 rounded-xl px-4 py-6', errors.name && 'border border-red-500')}
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Button */}
                        <div className="mt-4 flex justify-end space-x-3">
                            <Link href={route('merchant.expense-report-category.indexMerchant')} className="cursor-pointer">
                                <Button variant="destructive">
                                    Batalkan <Icon icon="iconoir:cancel" />
                                </Button>
                            </Link>
                            <Button type="submit" tabIndex={4} disabled={processing} className="cursor-pointer">
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                {isEdit ? 'Edit Kategori' : 'Tambah Kategori'}
                                <Icon icon={isEdit ? 'material-symbols:edit' : 'heroicons:plus'} />
                            </Button>
                        </div>
                    </div>
                </form>
            </MerchantLayout>
        </>
    );
}
