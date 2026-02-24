import type { COIRecord } from '../types';

export const mockCOIData: COIRecord[] = Array.from({ length: 52 }, (_, i) => {
  const statuses: COIRecord['status'][] = ['Active', 'Expired', 'Rejected', 'Expiring Soon', 'Not Processed'];
  const properties = [
    'Maplewood Shopping Center', 'Oak Tree Tower', 'Meadowbrook Plaza', 
    'Pine Hill Shopping Center', 'Huron Heights', 'Riverside Retail',
    'Cedar Grove', 'Windy Ridge', 'Sunset Valley Mall'
  ];
  const tenants = [
    'Johnson & Sons', 'Smith Enterprises', 'Global Solutions', 'Patel Industries',
    'Green Thumb Landscaping', 'Oceanfront Realty', 'Apex Consulting', 'Stark Industries',
    'Wayne Enterprises', 'Daily Bugle', 'Oscorp'
  ];

  const year = 2024 + Math.floor(Math.random() * 5);
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');

  return {
    id: String(i + 1),
    property: properties[i % properties.length],
    tenantName: tenants[i % tenants.length],
    tenantEmail: `tenant${i}@example.com`,
    unit: `Unit ${100 + i}`,
    coiName: `${tenants[i % tenants.length].split(' ')[0]}_COI_${year}`,
    expiryDate: `${year}-${month}-${day}`,
    status: statuses[i % statuses.length],
    reminderStatus: i % 3 === 0 ? 'Sent (30d)' : (i % 2 === 0 ? 'Not Sent' : 'N/A'),
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
  };
});

