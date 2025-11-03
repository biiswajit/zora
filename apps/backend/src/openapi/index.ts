import { createDocument } from "zod-openapi";
import { errorResponses } from "./errors";
import { miscPaths } from "./misc";
import { workspacesPaths } from "./workspaces";

export const document = createDocument({
    openapi: "3.1.0",
    info: {
        title: "Zora API",
        description: "Zora is a task management platform designed for small teams",
        version: "0.0.0",
        contact: {
            name: "Biswajit Malakar",
            email: "mebiswajitmalakar@gmail.com",
        },
    },
    servers: [
        {
            url: "http://localhost:8080",
            description: "Zora development server",
        },
    ],
    paths: {
        ...workspacesPaths,
        ...miscPaths,
    },
    components: {
        securitySchemes: {
            sessionAuth: {
                type: "apiKey",
                name: "session_token",
                in: "cookie",
                description:
                    "Session-based authentication. The client must include a valid session_token cookie (set after login). This cookie is HTTP-only and used by the server to retrieve the session from the database.",
            },
        },
        responses: {
            ...errorResponses,
        },
    },
});
