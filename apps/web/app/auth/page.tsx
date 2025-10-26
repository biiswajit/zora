import { cn } from "@zora/ui/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@zora/ui/web/components/card";
import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./form";

export const metadata: Metadata = {
    title: "Authentication | Zora",
    description: "Zora is a task management platform for small teams",
};

export default function Login() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div
                className="absolute inset-0 z-1 pointer-events-none opacity-40"
                style={{
                    backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
                    repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
                    radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
                    radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
                `,
                    backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
                }}
            />
            <div className="bg-primary-orange rounded-2xl p-2 max-w-[28rem] shadow-md z-1">
                <Card className="gap-10">
                    <CardHeader>
                        <CardTitle>Connect & Start</CardTitle>
                        <CardDescription>
                            Use your preferred account to quickly log in or set up your profile.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm />
                    </CardContent>
                </Card>
                <Terms className="m-4" />
            </div>
        </div>
    );
}

function Terms({ className }: { className?: string }) {
    return (
        <p className={cn("text-xs text-muted font-body text-center", className)}>
            By clicking "Continue with Google/Notion/Github" above, you acknowledge that you have
            read and understood, and agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4">
                Terms & Condition
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4">
                Privacy Policy
            </Link>
            .
        </p>
    );
}
