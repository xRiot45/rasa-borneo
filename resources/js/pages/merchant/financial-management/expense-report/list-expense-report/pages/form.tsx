import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import MerchantLayout from '@/layouts/merchant/layout';
import { cn } from '@/lib/utils';
import {
    ExpenseReport,
    ExpenseReportCategory,
    ExpenseReportForm,
    ExpenseReportItem,
    NonEmptyArray,
} from '@/models/financial-management/expense-report';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    expenseReportCategories: ExpenseReportCategory[];
    expenseReport: ExpenseReport;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Keuangan',
        href: '#',
    },
    {
        title: 'Laporan Pengeluaran',
        href: '/merchant/financial-management/expense-report',
    },
    {
        title: 'Form Laporan Pengeluaran',
        href: '#',
    },
];

export default function FormPage({ expenseReportCategories, expenseReport }: Props) {
    console.log(expenseReport);
    const isEdit = !!expenseReport?.id;

    const { data, setData, post, put, processing, errors, reset } = useForm<ExpenseReportForm>({
        report_date: isEdit ? new Date(expenseReport.report_date) : new Date(),
        description: isEdit ? expenseReport.description : '',
        items: isEdit
            ? (expenseReport.expense_report_items.map((item) => ({
                  name: item.name,
                  category_id: item.category_id,
                  description: item.description,
                  amount: item.amount,
              })) as NonEmptyArray<ExpenseReportItem>)
            : ([{ name: '', category_id: 0, description: '', amount: '' }] as NonEmptyArray<ExpenseReportItem>),
    });

    const [inputValue, setInputValue] = useState<string>('');

    const handleItemChange = (index: number, field: keyof ExpenseReportItem, value: string) => {
        const updatedItems = [...data.items];
        if (field === 'name' || field === 'description' || field === 'amount') {
            updatedItems[index][field] = value;
        } else if (field === 'category_id') {
            updatedItems[index][field] = parseInt(value, 10);
        }
        setData('items', updatedItems as NonEmptyArray<ExpenseReportItem>);
    };

    const handleAddItem = () => {
        setData('items', [...data.items, { name: '', category_id: 0, description: '', amount: '' }]);
    };

    const handleRemoveItem = (index: number) => {
        const updatedItems = [...data.items];
        updatedItems.splice(index, 1);
        if (updatedItems.length > 0) {
            setData('items', updatedItems as NonEmptyArray<ExpenseReportItem>);
        }
    };

    const handleInputReportDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        const parsedData = new Date(event.target.value);
        if (!isNaN(parsedData.getTime())) {
            setData('report_date', parsedData);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit && expenseReport) {
            put(route('merchant.expense-report.update', { id: expenseReport?.id }), {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Laporan Pengeluaran Berhasil Diedit!',
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
            post(route('merchant.expense-report.store'), {
                onSuccess: () => {
                    toast.success('Success', {
                        description: 'Laporan Pengeluaran Berhasil Ditambahkan!',
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
            <Head title="Form Laporan Pengeluaran" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <form onSubmit={handleSubmit} className="mt-6 mb-4 px-4">
                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <Label htmlFor="report_date" className="mb-2">
                                Tanggal Laporan <strong className="text-red-500">*</strong>
                            </Label>
                            <Popover>
                                <PopoverTrigger>
                                    <Button type="button" variant="outline" className="mt-2 w-full rounded-md px-4 py-6 shadow-none">
                                        {data.report_date instanceof Date && !isNaN(data.report_date.getTime()) ? (
                                            <span>{data.report_date.toDateString()}</span>
                                        ) : (
                                            <span className="text-sm text-gray-400">Masukkan Tanggal Laporan</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-5 w-5 text-gray-500" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="">
                                    <Input
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputReportDate}
                                        className="mb-2 py-6 text-center"
                                        placeholder="tahun-bulan-tanggal"
                                    />

                                    <Calendar
                                        mode="single"
                                        selected={
                                            data.report_date instanceof Date && !isNaN(data.report_date.getTime()) ? data.report_date : undefined
                                        }
                                        onSelect={(date) => {
                                            setData('report_date', date ?? new Date());
                                            setInputValue(date ? date.toISOString().split('T')[0] : '');
                                        }}
                                        disabled={(date) => date > new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <InputError className="mt-1" message={errors.report_date} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Deskripsi Laporan Pengeluaran</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Deskripsi Laporan Pengeluaran"
                                className="mt-2 min-h-[150px]"
                            />
                        </div>
                    </div>

                    {/* Form for items */}
                    <div className="mt-6">
                        <Label className="text-lg font-semibold">Detail Pengeluaran</Label>

                        {data.items.map((item, index) => (
                            <Card key={index} className="mt-2 mb-4 py-6 shadow-none">
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor={`name_${index}`}>
                                            Nama Pengeluaran <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Input
                                            id={`name_${index}`}
                                            type="text"
                                            required
                                            tabIndex={2}
                                            autoComplete="name"
                                            value={item.name}
                                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                            disabled={processing}
                                            placeholder="Masukkan nama pengeluaran"
                                            className={cn('mt-2 rounded-lg px-4 py-6 shadow-none', errors.name && 'border border-red-500')}
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="category_id">
                                            Kategori Pengeluaran <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Select
                                            value={item?.category_id ? String(item.category_id) : ''}
                                            onValueChange={(e) => handleItemChange(index, 'category_id', e)}
                                        >
                                            <SelectTrigger className="mt-2 w-full rounded-md py-6 shadow-none">
                                                <SelectValue placeholder="Pilih Kategori Pengeluaran" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {expenseReportCategories?.map((item: ExpenseReportCategory) => (
                                                    <SelectItem key={item.id} value={String(item.id)} className="p-4">
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <InputError message={errors.category_id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor={`amount_${index}`}>
                                            Jumlah Pengeluaran <strong className="text-red-500">*</strong>
                                        </Label>
                                        <Input
                                            id={`amount_${index}`}
                                            type="number"
                                            value={item.amount}
                                            onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                                            placeholder="Jumlah Pengeluaran"
                                            className={cn('mt-2 rounded-lg px-4 py-6 shadow-none', errors.amount && 'border border-red-500')}
                                        />
                                        <InputError message={errors.amount} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor={`description_${index}`}>Deskripsi</Label>
                                        <Textarea
                                            id={`description_${index}`}
                                            value={item.description}
                                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                            placeholder="Deskripsi Pengeluaran"
                                            className="mt-2 min-h-[150px]"
                                        />
                                    </div>

                                    <div className="text-right">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleRemoveItem(index)}
                                            disabled={data.items.length === 1}
                                        >
                                            Hapus Item <Icon icon="iconoir:cancel" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="mb-6 flex items-center justify-end gap-2">
                        <Button type="button" onClick={handleAddItem} className="cursor-pointer bg-blue-500 hover:bg-blue-600">
                            Tambah Item
                            <Icon icon={'heroicons:plus'} />
                        </Button>
                        <Link href={route('merchant.expense-report.indexMerchant')}>
                            <Button variant="destructive" className="cursor-pointer">
                                Batalkan
                                <Icon icon="iconoir:cancel" />
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="cursor-pointer">
                            {isEdit ? 'Edit Laporan Pengeluaran' : 'Tambah Laporan Pengeluaran'}
                            <Icon icon={isEdit ? 'heroicons:check' : 'heroicons:plus'} />
                        </Button>
                    </div>
                </form>
            </MerchantLayout>
        </>
    );
}
