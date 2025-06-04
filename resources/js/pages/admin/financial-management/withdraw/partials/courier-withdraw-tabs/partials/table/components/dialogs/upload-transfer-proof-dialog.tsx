import FileDropzone from '@/components/file-dropzone';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { UploadTransferProofForm } from '@/models/financial-management/withdraw';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    withdrawId: number;
}

const UploadTransferProofDialog: React.FC<Props> = ({ open, onOpenChange, withdrawId }) => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<UploadTransferProofForm>>({
        transfer_proof: null,
    });

    const handleFileChange = (file: File | null) => {
        setData('transfer_proof', file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        if (data.transfer_proof) {
            formData.append('transfer_proof', data.transfer_proof);
        }

        post(route('admin.withdraw.storeAdmin', { id: withdrawId }), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Success', {
                    description: 'Bukti transfer berhasil diunggah',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
                reset();
                onOpenChange(false);
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
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Upload Bukti Transfer</DialogTitle>
                    <DialogDescription>Unggah bukti transfer untuk menyelesaikan proses penarikan dana.</DialogDescription>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="transfer_proof">Bukti Transfer</Label>
                        <FileDropzone onFileChange={handleFileChange} error={errors.transfer_proof} />
                        <InputError message={errors.transfer_proof} />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Mengirim...' : 'Konfirmasi'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UploadTransferProofDialog;
