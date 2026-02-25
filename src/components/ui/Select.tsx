import React from "react";
import { cn } from "../../lib/utils";
import { greyDownArrow } from "../../assets";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: { label: string; value: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, children, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <select
          ref={ref}
          className={cn(
            "flex h-10 w-full appearance-none rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <img
          src={greyDownArrow}
          className="absolute right-3 h-3 w-3 text-gray-400 pointer-events-none dark:invert opacity-70"
          alt="greyDownArrow"
        />
      </div>
    );
  },
);
Select.displayName = "Select";
