import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Dialog } from './dialog';
import { Button } from './button';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm Action',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="flex items-center gap-3 py-2">
        <div
          className={`p-3 rounded-full shrink-0 ${
            variant === 'danger' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
          }`}
        >
          {variant === 'danger' ? <Trash2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Are you sure you want to proceed? This action cannot be undone.
        </p>
      </div>
    </Dialog>
  );
};
