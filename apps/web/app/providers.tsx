"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@zora/ui/components/sonner";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

export default function RootProvider({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
        </QueryClientProvider>
    );
}
