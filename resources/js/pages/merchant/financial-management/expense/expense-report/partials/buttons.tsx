import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

export default function ButtonPartials() {
    return (
        <div className="flex gap-2">
            <Button onClick={() => window.location.reload()} className="cursor-pointer">
                <span>Refresh Halaman</span>
                <Icon icon={'material-symbols:refresh'} className="text-background" />
            </Button>
            <a href={route('merchant.expense-report.exportAll')}>
                <Button className="cursor-pointer bg-green-600 hover:bg-green-700">
                    <span>Export Ke CSV</span>
                    <Icon icon={'teenyicons:csv-solid'} className="text-background" />
                </Button>
            </a>
        </div>
    );
}
