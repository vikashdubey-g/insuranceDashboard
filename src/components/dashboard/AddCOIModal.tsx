import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import type { COIRecord } from '../../types';


interface AddCOIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (record: Omit<COIRecord, 'id' | 'createdAt'>) => void;
}

export const AddCOIModal = ({ isOpen, onClose, onAdd }: AddCOIModalProps) => {
  const [formData, setFormData] = useState({
    property: '',
    tenantName: '',
    tenantEmail: '',
    unit: '',
    coiName: '',
    expiryDate: '',
    status: 'Not Processed' as any,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      reminderStatus: 'Not Sent'
    });
    onClose();
    // Reset form
    setFormData({
      property: '',
      tenantName: '',
      tenantEmail: '',
      unit: '',
      coiName: '',
      expiryDate: '',
      status: 'Not Processed',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New COI">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property *</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Tenant Name *</label>
            <Input 
              required 
              name="tenantName" 
              value={formData.tenantName} 
              onChange={handleChange}
              placeholder="Tenant Name" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tenant Email</label>
            <Input 
              type="email" 
              name="tenantEmail" 
              value={formData.tenantEmail} 
              onChange={handleChange}
              placeholder="example@email.com" 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
            <Input 
              required 
              name="unit" 
              value={formData.unit} 
              onChange={handleChange}
              placeholder="e.g. 101 or Suite A" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">COI Name *</label>
          <Input 
            required 
            name="coiName" 
            value={formData.coiName} 
            onChange={handleChange}
            placeholder="e.g. GlobalMart_Insurance_COI_2025" 
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
           <Select name="status" value={formData.status} onChange={handleChange}>
             <option value="Active">Active</option>
             <option value="Expired">Expired</option>
             <option value="Rejected">Rejected</option>
             <option value="Expiring Soon">Expiring Soon</option>
             <option value="Not Processed">Not Processed</option>
           </Select>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t mt-6">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save COI</Button>
        </div>
      </form>
    </Modal>
  );
};
