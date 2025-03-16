import { ComponentProps } from "react";
import { clsx } from "clsx";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "destructive";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
};

export function Button({ children, variant = "secondary", size, disabled = false, className, ...props }: ButtonProps) {
  const classes = clsx(
    "font-body tracking-tight",
    variant === "primary" && "bg-blue text-white hover:opacity-90",
    variant === "secondary" && "bg-white text-black outline-2 outline-gray-0 hover:bg-gray-100",
    variant === "destructive" && "bg-red text-white hover:opacity-90",
    size === "large" && "w-[20rem] py-2 rounded-lg",
    size === "medium" && "w-[10rem] py-1.5 rounded-2xl",
    size === "small" && "w-[4rem] h-[4rem] rounded-lg",
    disabled && "opacity-50 hover:cursor-none",
    !disabled && "hover:cursor-pointer",
    className,
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
