import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
    site: {
        title: "Zora / docs",
        logo: {
            src: {
                light: "/zora.svg",
                dark: "/zora.svg",
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
