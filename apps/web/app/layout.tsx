import type { Metadata } from "next";
import { Inter } from "@/styles/fonts";
import "@/styles/globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Zora",
  description: "Zora lets you find like minded people by writing simple text prompt",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${Inter.variable} ${Inter.variable}`}>
        <Toaster richColors />
        {children}
      </body>
    </html>
  );
}
