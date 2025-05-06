import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import React from 'react';

interface ConfirmDialogProps {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: (e: React.FormEvent) => void;
    children: React.ReactNode;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, description, confirmText, cancelText = 'Batal', onConfirm, children }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={(e) => onConfirm?.(e)} className="bg-primary cursor-pointer text-white transition-all">
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmDialog;
