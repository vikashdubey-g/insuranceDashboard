import { useState, useRef, useEffect } from "react";
import { greyDownArrow } from "../../assets";
import { User, Settings, LogOut } from "lucide-react";

export const UserDropdown = () => {
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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div 
        className="flex items-center gap-2 md:gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 p-1.5 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600 dark:bg-blue-900 dark:text-blue-100 shrink-0">
          V
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Vikash</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">v.dubey2311@gmail.com</p>
        </div>
        <img 
          src={greyDownArrow} 
          alt="greyDownArrow" 
          className={`w-3 h-3 dark:invert opacity-75 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-lg  ring-opacity-5 focus:outline-none border border-gray-100 dark:border-gray-700">
          <div className="py-2" role="menu" aria-orientation="vertical">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors">
              <User className="w-4 h-4 opacity-70" />
              Profile
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors">
              <Settings className="w-4 h-4 opacity-70" />
              Settings
            </button>
            <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors">
              <LogOut className="w-4 h-4 opacity-70" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
