import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface SendReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCount: number;
}

export const SendReminderModal = ({ isOpen, onClose, onConfirm, selectedCount }: SendReminderModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send Reminder">
      <div className="space-y-6">
        <p className="text-gray-600 dark:text-gray-300">
          Are you sure you want to send reminders to <span className="font-semibold text-gray-900 dark:text-white">{selectedCount}</span> selected tenant{selectedCount > 1 ? 's' : ''}?
        </p>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Send Reminders
          </Button>
        </div>
      </div>
    </Modal>
  );
};
