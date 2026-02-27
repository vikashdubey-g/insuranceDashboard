import { aiIcon, downArrow, helpIcon } from "../../assets";
import { Button } from "../ui/Button";
import { ThemeToggle } from "../ThemeToggle";
import { UserDropdown } from "./UserDropdown";

interface HeaderProps {
  selectedCount?: number;
  onBulkReminderClick?: () => void;
  onAskAIClick?: () => void;
  onHelpClick?: () => void;
  title?: string;
  description?: string;
}

export const Header = ({ 
  selectedCount = 0, 
  onBulkReminderClick, 
  onAskAIClick, 
  onHelpClick,
  title = "COI Review Dashboard",
  description = "Overview of all Certificate of insurance"
}: HeaderProps) => {
  return (
    <header className="flex h-16 md:h-20 items-center justify-between bg-white dark:bg-gray-800 px-4 md:px-8 border-b border-gray-200 dark:border-gray-700 ml-12 md:ml-0">
      {/* Title Area */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-[#4F5857] dark:text-gray-100 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="hidden md:block mt-1 text-sm text-[#525866] dark:text-gray-400 font-medium">
            {description}
          </p>
        )}
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden lg:flex items-center gap-4">
          <Button
            variant="secondary"
            endIcon={downArrow}
            startEndIconClassName="w-3 h-3"
            disabled={selectedCount === 0}
            onClick={onBulkReminderClick}
          >
            {selectedCount > 0 
              ? `Send ${selectedCount} Reminder${selectedCount > 1 ? 's' : ''}` 
              : 'Send Bulk Reminder'}
          </Button>

          <Button variant="tertiary" startIcon={aiIcon} onClick={onAskAIClick}>
            Ask LegalGraph AI
          </Button>

          <Button variant="secondary" startIcon={helpIcon} onClick={onHelpClick}>
            Help
          </Button>
        </div>

        <div className="ml-2 md:ml-4 flex items-center gap-2 md:gap-3 pl-2 md:pl-6 border-l border-transparent lg:border-gray-200 dark:lg:border-gray-700">
          <ThemeToggle />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};
