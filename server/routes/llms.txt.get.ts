import { defineEventHandler, setResponseHeader } from "h3";
import { LINK, SITE } from "~/lib/constants";
import { ICON_MANIFEST } from "~/lib/manifest";

export default defineEventHandler((event) => {
  const iconNames = ICON_MANIFEST.map((icon) => icon.name).join(", ");

  const content = `# ${SITE.NAME}

> Beautifully animated Heroicons for Vue

${SITE.NAME} is an open-source (MIT License) collection of smooth animated ${ICON_MANIFEST.length} icons for Vue projects.

## Overview

- Website: ${SITE.URL}
- GitHub: ${LINK.GITHUB}
- Author: ${SITE.AUTHOR.TWITTER} (${LINK.TWITTER})

## Packages

| Package | Framework | Animation Engine |
|---------|-----------|------------------|
| @heroicons-animated/vue | Vue 3 / Nuxt | Motion for Vue |

## Installation

\`\`\`bash
npm install @heroicons-animated/vue motion
\`\`\`

\`\`\`vue
<script setup>
import { BeakerIcon } from '@heroicons-animated/vue'
</script>
<template>
  <BeakerIcon class="size-6" />
</template>
\`\`\`

### Copy-paste via shadcn-vue

\`\`\`bash
npx shadcn-vue@latest add @heroicons-animated/vue/{icon-name}
\`\`\`

Replace {icon-name} with the desired icon name (kebab-case).

## Available Icons (${ICON_MANIFEST.length} total)

${iconNames}

## Icon Page URLs

Each icon has a dedicated page at: ${SITE.URL}/icons/{icon-name}

For example:
- ${SITE.URL}/icons/beaker
- ${SITE.URL}/icons/academic-cap
- ${SITE.URL}/icons/arrow-down

## License

MIT License - free for personal and commercial use.

## Contributing

Contributions welcome! See ${LINK.GITHUB}/blob/main/CONTRIBUTING.md for guidelines.
`;

  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
  return content;
});
