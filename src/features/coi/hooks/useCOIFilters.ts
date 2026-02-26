import { useState, useMemo } from 'react';
import type { COIRecord, COIStatus } from '../../../types';

export const useCOIFilters = (initialData: COIRecord[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<COIStatus | 'All'>('All');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [expiryFilter, setExpiryFilter] = useState('all');

  const filteredData = useMemo(() => {
    return initialData.filter(record => {
      const matchesSearch = 
        record.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.unit.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || record.status === statusFilter;

      const matchesProperty = propertyFilter === 'all' || record.property.toLowerCase().includes(propertyFilter.toLowerCase());

      let matchesExpiry = true;
      if (expiryFilter !== 'all') {
        const daysDiff = (new Date(record.expiryDate).getTime() - Date.now()) / (1000 * 3600 * 24);
        matchesExpiry = daysDiff >= 0 && daysDiff <= parseInt(expiryFilter);
      }

      return matchesSearch && matchesStatus && matchesProperty && matchesExpiry;
    });
  }, [initialData, searchQuery, statusFilter, propertyFilter, expiryFilter]);

  const stats = useMemo(() => {
    return {
      total: initialData.length,
      accepted: initialData.filter(d => d.status === 'Active').length,
      rejected: initialData.filter(d => d.status === 'Rejected').length,
      expiring: initialData.filter(d => d.status === 'Expiring Soon').length,
    };
  }, [initialData]);

  return {
    filteredData,
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    propertyFilter,
    setPropertyFilter,
    expiryFilter,
    setExpiryFilter,
  };
};
