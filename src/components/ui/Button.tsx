import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "success"
    | "link"
    | "secondaryError";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  showContentWhileLoading?: boolean;
  startIcon?: string;
  endIcon?: string;
  startEndIconClassName?: string;
}

const activeVariantClasses = {
  primary: "bg-[#4A88EE] text-white hover:bg-blue-600 shadow-sm",
  secondary: "border border-[#4A88EE] text-[#4A88EE] hover:bg-blue-50",
  tertiary: "bg-[#F3F4F4] text-[#2C3635]",
  error: "bg-red-700 text-white hover:bg-red-800 shadow-sm",
  success: "bg-green-700 text-white hover:bg-green-800 shadow-sm",
  link: "bg-white text-[#1C64F2]",
  secondaryError: "border border-red-600 text-red-600 hover:bg-red-50",
};

const disabledVariantClasses = {
  primary: "bg-blue-700 text-white opacity-70 cursor-not-allowed",
  secondary:
    "bg-blue-50 border border-blue-700 text-blue-700 opacity-70 cursor-not-allowed",
  tertiary: "bg-gray-100 text-gray-400 opacity-70 cursor-not-allowed",
  error: "bg-red-700 text-white opacity-70 cursor-not-allowed",
  success: "bg-green-700 text-white opacity-70 cursor-not-allowed",
  link: "bg-gray-100 text-gray-500 opacity-70 cursor-not-allowed",
  secondaryError:
    "bg-red-50 border border-red-400 text-red-400 opacity-70 cursor-not-allowed",
};

const sizeClasses = {
  small: "px-3 py-1.5 text-sm",
  medium: "px-4 py-2 text-sm",
  large: "px-5 py-3 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      variant = "primary",
      size = "medium",
      disabled = false,
      isLoading = false,
      showContentWhileLoading = true,
      className = "",
      children,
      startIcon,
      endIcon,
      startEndIconClassName = "h-5 w-5",
      ...props
    },
    ref,
  ) => {
    const baseClass = cn(
      "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all relative cursor-pointer",
      sizeClasses[size],
    );

    const variantClass =
      disabled || isLoading
        ? disabledVariantClasses[variant]
        : activeVariantClasses[variant];

    const allClasses = cn(baseClass, variantClass, className);

    const bouncingDots = (
      <span className="absolute inset-0 flex justify-center items-center space-x-1">
        <span className="w-2 h-2 bg-current rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.2s]"></span>
        <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.4s]"></span>
      </span>
    );

    const iconClassName = cn(
      startEndIconClassName,
      (disabled || isLoading) && "opacity-50",
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={allClasses}
        {...props}
      >
        {isLoading && bouncingDots}

        <span
          className={cn(
            "inline-flex items-center gap-2",
            isLoading && !showContentWhileLoading ? "opacity-0" : "opacity-100",
          )}
        >
          {startIcon && (
            <img src={startIcon} alt="start icon" className={iconClassName} />
          )}

          <span>{children}</span>

          {endIcon && (
            <img src={endIcon} alt="end icon" className={iconClassName} />
          )}
        </span>
      </button>
    );
  },
);

Button.displayName = "Button";
