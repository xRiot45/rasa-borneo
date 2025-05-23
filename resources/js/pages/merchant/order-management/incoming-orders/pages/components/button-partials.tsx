import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

interface Props {
    handlePrint: () => void;
}

const ButtonPartials: React.FC<Props> = ({ handlePrint }) => {
    return (
        <div className="mb-4 flex flex-col items-center justify-between gap-2 md:flex-row">
            <Button className="w-full cursor-pointer md:w-fit" variant="default" onClick={() => window.history.back()}>
                <Icon icon="mdi:arrow-left" className="mr-2 h-4 w-4" />
                Kembali ke halaman sebelumnya
            </Button>

            <Button className="w-full cursor-pointer bg-green-600 hover:bg-green-700 md:w-fit" variant="default" onClick={() => handlePrint()}>
                <Icon icon="mdi:printer" className="mr-2 h-4 w-4" />
                Print Invoice
            </Button>
        </div>
    );
};

export default ButtonPartials;
