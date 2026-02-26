import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Search } from 'lucide-react';

interface AskAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskAIModal = ({ isOpen, onClose }: AskAIModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ask LegalGraph AI">
      <div className="space-y-6">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          I'm LegalGraph AI, your smart insurance assistant. How can I help you regarding certificates of insurance today?
        </p>
        
        <div className="space-y-4">
          <Input 
            icon={<Search className="w-4 h-4" />}
            placeholder="E.g., Which tenants have expiring properties in the next 30 days?" 
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="primary" onClick={onClose} className="w-full">
            Ask Question
          </Button>
        </div>
      </div>
    </Modal>
  );
};
