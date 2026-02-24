import { cn } from "../../lib/utils";
import { LayoutGrid, Folders, FileText, Settings } from "lucide-react";
import { addIcon, circleChevronLeft, legalgraphMainLogo } from "../../assets";

const navigation = [
  { name: "Contract Vault", href: "#", icon: Folders, current: false },
  { name: "COI Dashboard", href: "#", icon: FileText, current: true },
  { name: "Analysis Results", href: "#", icon: LayoutGrid, current: false },
  { name: "Setting", href: "#", icon: Settings, current: false },
];

export const Sidebar = () => {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-gray-50">
      {/* App Logo Area */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b">
        <div className="flex items-center gap-2">
          {/* Mock Logo Icon */}
          <img src={legalgraphMainLogo} alt="legalgraphMainLogo" />

          <span className="text-lg font-semibold bg-linear-to-r from-[#2C8ED5] to-[#1762AA] bg-clip-text text-transparent">
            LegalGraph AI
          </span>
        </div>
        <button className="rounded-full p-1 text-blue-500 hover:bg-blue-100 transition-colors">
          <img src={circleChevronLeft} alt="circleChevronLeft" />
        </button>
      </div>

      {/* Review Button */}
      <div className="p-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition-colors shadow-sm">
          Review documents <img src={addIcon} alt="addIcon" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-2">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={cn(
              item.current
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
            )}
          >
            <item.icon
              className={cn(
                item.current
                  ? "text-blue-600"
                  : "text-gray-400 group-hover:text-gray-500",
                "h-5 w-5 shrink-0",
              )}
              aria-hidden="true"
            />
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
};
