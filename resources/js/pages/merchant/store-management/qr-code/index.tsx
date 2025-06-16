import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MerchantLayout from '@/layouts/merchant/layout';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Toko',
        href: '#',
    },
    {
        title: 'Qr Code Toko',
        href: '/admin/store-management/qr-code',
    },
];

export default function QrCodePage({ merchantUrl }: { merchantUrl: string }) {
    const qrRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        const printContent = qrRef.current?.innerHTML;
        const printWindow = window.open('', '_blank');
        if (printWindow && printContent) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print QR Code</title>
                        <style>
                            body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                        </style>
                    </head>
                    <body>${printContent}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        } else {
            toast.error('Gagal mencetak QR Code');
        }
    };

    return (
        <>
            <Head title="Kode QR" />
            <MerchantLayout breadcrumbs={breadcrumbs}>
                <Card className="flex min-h-screen flex-col items-center justify-center border-none p-6 shadow-none">
                    <CardContent className="w-full max-w-lg shadow-none">
                        <CardContent className="flex flex-col items-center gap-6">
                            <div ref={qrRef}>
                                <QRCodeSVG value={merchantUrl} width={400} height={400} />
                            </div>
                            <div className="w-full space-y-2">
                                <Button onClick={handlePrint} className="w-full cursor-pointer rounded-md py-6">
                                    <Icon icon="material-symbols:print" className="mr-2" />
                                    Cetak QR Code
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => navigator.clipboard.writeText(merchantUrl)}
                                    className="w-full cursor-pointer rounded-md py-6 hover:bg-gray-200"
                                >
                                    <Icon icon="material-symbols:content-copy" className="mr-2" />
                                    Salin Link
                                </Button>
                            </div>
                        </CardContent>
                    </CardContent>
                </Card>
            </MerchantLayout>
        </>
    );
}
