export type COIStatus = 'Active' | 'Expired' | 'Rejected' | 'Expiring Soon' | 'Not Processed';
export type ReminderStatus = 'Not Sent' | 'Sent (30d)' | 'N/A';

export interface COIRecord {
  id: string;
  property: string;
  tenantName: string;
  tenantEmail?: string;
  unit: string;
  coiName: string;
  expiryDate: string; // YYYY-MM-DD format
  status: COIStatus;
  reminderStatus: ReminderStatus;
  createdAt?: string;
}
