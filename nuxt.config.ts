import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  alias: {
    "@heroicons-animated/vue": resolve(import.meta.dirname, "src/icons"),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: "heroicons-animated | Animated Heroicons for Vue",
      htmlAttrs: {
        lang: "en",
      },
      bodyAttrs: {
        class: "relative bg-background antialiased",
      },
      meta: [
        {
          name: "description",
          content:
            "Free open-source library of beautifully animated icons for Vue. Built with Motion and Heroicons.",
        },
        {
          name: "keywords",
          content:
            "animated icons, vue icons, heroicons, vueuse motion, nuxt icons",
        },
        { name: "theme-color", content: "#f5f5f5" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap",
        },
      ],
    },
  },
});
