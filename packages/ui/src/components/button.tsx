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
    "font-body font-medium tracking-tight outline outline-dawnlight rounded-[8px]",
    variant === "primary" && "bg-fresh px-[22px] py-[11px] text-[16px]",
    variant === "secondary" && "bg-midnight px-[20px] py-[10px] text-[14px]",
    icon && "flex gap-[8px] justify-center items-center",
    disabled && "opacity-60 hover:cursor-none",
    !disabled && "hover:cursor-pointer",
    className,
  );

  return (
    <button className={classes} {...props}>
      {icon ? icon : null} {label}
    </button>
  );
}

export function OAuthButton({ icon, label, disabled = false, className, ...props }: OAuthButtonProps) {
  const classes = clsx(
    "font-body font-medium tracking-tight text-[14px] bg-light outline outline-dawnlight rounded-[8px] py-[11px]",
    "flex gap-[8px] justify-center items-center",
    disabled && "opacity-60 hover:cursor-none",
    !disabled && "hover:cursor-pointer hover:bg-mistvell",
    className,
  );

  return (
    <button className={classes} {...props}>
      {icon ? icon : null} {label}
    </button>
  );
}
