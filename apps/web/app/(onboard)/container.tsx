import { ComponentProps } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

export function Container({ children, ...props }: ComponentProps<"div">) {
  return (
    <div {...props} className="basis-1/1 md:basis-1/2 grid place-content-center gap-8">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
