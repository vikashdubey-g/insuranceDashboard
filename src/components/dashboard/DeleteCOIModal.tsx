import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface DeleteCOIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  recordName?: string;
}

export const DeleteCOIModal = ({ isOpen, onClose, onConfirm, recordName }: DeleteCOIModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Record">
      <div className="space-y-6">
        <p className="text-gray-600 dark:text-gray-300">
          Are you sure you want to delete {recordName ? <span className="font-semibold text-gray-900 dark:text-white">"{recordName}"</span> : "this record"}? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="error" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
