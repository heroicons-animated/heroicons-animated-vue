const SITE = {
  NAME: "heroicons-animated",
  URL: "https://vue.heroicons-animated.com",
  OG_IMAGE: "/og.png",
  AUTHOR: {
    NAME: "Aniket Pawar",
    TWITTER: "@alaymanguy",
    GITHUB: "Aniket-508",
  },
  DESCRIPTION: {
    LONG: "Free open-source library of beautifully animated icons for Vue. Built with Motion for Vue and Heroicons. Copy-paste ready, MIT licensed, fully customizable SVG icons with smooth animations.",
    SHORT:
      "Free animated icons library for Vue. Smooth Motion for Vue-powered Heroicons. MIT licensed, copy-paste ready.",
  },
  KEYWORDS: [
    "animated icons",
    "vue icons",
    "heroicons",
    "heroicons animated",
    "animated heroicons",
    "heroicons vue",
    "svg icons",
    "animated svg",
    "vue components",
    "motion icons",
    "motion-v",
    "icon library",
    "open source icons",
    "nuxt icons",
    "free icons",
    "MIT license icons",
    "copy paste icons",
    "tailwind icons",
    "nuxt 4 icons",
  ],
} as const;

const LINK = {
  TWITTER: "https://x.com/alaymanguy",
  GITHUB: "https://github.com/heroicons-animated/heroicons-animated-vue",
  HEROICONS: "https://heroicons.com",
  MOTION: "https://motion.dev/docs/vue",
  LICENSE:
    "https://github.com/heroicons-animated/heroicons-animated-vue/blob/main/LICENSE",
  SPONSOR: "https://github.com/sponsors/Aniket-508",
} as const;

const PACKAGE_MANAGER = {
  PNPM: "pnpm",
  NPM: "npm",
  YARN: "yarn",
  BUN: "bun",
} as const;

export { LINK, PACKAGE_MANAGER, SITE };
