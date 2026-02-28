import { Checkbox } from "../../../components/ui/Checkbox";
import { ArrowUpDown } from "lucide-react";
import { Select } from "../../../components/ui/Select";
import type { COIRecord } from "../../../types";
import type { SortDirection } from "../hooks/useSort";
import { chevronLeft, chevronRight, editPencilIcon } from "../../../assets";
import { ActionDropdown } from "./ActionDropdown";

interface COITableProps {
  data: COIRecord[];
  sortKey: keyof COIRecord | null;
  sortDir: SortDirection;
  onRequestSort: (key: keyof COIRecord) => void;
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  onStatusChange: (id: string, newStatus: COIRecord["status"]) => void;
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onEditClick: (record: COIRecord) => void;
  onDeleteClick: (id: string) => void;
}

export const COITable = ({
  data,
  sortKey,
  sortDir,
  onRequestSort,
  selectedIds,
  onSelectAll,
  onSelectRow,
  onStatusChange,
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEditClick,
  onDeleteClick,
}: COITableProps) => {
  const allSelected =
    data.length > 0 && data.every((row) => selectedIds.includes(row.id));

  const SortHeader = ({
    label,
    sortValue,
  }: {
    label: string;
    sortValue: keyof COIRecord;
  }) => {
    const isActive = sortKey === sortValue;
    const isDesc = isActive && sortDir === "desc";
    return (
      <th
        className="px-4 py-3 border border-[#DCDEDE] font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
        onClick={() => onRequestSort(sortValue)}
      >
        <div className="flex items-center justify-between gap-1">
          {label}
          <ArrowUpDown
            className={`h-3 w-3 transition-all duration-200 ${isActive ? "opacity-100 text-blue-600 dark:text-blue-400" : "opacity-0 group-hover:opacity-50"} ${isDesc ? "rotate-180" : ""}`}
          />
        </div>
      </th>
    );
  };

  const handleGoToPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = parseInt(e.currentTarget.value);
      if (!isNaN(val) && val >= 1 && val <= totalPages) {
        onPageChange(val);
      }
      e.currentTarget.value = ""; // Reset input
    }
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-[#F3F4F4] dark:bg-gray-900 text-[#666E6D] dark:text-gray-400 font-medium">
              <tr>
                <th className="px-4 py-3 border border-[#DCDEDE] w-12 text-center">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={onSelectAll}
                  />
                </th>
                <SortHeader label="Property" sortValue="property" />
                <SortHeader label="Tenant Name" sortValue="tenantName" />
                <SortHeader label="Unit" sortValue="unit" />
                <SortHeader label="COI Name" sortValue="coiName" />
                <SortHeader label="Expiry Date" sortValue="expiryDate" />
                <SortHeader label="Status" sortValue="status" />
                <SortHeader
                  label="Reminder Status"
                  sortValue="reminderStatus"
                />
                <th className="px-4 py-3 border text-center border-[#DCDEDE] dark:border-gray-700 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {data.map((row) => {
                const dateContent = new Date(row.expiryDate).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  },
                );

                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-blue-50/30 transition-colors group ${
                      selectedIds.includes(row.id) ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                      <Checkbox
                        checked={selectedIds.includes(row.id)}
                        onCheckedChange={(c) => onSelectRow(row.id, c)}
                      />
                    </td>
                    <td
                      className="px-4 py-3 border border-gray-200 dark:border-gray-700 truncate max-w-[120px]"
                      title={row.property}
                    >
                      {row.property}
                    </td>
                    <td className="px-4 py-3 border border-gray-200 dark:border-gray-700 truncate max-w-[120px]">
                      {row.tenantName}
                    </td>
                    <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                      {row.unit.replace(/^Unit\s+/i, "")}
                    </td>
                    <td
                      className="px-4 py-3 border border-gray-200 dark:border-gray-700 truncate max-w-37.5"
                      title={row.coiName}
                    >
                      {row.coiName}
                    </td>
                    <td className="px-4 py-3 border border-gray-200 dark:border-gray-700 whitespace-nowrap">
                      <div className="flex items-center justify-between gap-2">
                        {dateContent}
                        <button
                          className="text-gray-400 cursor-pointer hover:text-blue-500 transition-opacity"
                          onClick={() => onEditClick(row)}
                        >
                          <img
                            src={editPencilIcon}
                            alt="editPencilIcon"
                            className="w-4 h-4 dark:invert opacity-70"
                          />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                      <Select
                        className={`h-8 py-1 pl-2 pr-8 text-xs font-medium border-0 rounded-full focus:ring-1 focus:ring-blue-500 bg-transparent ${
                          row.status === "Active"
                            ? "text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-300"
                            : row.status === "Expired" ||
                                row.status === "Rejected"
                              ? "text-red-600 bg-red-50 dark:bg-red-900/40 dark:text-red-300"
                              : row.status === "Expiring Soon"
                                ? "text-orange-600 bg-orange-50 dark:bg-orange-900/40 dark:text-orange-300"
                                : "text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                        value={row.status}
                        onChange={(e) =>
                          onStatusChange(row.id, e.target.value as any)
                        }
                      >
                        <option value="Active">Active</option>
                        <option value="Expired">Expired</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Expiring Soon">Expiring Soon</option>
                        <option value="Not Processed">Not Processed</option>
                      </Select>
                    </td>
                    <td className="px-4 py-3 border border-gray-200">
                      <span
                        className={
                          row.reminderStatus === "Sent (30d)"
                            ? "text-green-500"
                            : "text-gray-400"
                        }
                      >
                        {row.reminderStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 border border-gray-200 dark:border-gray-700 text-center">
                      <ActionDropdown
                        onEdit={() => onEditClick(row)}
                        onDelete={() => onDeleteClick(row.id)}
                      />
                    </td>
                  </tr>
                );
              })}
              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-8 text-center text-gray-500 border border-gray-200 dark:border-gray-700"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3 my-4 rounded-xl border border-[#E7E9E9] dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 gap-4 sm:gap-0">
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
          <p className="text-sm font-medium whitespace-nowrap text-[#2C3635] dark:text-gray-300">
            Rows per page
          </p>
          <Select
            className="h-8 py-1 pr-8 w-16 text-xs bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md border-gray-200 dark:border-gray-700"
            value={rowsPerPage.toString()}
            onChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-600 dark:text-gray-400 w-full sm:w-auto justify-center sm:justify-end">
          <div className="flex items-center gap-2">
            <button
              className="p-1 cursor-pointer rounded-md hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <img
                src={chevronRight}
                alt="chevronRight"
                className="dark:invert opacity-70"
              />
            </button>
            <span className="font-medium text-[#898F8F] dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="p-1 cursor-pointer rounded-md hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <img
                src={chevronLeft}
                alt="chevronLeft"
                className="dark:invert opacity-70"
              />
            </button>
          </div>

          <div className="sm:ml-2 sm:pl-4 text-[#2C3635] dark:text-gray-300 flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E7E9E9] dark:border-gray-700 w-full sm:w-auto justify-center sm:justify-start">
            Go to
            <input
              type="text"
              className="w-10 h-7 text-center border dark:border-gray-600 dark:bg-gray-800 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              onKeyDown={handleGoToPage}
              placeholder={currentPage.toString()}
            />
          </div>
        </div>
      </div>
    </>
  );
};
