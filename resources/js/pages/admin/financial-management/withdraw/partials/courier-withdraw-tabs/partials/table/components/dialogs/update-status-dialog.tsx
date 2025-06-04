import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Props {
    showDialog: boolean;
    setShowDialog: (value: boolean) => void;
    selectedStatus: string;
    handleConfirmUpdate: () => void;
}

const UpdateStatusDialog: React.FC<Props> = ({ showDialog, setShowDialog, selectedStatus, handleConfirmUpdate }) => {
    return (
        <>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Update Status</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin mengubah status penarikan menjadi{' '}
                            <strong className="text-black uppercase dark:text-white">{selectedStatus}</strong>? Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDialog(false)}>
                            Batal
                        </Button>
                        <Button variant="default" onClick={handleConfirmUpdate}>
                            Konfirmasi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UpdateStatusDialog;
