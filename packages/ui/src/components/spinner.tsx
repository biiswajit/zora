import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function SpinnerBase({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <LoaderIcon
            role="status"
            aria-label="Loading"
            className={cn("size-4 animate-spin", className)}
            {...props}
        />
    );
}

function Spinner() {
    return (
        <div className="flex items-center gap-4">
            <SpinnerBase />
        </div>
    );
}

export { Spinner };
