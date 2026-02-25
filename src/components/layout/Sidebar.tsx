import { useState } from "react";
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-[#F3F4F4] border-r border-[#DCDEDE] transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* App Logo Area */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4">
        <div className="flex items-center gap-2 overflow-hidden">
          {/* Mock Logo Icon */}
          <img src={legalgraphMainLogo} alt="legalgraphMainLogo" className="shrink-0" />

          <span
            className={cn(
              "text-lg font-semibold bg-linear-to-r from-[#2C8ED5] to-[#1762AA] bg-clip-text text-transparent transition-opacity duration-300 whitespace-nowrap",
              isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
            )}
          >
            LegalGraph AI
          </span>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="cursor-pointer shrink-0 rounded-full p-1 text-blue-500 hover:bg-blue-100 transition-colors"
        >
          <img
            src={circleChevronLeft}
            alt="circleChevronLeft"
            className={cn(
              "transition-transform duration-300",
              isCollapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Review Button */}
      <div className="p-4">
        <Button
          variant="primary"
          className={cn("w-full transition-all duration-300 overflow-hidden", isCollapsed ? "px-0 justify-center" : "")}
          endIcon={isCollapsed ? undefined : addIcon}
          startIcon={isCollapsed ? addIcon : undefined}
          startEndIconClassName="w-3 h-3 shrink-0"
        >
          <span
            className={cn(
              "transition-opacity duration-300 whitespace-nowrap",
              isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
            )}
          >
            Review documents
          </span>
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
              "group flex items-center rounded-md px-3 py-2 text-sm transition-colors",
              isCollapsed ? "justify-center" : "gap-3"
            )}
            title={isCollapsed ? item.name : undefined}
          >
            <img src={item.icon} alt={item.name} className="shrink-0" />
            <span
              className={cn(
                "transition-opacity duration-300 whitespace-nowrap",
                isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
              )}
            >
              {item.name}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
};
