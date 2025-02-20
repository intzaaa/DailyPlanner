import { config as loadEnv } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
loadEnv({ export: true });

import { serve } from "https://deno.land/std@0.194.0/http/server.ts";

interface AppConfig {
    language: "zh-CN" | "en-US";
    llm: {
        base_url: string;
        api_key: string;
        model: string;
    };
    user: {
        owner: string;
        bio: string;
        ical: string;
    };
    log_level: string;
}

export const config: AppConfig = {
    language: (Deno.env.get("LANGUAGE") as "zh-CN" | "en-US") || "zh-CN",
    llm: {
        base_url: Deno.env.get("LLM_BASE_URL") || "https://api.chatanywhere.com",
        api_key: Deno.env.get("OPENAI_API_KEY") || "",
        model: Deno.env.get("LLM_MODEL") || "gpt-3.5-turbo",
    },
    user: {
        owner: Deno.env.get("USER_OWNER") || "User",
        bio: Deno.env.get("USER_BIO") || "User bio here.",
        ical: Deno.env.get("USER_ICAL") || "./src/parsers/test.ics",
    },
    log_level: Deno.env.get("LOG_LEVEL") || "INFO",
};

const handler = (_req: Request): Response =>
    new Response(JSON.stringify({ message: "Server is running." }), {
        headers: { "Content-Type": "application/json" },
    });

async function main() {
    const port = Number(Deno.env.get("PORT") || "8000");
    console.info(`Starting server on port ${port}...`);

    const controller = new AbortController();

    Deno.addSignalListener("SIGINT", () => controller.abort());
    Deno.addSignalListener("SIGTERM", () => controller.abort());

    try {
        await serve(handler, { port, signal: controller.signal });
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            console.info("Server has gracefully shut down.");
        } else {
            console.error("Error starting server:", error);
        }
    }
}

if (import.meta.main) {
    main();
}
