import React from 'react';
import { cn } from '../../lib/utils';
import type { COIStatus } from '../../types';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'neutral';
  status?: COIStatus | string; // Helper to map COIStatus automatically
}

export const Badge = ({ className, variant = 'default', status, children, ...props }: BadgeProps) => {
  let mappedVariant = variant;
  
  if (status) {
    switch (status) {
      case 'Active':
      case 'Accepted':
        mappedVariant = 'success';
        break;
      case 'Expired':
      case 'Rejected':
        mappedVariant = 'danger';
        break;
      case 'Expiring Soon':
        mappedVariant = 'warning';
        break;
      case 'Not Processed':
      case 'Not Sent':
      case 'N/A':
      default:
        mappedVariant = 'neutral';
        break;
      case 'Sent (30d)':
        mappedVariant = 'success';
        break;
    }
  }

  const variants = {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-orange-50 text-orange-700 border-orange-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-gray-100 text-gray-500 border-gray-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variants[mappedVariant],
        className
      )}
      {...props}
    >
      {children || status}
    </span>
  );
};
