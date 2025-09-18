import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
    site: {
        title: "Zora / docs",
        logo: {
            src: {
                light: "/public/primary.svg",
                dark: "/public/primary-flip.svg",
            },
            width: "40px",
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
            type: "category",
            label: "Changelog",
            icon: "clock",
            items: [],
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
    ],
};

export default config;
