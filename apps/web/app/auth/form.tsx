import { Button } from "@zora/ui/components/button";
import { Google } from "@zora/ui/icons/google";
import { GitHub } from "@zora/ui/icons/github";
import { Microsoft } from "@zora/ui/icons/microsoft";
import { LinkedIn } from "@zora/ui/icons/linkedin";
import { ComponentProps } from "react";
import { clsx } from "clsx";

export type AuthFormProps = ComponentProps<"form">;

export default function AuthForm({ className, ...props }: AuthFormProps) {
  const classes = clsx("flex flex-col gap-4", className);

  return (
    <form className={classes} {...props}>
      <Button className="py-2 rounded-lg flex gap-2 justify-center">
        <Google className="w-[24px] h-[24px]" />
        Continue with Google
      </Button>
      <Button className="py-2 rounded-lg flex gap-2 justify-center">
        <GitHub className="w-[24px] h-[24px]" />
        Continue with GitHub
      </Button>
      <Button className="py-2 rounded-lg flex gap-2 justify-center">
        <Microsoft className="w-[24px] h-[24px]" />
        Continue with Microsoft
      </Button>
      <Button className="py-2 rounded-lg flex gap-2 justify-center">
        <LinkedIn className="w-[24px] h-[24px]" />
        Continue with LinkedIn
      </Button>
    </form>
  );
}
