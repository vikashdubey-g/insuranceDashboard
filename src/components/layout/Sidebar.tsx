import { cn } from "../../lib/utils";

import {
  addIcon,
  circleChevronLeft,
  legalgraphMainLogo,
  contactVault,
  coiDashboard,
  analysisResult,
  settingIcon,
} from "../../assets";
import { Button } from "../ui/Button";

const navigation = [
  { name: "Contract Vault", href: "#", icon: contactVault, current: false },
  { name: "COI Dashboard", href: "#", icon: coiDashboard, current: true },
  { name: "Analysis Results", href: "#", icon: analysisResult, current: false },
  { name: "Setting", href: "#", icon: settingIcon, current: false },
];

export const Sidebar = () => {
  return (
    <div className="flex h-full w-64 flex-col bg-[#F3F4F4] border-r border-[#DCDEDE]">
      {/* App Logo Area */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4">
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
        <Button variant="primary" endIcon={addIcon} startEndIconClassName="w-3 h-3" >
          Review documents
        </Button>
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
            <img src={item.icon} alt={item.name} />
            {/* <item.icon
              className={cn(
                item.current
                  ? "text-blue-600"
                  : "text-gray-400 group-hover:text-gray-500",
                "h-5 w-5 shrink-0",
              )}
              aria-hidden="true"
            /> */}
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
};
