import { resolve } from "node:path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  alias: {
    "@ha-vue-icons": resolve(__dirname, "src/icons"),
  },
  app: {
    head: {
      title: "Heroicons Animated for Vue",
      meta: [
        {
          name: "description",
          content:
            "Animated Heroicons for Vue. Motion-powered, copy‑paste ready, and fully customizable.",
        },
        {
          name: "keywords",
          content:
            "animated icons, vue icons, heroicons, vueuse motion, nuxt icons",
        },
        { name: "theme-color", content: "#0f172a" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      ],
    },
  },
});
