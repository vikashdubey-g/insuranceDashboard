import { aiIcon, downArrow, greyDownArrow, helpIcon } from "../../assets";
import { Button } from "../ui/Button";

export const Header = () => {
  return (
    <header className="flex h-20 items-center justify-between bg-white px-8">
      {/* Title Area */}
      <div>
        <h1 className="text-2xl font-bold text-[#4F5857] tracking-tight">
          COI Review Dashboard
        </h1>
        <p className="mt-1 text-sm text-[#525866] font-medium">
          Overview of all Certificate of insurance
        </p>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          endIcon={downArrow}
          startEndIconClassName="w-3 h-3"
        >
          Send Bulk Reminder
        </Button>

        <Button variant="tertiary" startIcon={aiIcon}>
          Ask LegalGraph AI
        </Button>

        <Button variant="secondary" startIcon={helpIcon}>
          Help
        </Button>

        <div className="ml-4 flex items-center gap-3  pl-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
            S
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">Shubham</p>
            <p className="text-xs text-gray-500">shubham@gmail.com</p>
          </div>
          <img src={greyDownArrow} alt="greyDownArrow" className="w-3 h-3" />
        </div>
      </div>
    </header>
  );
};
