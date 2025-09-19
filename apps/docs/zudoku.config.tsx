import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
    site: {
        title: "Zora / docs",
        logo: {
            src: {
                light: "/primary.svg",
                dark: "/primary-flip.svg",
            },
            width: "40px",
        },
        banner: {
            message: "Currently in heavy development",
            color: "caution",
            dismissible: false,
        },
    },
    navigation: [
        {
            type: "category",
            label: "Documentation",
            icon: "book-open-text",
            items: [
                {
                    type: "doc",
                    file: "/overview",
                    path: "/overview",
                    label: "Overview",
                },
            ],
        },
        {
            type: "link",
            label: "API Reference",
            icon: "code-xml",
            to: "/reference",
        },
        {
            type: "link",
            label: "Auth Reference",
            icon: "shield-user",
            to: "/auth-reference",
        },
    ],
    redirects: [{ from: "/", to: "/overview" }],
    apis: [
        {
            type: "file",
            input: "./specs/openapi.yaml",
            path: "/reference",
            options: {
                showVersionSelect: "if-available",
                examplesLanguage: "shell",
            },
        },
        {
            type: "file",
            input: "./specs/better-auth.yaml",
            path: "/auth-reference",
        },
    ],
};

export default config;
