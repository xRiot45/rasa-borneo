import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CustomerAddress } from '@/models/customer-address';
import { router } from '@inertiajs/react';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
    open: boolean;
    onOpenChange: (value: boolean) => void;
    addresses: CustomerAddress[];
}

const CustomerAddressDialog: React.FC<Props> = ({ open, onOpenChange, addresses }) => {
    const setAddressToPrimary = (id: number) => {
        router.put(
            route('address-list.setPrimary', id),
            {},
            {
                onSuccess: () => {
                    onOpenChange(false);
                    toast.success('Success', {
                        description: 'Alamat Berhasil Diubah',
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
            },
        );
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Pilih Alamat Pengiriman</DialogTitle>
                        <DialogDescription>Klik salah satu untuk menjadikannya alamat utama.</DialogDescription>
                    </DialogHeader>

                    <div className="max-h-[400px] space-y-4 overflow-auto">
                        {addresses.map((item, index) => (
                            <Card
                                key={index}
                                onClick={() => setAddressToPrimary(item.id)}
                                className={`relative cursor-pointer rounded-2xl border shadow-none transition-all duration-300 ${
                                    item.is_primary
                                        ? 'border-green-300 bg-green-50 dark:border-green-500 dark:bg-green-950'
                                        : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                                }`}
                            >
                                <CardContent className="space-y-5 p-6">
                                    {/* Label dan Utama */}
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-md font-semibold text-black capitalize dark:text-white">{item.address_label}</h1>
                                        {item.is_primary ? (
                                            <Badge className="rounded bg-gray-200 text-xs font-medium text-gray-600 dark:bg-green-500/10 dark:text-green-400">
                                                Alamat Utama
                                            </Badge>
                                        ) : null}
                                    </div>

                                    {/* Penerima dan Kontak */}
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold text-black dark:text-white">{item.recipient_name}</h3>
                                        <p className="text-muted-foreground text-sm dark:text-zinc-400">{item.phone_number}</p>
                                        <p className="text-muted-foreground text-sm dark:text-zinc-400">{item.email}</p>
                                    </div>

                                    {/* Alamat */}
                                    <div className="text-muted-foreground flex items-start gap-2 text-sm dark:text-zinc-400">
                                        <MapPin className="mt-0.5 h-4 w-4 text-green-600 dark:text-green-400" />
                                        <p>{item.complete_address}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Button className="cursor-pointer py-6" onClick={() => router.visit(route('address-list.create'))}>
                        Tambah Alamat
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CustomerAddressDialog;
