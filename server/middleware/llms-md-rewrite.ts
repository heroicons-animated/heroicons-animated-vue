import { defineEventHandler, getRequestURL, setResponseHeader } from "h3";
import { LINK, SITE } from "~/lib/constants";
import { kebabToPascalCase } from "~/lib/kebab-to-pascal";
import { ICON_MANIFEST } from "~/lib/manifest";
import type { IconManifestItem } from "~/types";

const getIconBySlug = (slug: string) =>
  ICON_MANIFEST.find((icon) => icon.name === slug);

const getSimilarIcons = (
  currentIcon: IconManifestItem,
  limit = 5
): IconManifestItem[] => {
  const currentKeywords = new Set(currentIcon.keywords);
  return ICON_MANIFEST.filter((icon) => icon.name !== currentIcon.name)
    .map((icon) => ({
      icon,
      score: icon.keywords.filter((k) => currentKeywords.has(k)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.icon);
};

const generateHomePage = (): string => {
  const iconsList = ICON_MANIFEST.map(
    (icon) =>
      `- [${icon.name}](${SITE.URL}/icons/${icon.name}) - Keywords: ${icon.keywords.slice(0, 5).join(", ")}`
  ).join("\n");

  return `# ${SITE.NAME} - Home

> Beautifully animated Heroicons for Vue

## About

${SITE.NAME} is an open-source (MIT License) collection of ${ICON_MANIFEST.length} beautifully animated icons built with Motion for Vue and Heroicons for Vue.

## Quick Links

- Website: ${SITE.URL}
- GitHub: ${LINK.GITHUB}
- License: ${LINK.LICENSE}
- Sponsor: ${LINK.SPONSOR}

## Package

- Package: "@heroicons-animated/vue"
- Peer dependencies: "vue", "motion"
- Supports: Vue 3 and Nuxt

## Installation

\`\`\`bash
npm install @heroicons-animated/vue motion
\`\`\`

## Copy-paste via shadcn-vue

\`\`\`bash
npx shadcn-vue@latest add @heroicons-animated/vue/{icon-name}
\`\`\`

Replace {icon-name} with the desired icon name (kebab-case).

## All Icons (${ICON_MANIFEST.length} total)

${iconsList}

## Features

- ${ICON_MANIFEST.length} animated icons
- Vue 3 support
- Smooth animations powered by Motion for Vue
- Fully customizable (size, color via class)
- Tree-shakable imports
- TypeScript support
- MIT licensed
- Copy-paste ready

## Author

${SITE.AUTHOR.NAME} - ${LINK.TWITTER}
`;
};

const generateIconPage = (slug: string): string | null => {
  const icon = getIconBySlug(slug);

  if (!icon) {
    return null;
  }

  const pascalName = kebabToPascalCase(slug);
  const similarIcons = getSimilarIcons(icon);

  return `# ${pascalName}

> Animated ${icon.name.replace(/-/g, " ")} icon for Vue

## Overview

- **Name**: ${pascalName}
- **Slug**: ${icon.name}
- **Page URL**: ${SITE.URL}/icons/${slug}
- **License**: MIT

## Keywords

${icon.keywords.map((k) => `- ${k}`).join("\n")}

## Installation

\`\`\`bash
npm install @heroicons-animated/vue motion
\`\`\`

\`\`\`vue
<script setup>
import { ${pascalName}Icon } from "@heroicons-animated/vue";
</script>
<template>
  <${pascalName}Icon class="size-6" />
</template>
\`\`\`

### Copy-paste via shadcn-vue

\`\`\`bash
npx shadcn-vue@latest add @heroicons-animated/vue/${slug}
\`\`\`

## Similar Icons

${similarIcons.length > 0 ? similarIcons.map((i) => `- [${kebabToPascalCase(i.name)}](${SITE.URL}/icons/${i.name})`).join("\n") : "No similar icons found."}

## Links

- [All Icons](${SITE.URL})
- [GitHub](${LINK.GITHUB})
- [License](${LINK.LICENSE})
`;
};

const generateNotFound = (path: string): string => `# Page Not Found

The page "${path}" was not found.

## Available Pages

- [Home](${SITE.URL})
- [All Icons](${SITE.URL}/#icons)
- [GitHub](${LINK.GITHUB})
`;

export default defineEventHandler((event) => {
  const pathname = getRequestURL(event).pathname;

  const isMdRequest =
    pathname.endsWith(".md") || pathname.startsWith("/llms.md");

  if (!isMdRequest) {
    return;
  }

  let content: string;
  let status = 200;

  if (
    pathname === "/.md" ||
    pathname === "/page.md" ||
    pathname === "/index.md" ||
    pathname === "/llms.md" ||
    pathname === "/llms.md/" ||
    pathname === "/llms.md/page"
  ) {
    content = generateHomePage();
  } else if (
    pathname.startsWith("/icons/") &&
    (pathname.endsWith(".md") || pathname.startsWith("/llms.md/icons/"))
  ) {
    const slug = pathname.endsWith(".md")
      ? pathname.slice(7, -3)
      : pathname.replace("/llms.md/icons/", "");
    const iconContent = generateIconPage(slug);
    if (iconContent) {
      content = iconContent;
    } else {
      content = generateNotFound(`/icons/${slug}`);
      status = 404;
    }
  } else if (pathname.startsWith("/llms.md/")) {
    content = generateNotFound(pathname.replace("/llms.md", ""));
    status = 404;
  } else if (pathname.endsWith(".md")) {
    content = generateNotFound(pathname.slice(0, -3));
    status = 404;
  } else {
    content = generateNotFound(pathname);
    status = 404;
  }

  setResponseHeader(event, "Content-Type", "text/markdown; charset=utf-8");
  event.node.res.statusCode = status;
  return content;
});
