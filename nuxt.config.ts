import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";
import type { SitemapEntry } from "./app/types";
import { SITE } from "./app/lib/constants";
import { ICON_MANIFEST } from "./app/lib/manifest";

const SITE_DEFAULT_TITLE = "Animated Heroicons for Vue";
const SITE_OG_TITLE = `${SITE.NAME} | ${SITE_DEFAULT_TITLE}`;
const SITE_OG_IMAGE_URL = `${SITE.URL}${SITE.OG_IMAGE}`;
const SITE_OG_IMAGE_ALT = `${SITE.NAME} - Animated Heroicons Library for Vue`;
const OG_IMAGE_DIMENSIONS = { width: 1200, height: 630 } as const;

const toIsoDate = (date: Date) => date.toISOString().split("T")[0] ?? "";
const now = new Date();
const lastmod = toIsoDate(now);

const SITEMAP_URLS: SitemapEntry[] = [
  {
    loc: "/",
    lastmod,
    changefreq: "weekly",
    priority: 1,
  },
  ...ICON_MANIFEST.map(
    (icon): SitemapEntry => ({
      loc: `/icons/${icon.name}`,
      lastmod,
      changefreq: "monthly",
      priority: 0.7,
    })
  ),
];

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/fonts",
    "@nuxtjs/seo",
    "motion-v/nuxt",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "nuxt-umami",
  ],
  umami: {
    id: process.env.NUXT_UMAMI_ID,
    host: process.env.NUXT_UMAMI_HOST,
    autoTrack: true,
    ignoreLocalhost: true,
  },
  colorMode: {
    classSuffix: "",
  },
  site: {
    url: SITE.URL,
    name: SITE.NAME,
    description: SITE.DESCRIPTION.LONG,
    defaultLocale: "en",
  },
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
  robots: {
    groups: [
      {
        userAgent: "*",
        allow: ["/"],
      },
    ],
    sitemap: `${SITE.URL}/sitemap.xml`,
  },
  sitemap: {
    urls: SITEMAP_URLS,
  },
  seo: {
    meta: {
      description: SITE.DESCRIPTION.LONG,
      keywords: SITE.KEYWORDS.join(", "),
      applicationName: SITE.NAME,
      ogTitle: SITE_OG_TITLE,
      ogDescription: SITE.DESCRIPTION.SHORT,
      ogSiteName: SITE.NAME,
      ogLocale: "en_US",
      ogType: "website",
      ogUrl: SITE.URL,
      ogImage: {
        url: SITE_OG_IMAGE_URL,
        alt: SITE_OG_IMAGE_ALT,
        ...OG_IMAGE_DIMENSIONS,
      },
      twitterCard: "summary_large_image",
      twitterTitle: SITE_OG_TITLE,
      twitterDescription: SITE.DESCRIPTION.SHORT,
      twitterImage: SITE_OG_IMAGE_URL,
      twitterImageAlt: SITE_OG_IMAGE_ALT,
      twitterCreator: SITE.AUTHOR.TWITTER,
      twitterSite: SITE.AUTHOR.TWITTER,
      themeColor: "#f5f5f5",
      author: SITE.AUTHOR.NAME,
    },
  },
  css: ["~/assets/css/main.css"],
  fonts: {
    families: [
      { name: "Geist", provider: "google" },
      { name: "Geist Mono", provider: "google" },
    ],
  },
  alias: {
    "@heroicons-animated/vue": resolve(import.meta.dirname, "src/icons"),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      titleTemplate: "%s",
      viewport:
        "width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, minimum-scale=1",
      htmlAttrs: {
        lang: "en",
      },
      bodyAttrs: {
        class: "relative bg-background antialiased",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
      ],
    },
  },
});
