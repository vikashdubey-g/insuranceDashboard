import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { addRecord, updateRecord, deleteRecord, updateStatus } from './features/coi/store/coiSlice';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Header } from './components/layout/Header';
import { SummaryCards } from './features/coi/components/SummaryCards';
import { FiltersBar } from './features/coi/components/FiltersBar';
import { COITable } from './features/coi/components/COITable';
import { AddCOIModal } from './features/coi/components/AddCOIModal';
import { EditCOIModal } from './features/coi/components/EditCOIModal';
import { DeleteCOIModal } from './features/coi/components/DeleteCOIModal';
import { AskAIModal } from './features/coi/components/AskAIModal';
import { HelpModal } from './features/coi/components/HelpModal';
import { SendReminderModal } from './features/coi/components/SendReminderModal';
import type { COIRecord, COIStatus } from './types';
import { useCOIFilters } from './features/coi/hooks/useCOIFilters';
import { usePagination } from './features/coi/hooks/usePagination';
import { useSort } from './features/coi/hooks/useSort';
import { exportToCSV } from './utils/exportCSV';

function App() {
  const data = useSelector((state: RootState) => state.coi.data);
  const dispatch = useDispatch();

  const {
    filteredData,
    stats,
    setSearchQuery,
    setStatusFilter,
    setPropertyFilter,
    expiryFilter,
    setExpiryFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useCOIFilters(data);

  const { sortKey, sortDir, requestSort, sortedData } = useSort(filteredData, 'expiryDate', 'asc');

  const {
    currentPage,
    rowsPerPage,
    totalPages,
    paginatedData,
    goToPage,
    changeRowsPerPage,
  } = usePagination(sortedData, 10);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isAskAIModalOpen, setIsAskAIModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<COIRecord | null>(null);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

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
    goToPage(1); // Reset page on filter
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    goToPage(1); // Reset page on search
  };

  return (
    <DashboardLayout>
      <Header 
        selectedCount={selectedIds.length} 
        onBulkReminderClick={() => setIsReminderModalOpen(true)} 
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
                goToPage(1);
              }}
              expiryFilter={expiryFilter}
              onExpiryFilterChange={(days) => {
                setExpiryFilter(days);
                goToPage(1);
              }}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={(date) => {
                setStartDate(date);
                goToPage(1);
              }}
              onEndDateChange={(date) => {
                setEndDate(date);
                goToPage(1);
              }}
              onAddClick={() => setIsAddModalOpen(true)}
              onExportClick={() => exportToCSV(filteredData)}
            />
            
            <COITable  
              data={paginatedData}
              sortKey={sortKey}
              sortDir={sortDir}
              onRequestSort={requestSort}
              selectedIds={selectedIds}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              onStatusChange={handleStatusChange}
              currentPage={currentPage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              onPageChange={goToPage}
              onRowsPerPageChange={changeRowsPerPage}
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
        recordName={recordToDelete ? data.find((r: COIRecord) => r.id === recordToDelete)?.coiName : undefined}
      />

      <AskAIModal 
        isOpen={isAskAIModalOpen} 
        onClose={() => setIsAskAIModalOpen(false)} 
      />

      <HelpModal 
        isOpen={isHelpModalOpen} 
        onClose={() => setIsHelpModalOpen(false)} 
      />

      <SendReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        onConfirm={() => {
          setIsReminderModalOpen(false);
          // Actual bulk reminder logic would go here
          setSelectedIds([]);
        }}
        selectedCount={selectedIds.length}
      />
    </DashboardLayout>
  );
}

export default App;
