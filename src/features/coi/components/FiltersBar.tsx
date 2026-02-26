import { useState, useEffect } from "react";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";
import { Search } from "lucide-react";
import type { COIStatus } from "../../../types";
import { addIcon, settingIcon } from "../../../assets";

interface FiltersBarProps {
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (status: COIStatus | "All") => void;
  onPropertyFilterChange?: (property: string) => void;
  onExpiryFilterChange?: (days: string) => void;
  onAddClick: () => void;
}

export const FiltersBar = ({
  onSearchChange,
  onStatusFilterChange,
  onPropertyFilterChange,
  onExpiryFilterChange,
  onAddClick,
}: FiltersBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(searchValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, onSearchChange]);

  return (
    <div className="flex flex-col xl:flex-row items-center justify-between gap-4 mb-4">
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto p-1 -m-1">
        <div className="w-full sm:w-40 shrink-0">
          <Select 
            placeholder="All Properties"
            onChange={(e) => onPropertyFilterChange?.(e.target.value)}
            defaultValue="all"
          >
            <option value="all">All Properties</option>
            <option value="maple">Maplewood...</option>
            <option value="oak">Oak Tree Tower</option>
          </Select>
        </div>
        <div className="w-full sm:w-36 shrink-0">
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
        <div className="w-full sm:w-40 shrink-0">
          <Select 
            placeholder="Filter by Expiry"
            onChange={(e) => onExpiryFilterChange?.(e.target.value)}
            defaultValue="all"
          >
            <option value="all">Any Expiry</option>
            <option value="30">Next 30 Days</option>
            <option value="60">Next 60 Days</option>
          </Select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
        <div className="w-full xl:w-80">
          <Input
            icon={<Search className="h-4 w-4" />}
            placeholder="Search by tenant, properties, or unit..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button className="shrink-0 text-gray-500 rounded-full border border-[#E7E9E9] p-1 cursor-pointer">
            <img src={settingIcon} alt="settingIcon" />
          </button>
          <Button onClick={onAddClick} variant="primary" startIcon={addIcon} startEndIconClassName="w-3 h-3" className="w-full sm:w-auto justify-center" >
            ADD COI{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};
