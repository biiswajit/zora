import { cn } from "@zora/ui/lib/utils";
import type { Metadata } from "next";
import { inter, victorMono } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "Zora | Manage tasks",
    description: "Zora is a task management platform for small teams",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn(inter.variable, victorMono.variable)}>
            <body>{children}</body>
        </html>
    );
}
