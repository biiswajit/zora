"use client";

import type { ReactNode } from "react";
import "./styles.css";

interface ButtonProps {
    children: ReactNode;
    className?: string;
    appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
    return (
        <button
            type="button"
            className={`bg-amber-700 text-2xl ${className}`}
            onClick={() => alert(`Hello from your ${appName} app!`)}>
            {children}
        </button>
    );
};
