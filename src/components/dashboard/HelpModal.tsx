import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Help & Support">
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Documentation</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Learn how to use the COI Review Dashboard, manage certificates, and track expiry dates effectively.
          </p>
          <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">Read the docs</a>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Contact Support</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Need direct assistance? Our support team is available 24/7 to help you resolve any issues.
          </p>
          <a href="mailto:support@legalgraph.com" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">Email Support</a>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
