import { fileURLToPath, URL } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    alias: {
        components: fileURLToPath(new URL("./app/components", import.meta.url)),
        css: fileURLToPath(new URL("./app/assets/css", import.meta.url)),
        images: fileURLToPath(new URL("./app/assets/images", import.meta.url)),
        utils: fileURLToPath(new URL("./app/utils", import.meta.url)),
    },
    app: {
        head: {
            link: [{ rel: "icon", type: "icon/ico", href: "/favicon.ico" }],
            meta: [
                { name: "robots", content: "all" },
                {
                    name: "description",
                    content: "A tool to work with Journey saves.",
                },
                { name: "keywords", content: "Journey, SAVE.BIN, Companion" },
            ],
            htmlAttrs: {
                lang: "en",
            },
        },
    },
    compatibilityDate: "2026-04-04",
    css: ["css/style.css"],
    devtools: {
        enabled: true,
    },
    ssr: true,
    telemetry: false,
    typescript: {
        strict: true,
        typeCheck: "build",
    },
    vite: {
        optimizeDeps: {
            include: ["vue-curtains", "curtainsjs"],
        },
    },
});
