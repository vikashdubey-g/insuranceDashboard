import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import type { COIRecord } from '../../types';

interface EditCOIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (record: COIRecord) => void;
  initialData: COIRecord | null;
}

export const EditCOIModal = ({ isOpen, onClose, onEdit, initialData }: EditCOIModalProps) => {
  const [formData, setFormData] = useState<COIRecord | null>(null);

  useEffect(() => {
    if (initialData) {
      // Create a local copy of the initial data when the modal opens
      setFormData({ ...initialData });
    } else {
      setFormData(null);
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onEdit(formData);
    }
    onClose();
  };

  if (!formData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit COI">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Property *</label>
          <Input 
            required 
            name="property" 
            value={formData.property} 
            onChange={handleChange}
            placeholder="e.g. Maplewood Shopping Center" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tenant Name *</label>
            <Input 
              required 
              name="tenantName" 
              value={formData.tenantName} 
              onChange={handleChange}
              placeholder="Tenant Name" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tenant Email</label>
            <Input 
              type="email" 
              name="tenantEmail" 
              value={formData.tenantEmail || ''} 
              onChange={handleChange}
              placeholder="example@email.com" 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit *</label>
            <Input 
              required 
              name="unit" 
              value={formData.unit} 
              onChange={handleChange}
              placeholder="e.g. 101 or Suite A" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Date *</label>
            <Input 
              required 
              type="date" 
              name="expiryDate" 
              value={formData.expiryDate} 
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">COI Name *</label>
          <Input 
            required 
            name="coiName" 
            value={formData.coiName} 
            onChange={handleChange}
            placeholder="e.g. GlobalMart_Insurance_COI_2025" 
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
           <Select name="status" value={formData.status} onChange={handleChange}>
             <option value="Active">Active</option>
             <option value="Expired">Expired</option>
             <option value="Rejected">Rejected</option>
             <option value="Expiring Soon">Expiring Soon</option>
             <option value="Not Processed">Not Processed</option>
           </Select>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-gray-400 dark:border-gray-700 mt-6">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};
