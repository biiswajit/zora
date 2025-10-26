"use client";

import { type ComponentType, type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { getLastUsedLoginMethod } from "@/utils/auth-client";
import { AuthSeparator } from "./auth-seperator";
import { GithubButton } from "./github-button";
import { GoogleButton } from "./google-button";

type AuthMethod = "google" | "github";

export type AuthButtonProps = {
    clickedMethod: AuthMethod | undefined;
    setClickedMethod: Dispatch<SetStateAction<AuthMethod | undefined>>;
};

type AuthProvider = {
    method: AuthMethod;
    component: ComponentType<AuthButtonProps>;
};

const authProviders: AuthProvider[] = [
    {
        method: "google",
        component: GoogleButton,
    },
    {
        method: "github",
        component: GithubButton,
    },
];

export function LoginForm() {
    const [clickedMethod, setClickedMethod] = useState<AuthMethod | undefined>(undefined);
    const [lastUsedAuthProvider, setLastUsedAuthProvider] = useState<AuthProvider | undefined>(
        undefined,
    );

    useEffect(() => {
        // NOTE: due to hydration error getLastUsedLoginMethod() has to be wrapped inside useEffect()
        const provider = authProviders.find(({ method }) => method === getLastUsedLoginMethod());
        setLastUsedAuthProvider(provider);
    }, []);

    return (
        <div className="flex flex-col gap-3">
            {lastUsedAuthProvider && (
                <div className="flex flex-col gap-2">
                    <lastUsedAuthProvider.component
                        clickedMethod={clickedMethod}
                        setClickedMethod={setClickedMethod}
                    />
                    <span className="text-muted-foreground text-xs text-center">
                        You signed in with{" "}
                        {lastUsedAuthProvider.method.charAt(0).toUpperCase() +
                            lastUsedAuthProvider.method.slice(1)}{" "}
                        last time
                    </span>
                    <AuthSeparator />
                </div>
            )}

            {authProviders
                .filter(({ method }) => method !== lastUsedAuthProvider?.method)
                .map((provider) => (
                    <provider.component
                        key={provider.method}
                        clickedMethod={clickedMethod}
                        setClickedMethod={setClickedMethod}
                    />
                ))}
        </div>
    );
}
