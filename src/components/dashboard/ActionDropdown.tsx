import { useState, useRef, useEffect } from "react";
import { threeDotIcon, editPencilIcon } from "../../assets";
import { Trash2 } from "lucide-react"; // Import a delete icon from lucide-react

interface ActionDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionDropdown = ({ onEdit, onDelete }: ActionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    onEdit();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    onDelete();
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img src={threeDotIcon} alt="Options" className="dark:invert opacity-70" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1 w-32 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-xl ring-opacity-5 focus:outline-none border border-gray-100 dark:border-gray-700">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={handleEditClick}
              className="group cursor-pointer flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              role="menuitem"
            >
              <img 
                src={editPencilIcon} 
                alt="" 
                className="mr-3 h-4 w-4 dark:invert opacity-70 group-hover:opacity-100 transition-opacity" 
              />
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="group cursor-pointer flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              role="menuitem"
            >
              <Trash2 className="mr-3 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
