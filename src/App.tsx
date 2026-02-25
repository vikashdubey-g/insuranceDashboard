import  { useState, useMemo } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Header } from './components/layout/Header';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { FiltersBar } from './components/dashboard/FiltersBar';
import { COITable } from './components/dashboard/COITable';
import { AddCOIModal } from './components/dashboard/AddCOIModal';
import { EditCOIModal } from './components/dashboard/EditCOIModal';
import type { COIRecord, COIStatus } from './types';
import { mockCOIData } from './data/mockData';

function App() {
  const [data, setData] = useState<COIRecord[]>(mockCOIData);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<COIStatus | 'All'>('All');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [expiryFilter, setExpiryFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<COIRecord | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Derived state for summary cards
  const stats = useMemo(() => {
    return {
      total: data.length, // Let's pretend 512 total in a real app, but use data.length here
      accepted: data.filter(d => d.status === 'Active').length,
      rejected: data.filter(d => d.status === 'Rejected').length,
      expiring: data.filter(d => d.status === 'Expiring Soon').length,
    };
  }, [data]);

  // Filtering logic
  const filteredData = useMemo(() => {
    return data.filter(record => {
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
  }, [data, searchQuery, statusFilter, propertyFilter, expiryFilter]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  // Table selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredData.map(d => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: COIRecord['status']) => {
    setData(prev => prev.map(record => 
      record.id === id ? { ...record, status: newStatus } : record
    ));
  };

  const handleAddRecord = (newRecordData: Omit<COIRecord, 'id' | 'createdAt'>) => {
    const newRecord: COIRecord = {
      ...newRecordData,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
    };
    setData(prev => [newRecord, ...prev]);
  };

  const handleEditClick = (record: COIRecord) => {
    setEditingRecord(record);
    setIsEditModalOpen(true);
  };

  const handleEditRecord = (updatedRecord: COIRecord) => {
    setData(prev => prev.map(record => 
      record.id === updatedRecord.id ? updatedRecord : record
    ));
    setIsEditModalOpen(false);
    setEditingRecord(null);
  };

  const handleFilterChange = (filter: COIStatus | 'All') => {
    setStatusFilter(filter);
    setCurrentPage(1); // Reset page on filter
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset page on search
  };

  return (
    <DashboardLayout>
      <Header />
      
      <div className="flex-1 overflow-auto p-4 md:p-8 bg-gray-50/20 dark:bg-gray-900">
        <div className="w-full space-y-6">
          <SummaryCards 
            total={stats.total} 
            accepted={stats.accepted} 
            rejected={stats.rejected} 
            expiring={stats.expiring}
          />
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-[#DCDEDE] dark:border-gray-700 p-4">
            <FiltersBar 
              onSearchChange={handleSearchChange}
              onStatusFilterChange={handleFilterChange}
              onPropertyFilterChange={(prop) => {
                setPropertyFilter(prop);
                setCurrentPage(1);
              }}
              onExpiryFilterChange={(days) => {
                setExpiryFilter(days);
                setCurrentPage(1);
              }}
              onAddClick={() => setIsAddModalOpen(true)}
            />
            
            <COITable 
              data={paginatedData}
              selectedIds={selectedIds}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              onStatusChange={handleStatusChange}
              currentPage={currentPage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
              onRowsPerPageChange={(rows) => {
                setRowsPerPage(rows);
                setCurrentPage(1);
              }}
              onEditClick={handleEditClick}
            />
          </div>
        </div>
      </div>

      <AddCOIModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddRecord}
      />

      <EditCOIModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRecord(null);
        }}
        onEdit={handleEditRecord}
        initialData={editingRecord}
      />
    </DashboardLayout>
  );
}

export default App;
