import { Button } from '@/components/ui/button';
import { MenuItem } from '@/models/menu-item';
import { Icon } from '@iconify/react';
import CardMenuItem from '../components/card-menu-items';

interface Props {
    data: MenuItem[];
}

const RecommendedMenuSection: React.FC<Props> = ({ data }) => {
    return (
        <section className="mx-auto mt-12 w-full max-w-screen-xl">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold">Menu Direkomendasi</h2>
                    <p className="text-muted-foreground text-sm">Daftar menu yang direkomendasikan</p>
                </div>
                <Button variant="link" className="text-sm font-medium">
                    Lihat Semua Menu
                    <Icon icon="icon-park-outline:right-c" className="ml-1" />
                </Button>
            </div>

            <CardMenuItem menuItems={data} />
        </section>
    );
};

export default RecommendedMenuSection;
