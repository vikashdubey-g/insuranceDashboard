import { Checkbox } from "../ui/Checkbox";
import { MoreVertical, Edit2, ArrowUpDown } from "lucide-react";
import { Select } from "../ui/Select";
import type { COIRecord } from "../../types";

interface COITableProps {
  data: COIRecord[];
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  onStatusChange: (id: string, newStatus: COIRecord["status"]) => void;
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export const COITable = ({
  data,
  selectedIds,
  onSelectAll,
  onSelectRow,
  onStatusChange,
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: COITableProps) => {
  const allSelected = data.length > 0 && selectedIds.length === data.length;

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
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-[#F3F4F4] text-[#666E6D] font-medium">
            <tr>
              <th className="px-4 py-3 border-b border-[#DCDEDE] w-12 text-center">
                <Checkbox checked={allSelected} onCheckedChange={onSelectAll} />
              </th>
              <th className="px-4 py-3 border-b border-[#DCDEDE] font-medium">Property</th>
              <th className="px-4 py-3 border-b border-[#DCDEDE] font-medium">
                Tenant Name
              </th>
              <th className="px-4 py-3 border-b border-[#DCDEDE] font-medium">Unit</th>
              <th className="px-4 py-3 border-b border-[#DCDEDE] font-medium">COI Name</th>
              <th className="px-4 py-3 border-b border-[#DCDEDE] font-medium">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900 group">
                  Expiry Date
                  <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </th>
              <th className="px-4 py-3 border-b border-[#DCDEDE] font-medium">Status</th>
              <th className="px-4 py-3 border-b border-[#DCDEDE] font-medium">
                Reminder Status
              </th>
              <th className="px-4 py-3 border-b text-center border-[#DCDEDE] font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
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
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedIds.includes(row.id)}
                      onCheckedChange={(c) => onSelectRow(row.id, c)}
                    />
                  </td>
                  <td
                    className="px-4 py-3 truncate max-w-[120px]"
                    title={row.property}
                  >
                    {row.property}
                  </td>
                  <td className="px-4 py-3 truncate max-w-[120px]">
                    {row.tenantName}
                  </td>
                  <td className="px-4 py-3">{row.unit}</td>
                  <td
                    className="px-4 py-3 truncate max-w-[150px]"
                    title={row.coiName}
                  >
                    {row.coiName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {dateContent}
                      <button className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      className={`h-8 py-1 pl-2 pr-8 text-xs font-medium border-0 rounded-full focus:ring-1 focus:ring-blue-500 bg-transparent ${
                        row.status === "Active"
                          ? "text-blue-600 bg-blue-50"
                          : row.status === "Expired" ||
                              row.status === "Rejected"
                            ? "text-red-600 bg-red-50"
                            : row.status === "Expiring Soon"
                              ? "text-orange-600 bg-orange-50"
                              : "text-gray-500 bg-gray-100"
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
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3 text-center">
                    <button className="text-gray-400 hover:text-gray-700">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {data.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-6 py-3 border-t bg-gray-50/50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">
            Rows per page
          </span>
          <Select
            className="h-8 py-1 pr-8 w-16 text-xs bg-white text-gray-700 rounded-md border-gray-200"
            value={rowsPerPage.toString()}
            onChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </Select>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button
            className="p-1 rounded-md hover:bg-white border border-transparent hover:border-gray-200 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            &lt;
          </button>
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="p-1 rounded-md hover:bg-white border border-transparent hover:border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            &gt;
          </button>

          <div className="ml-2 pl-4 border-l flex items-center gap-2">
            Go to
            <input
              type="text"
              className="w-10 h-7 text-center border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              onKeyDown={handleGoToPage}
              placeholder={currentPage.toString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
