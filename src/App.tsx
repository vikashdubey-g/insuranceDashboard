import  { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { addRecord, updateRecord, deleteRecord, updateStatus } from './store/features/coiSlice';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Header } from './components/layout/Header';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { FiltersBar } from './components/dashboard/FiltersBar';
import { COITable } from './components/dashboard/COITable';
import { AddCOIModal } from './components/dashboard/AddCOIModal';
import { EditCOIModal } from './components/dashboard/EditCOIModal';
import { DeleteCOIModal } from './components/dashboard/DeleteCOIModal';
import { AskAIModal } from './components/dashboard/AskAIModal';
import { HelpModal } from './components/dashboard/HelpModal';
import type { COIRecord, COIStatus } from './types';

function App() {
  const data = useSelector((state: RootState) => state.coi.data);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<COIStatus | 'All'>('All');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [expiryFilter, setExpiryFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAskAIModalOpen, setIsAskAIModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<COIRecord | null>(null);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
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
    dispatch(updateStatus({ id, status: newStatus }));
  };

  const handleAddRecord = (newRecordData: Omit<COIRecord, 'id' | 'createdAt'>) => {
    dispatch(addRecord(newRecordData));
  };

  const handleEditClick = (record: COIRecord) => {
    setEditingRecord(record);
    setIsEditModalOpen(true);
  };

  const handleEditRecord = (updatedRecord: COIRecord) => {
    dispatch(updateRecord(updatedRecord));
    setIsEditModalOpen(false);
    setEditingRecord(null);
  };

  const handleDeleteRecord = (id: string) => {
    setRecordToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (recordToDelete) {
      dispatch(deleteRecord(recordToDelete));
      setSelectedIds((prev) => prev.filter((id) => id !== recordToDelete));
      setRecordToDelete(null);
      setIsDeleteModalOpen(false);
    }
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
      <Header 
        selectedCount={selectedIds.length} 
        onBulkReminderClick={() => alert(`Sending ${selectedIds.length} reminder(s)`)} 
        onAskAIClick={() => setIsAskAIModalOpen(true)}
        onHelpClick={() => setIsHelpModalOpen(true)}
      />
      
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
              onDeleteClick={handleDeleteRecord}
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

      <DeleteCOIModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setRecordToDelete(null);
        }}
        onConfirm={confirmDelete}
        recordName={recordToDelete ? data.find(r => r.id === recordToDelete)?.coiName : undefined}
      />

      <AskAIModal 
        isOpen={isAskAIModalOpen} 
        onClose={() => setIsAskAIModalOpen(false)} 
      />

      <HelpModal 
        isOpen={isHelpModalOpen} 
        onClose={() => setIsHelpModalOpen(false)} 
      />
    </DashboardLayout>
  );
}

export default App;
