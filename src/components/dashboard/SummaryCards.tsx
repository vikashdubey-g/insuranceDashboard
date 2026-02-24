import React from 'react';
import { FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface SummaryCardsProps {
  total: number;
  accepted: number;
  rejected: number;
  expiring: number;
}

export const SummaryCards = ({ total, accepted, rejected, expiring }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      {/* Total COI Processed */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-6 flex flex-col justify-between h-32">
        <h3 className="text-sm font-medium text-gray-700">Total COI Processed</h3>
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-blue-500" />
          <span className="text-3xl font-bold text-gray-900">{total}</span>
        </div>
      </div>

      {/* Accepted */}
      <div className="rounded-xl border border-green-100 bg-green-50/50 p-6 flex flex-col justify-between h-32">
        <h3 className="text-sm font-medium text-gray-700">Accepted</h3>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
          <span className="text-3xl font-bold text-gray-900">{accepted}</span>
        </div>
      </div>

      {/* Rejected */}
      <div className="rounded-xl border border-red-100 bg-red-50/50 p-6 flex flex-col justify-between h-32">
        <h3 className="text-sm font-medium text-gray-700">Rejected</h3>
        <div className="flex items-center gap-3">
          <XCircle className="h-6 w-6 text-red-400" />
          <span className="text-3xl font-bold text-gray-900">{rejected}</span>
        </div>
      </div>

      {/* Expiring in 30 days */}
      <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-6 flex flex-col justify-between h-32">
        <h3 className="text-sm font-medium text-gray-700">Expiring in 30 days</h3>
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6 text-orange-400" />
          <span className="text-3xl font-bold text-gray-900">{expiring}</span>
        </div>
      </div>
    </div>
  );
};
