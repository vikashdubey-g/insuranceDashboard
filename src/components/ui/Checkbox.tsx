import * as React from "react";
import { cn } from "../../lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, onChange, checked, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
      if (onCheckedChange) onCheckedChange(e.target.checked);
    };

    return (
      <label className="relative flex items-center cursor-pointer p-1">
        <input
          type="checkbox"
          className="peer sr-only"
          ref={ref}
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(
            "h-5 w-5 rounded border border-gray-300 bg-white transition-all peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2 flex items-center justify-center",
            checked ? "bg-blue-500 border-blue-500" : "hover:border-blue-400",
            className,
          )}
        >
          {checked && (
            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
          )}
        </div>
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
