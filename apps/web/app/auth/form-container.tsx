import { AuthForm } from "./form";
import { clsx } from "clsx";

export function AuthFormContainer() {
  const classes = clsx(
    "flex flex-col",
    "w-screen sm:w-[450px] md:w-[480px]",
    "bg-light text-center",
    "outline outline-dawnlight sm:rounded-lg md:rounded-xl",
  );

  return (
    <div className={classes}>
      <AuthHeading />
      <AuthForm />
    </div>
  );
}

function AuthHeading() {
  return <p className="font-body font-medium text-xl text-midnight py-10">Continue with your account</p>;
}
