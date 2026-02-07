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
    LONG: "Free open-source library of beautifully animated icons for Vue. Built with Motion and Heroicons.",
    SHORT:
      "Animated Heroicons for Vue. Motion-powered, copy-paste ready, fully customizable.",
  },
  KEYWORDS: [
    "animated icons",
    "vue icons",
    "heroicons",
    "heroicons animated",
    "vueuse motion",
    "icon library",
    "open source icons",
    "nuxt icons",
  ],
} as const;

const LINK = {
  TWITTER: "https://x.com/alaymanguy",
  GITHUB: "https://github.com/heroicons-animated/heroicons-animated-vue",
  HEROICONS: "https://heroicons.com",
  MOTION: "https://motion.dev",
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
