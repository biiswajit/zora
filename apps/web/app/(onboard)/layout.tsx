import { Metadata } from "next";
import { Banner } from "./banner";
import { Container } from "./container";

export const metadata: Metadata = {
  title: "Zora | Onboard",
  description: "Zora lets you find like minded people by writing simple text prompt",
};

export default function OnboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen w-screen flex flex-row items-stretch gap-4 p-4">
      <Container>{children}</Container>
      <Banner />
    </div>
  );
}
