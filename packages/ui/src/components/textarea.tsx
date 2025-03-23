import { ComponentProps } from "react";
import clsx from "clsx";

export type TextareaProps = ComponentProps<"textarea">;

export function Textarea({ className, ...props }: TextareaProps) {
  const classes = clsx(
    className,
    "outline outline-dawnlight",
    "text-moonshadow focus:text-midnight",
    "font-body rounded-[8px] p-4",
  );

  return <textarea className={classes} {...props} />;
}
