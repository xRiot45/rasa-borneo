import { Button } from '@/components/ui/button';
import { FlashMessage } from '@/types';
import { Icon } from '@iconify/react';
import { router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ButtonPartials() {
    const { flash } = usePage().props as unknown as { flash: FlashMessage };

    useEffect(() => {
        if (flash?.message) {
            toast.success('Success', {
                description: flash.message,
                action: {
                    label: 'Tutup',
                    onClick: () => toast.dismiss(),
                },
            });
        }
    }, [flash]);

    const handleGenerateTodayReport = () => {
        router.post(
            route('merchant.revenue-report.generateTodayReport'),
            {},
            {
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
            },
        );
    };

    return (
        <div className="flex gap-2">
            <Button onClick={() => window.location.reload()} className="cursor-pointer">
                <span>Refresh Halaman</span>
                <Icon icon={'material-symbols:refresh'} className="text-background" />
            </Button>
            <Button onClick={handleGenerateTodayReport} className="hover: cursor-pointer bg-blue-600 hover:bg-blue-700">
                <span>Buat Laporan Harian</span>
                <Icon icon={'streamline:medical-files-report-history-remix'} className="text-background" />
            </Button>
            <a href={route('merchant.revenue-report.exportAll')}>
                <Button className="cursor-pointer bg-green-600 hover:bg-green-700">
                    <span>Export Ke CSV</span>
                    <Icon icon={'teenyicons:csv-solid'} className="text-background" />
                </Button>
            </a>
        </div>
    );
}
