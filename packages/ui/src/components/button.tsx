import { ComponentProps, ReactNode } from "react";
import { clsx } from "clsx";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
  disabled?: boolean;
  label?: string;
  icon?: ReactNode;
};

export type OAuthButtonProps = ComponentProps<"button"> & { disabled?: boolean; label: string; icon: ReactNode };

export function Button({ variant = "secondary", disabled = false, label, icon, className, ...props }: ButtonProps) {
  const classes = clsx(
    className,
    disabled && "opacity-60 cursor-not-allowed",
    !disabled && "cursor-pointer hover:opacity-90",
    icon && "flex gap-[8px] justify-center items-center",
    variant === "secondary" && "bg-midnight text-light px-[20px] py-[10px] text-[14px]",
    variant === "primary" && "bg-fresh text-light px-[22px] py-[11px] text-[16px]",
    "font-body font-medium tracking-tight outline outline-dawnlight rounded-[8px]",
  );

  return (
    <button className={classes} {...props}>
      {icon ? icon : null} {label}
    </button>
  );
}

export function OAuthButton({ icon, label, disabled = false, className, ...props }: OAuthButtonProps) {
  const classes = clsx(
    className,
    disabled && "opacity-60 cursor-not-allowed",
    !disabled && "cursor-pointer",
    "flex gap-[8px] justify-center items-center",
    "font-body font-medium tracking-tight text-[14px] bg-light outline outline-dawnlight rounded-[8px] py-[11px] hover:bg-mistvell",
  );

  return (
    <button className={classes} {...props}>
      {icon ? icon : null} {label}
    </button>
  );
}
