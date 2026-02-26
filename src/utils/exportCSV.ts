import type { COIRecord } from '../types';

export const exportToCSV = (data: COIRecord[], filename = 'coi_records.csv') => {
  if (!data || data.length === 0) {
    alert('No data available to export.');
    return;
  }

  // Define headers that map directly to COIRecord properties
  const headers = [
    'coiName',
    'tenantName',
    'property',
    'unit',
    'status',
    'expiryDate',
    'reminderStatus',
    'createdAt',
  ];

  // Helper to escape fields that might contain commas or double quotes
  const escapeField = (value: any) => {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    
    return stringValue;
  };

  const csvRows = [];

  // Add the header row
  csvRows.push(headers.join(','));

  // Add data rows
  data.forEach((row) => {
    const values = headers.map((header) => {
      // @ts-ignore
      const val = row[header];
      // Format date fields specifically if you want, e.g., expiryDate
      if (header === 'expiryDate' || header === 'createdAt') {
        return escapeField(new Date(val).toLocaleDateString());
      }
      return escapeField(val);
    });

    csvRows.push(values.join(','));
  });

  // Combine rows with safe line breaks
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link and trigger
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  
  link.click();
  document.body.removeChild(link);
};
