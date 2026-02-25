import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { Search } from "lucide-react";
import type { COIStatus } from "../../types";
import { addIcon, settingIcon } from "../../assets";

interface FiltersBarProps {
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (status: COIStatus | "All") => void;
  onAddClick: () => void;
}

export const FiltersBar = ({
  onSearchChange,
  onStatusFilterChange,
  onAddClick,
}: FiltersBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1">
        <div className="w-40 shrink-0">
          <Select placeholder="All Properties">
            <option value="all">All Properties</option>
            <option value="maple">Maplewood...</option>
            <option value="oak">Oak Tree Tower</option>
          </Select>
        </div>
        <div className="w-36 shrink-0">
          <Select
            placeholder="Status"
            onChange={(e) => onStatusFilterChange(e.target.value as any)}
            defaultValue="All"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Rejected">Rejected</option>
            <option value="Expiring Soon">Expiring Soon</option>
            <option value="Not Processed">Not Processed</option>
          </Select>
        </div>
        <div className="w-40 shrink-0">
          <Select placeholder="Filter by Expiry">
            <option value="all">Any Expiry</option>
            <option value="30">Next 30 Days</option>
            <option value="60">Next 60 Days</option>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="w-full sm:w-80">
          <Input
            icon={<Search className="h-4 w-4" />}
            placeholder="Search by tenant, properties, or unit..."
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <button className="shrink-0 text-gray-500 rounded-full border border-[#E7E9E9] p-1 cursor-pointer">
          <img src={settingIcon} alt="settingIcon" />
        </button>
        <Button onClick={onAddClick} variant="primary" startIcon={addIcon} startEndIconClassName="w-3 h-3" >
          ADD COI{" "}
        </Button>
      </div>
    </div>
  );
};
