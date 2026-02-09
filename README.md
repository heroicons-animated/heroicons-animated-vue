# @heroicons-animated/vue

Beautifully animated [Heroicons](https://heroicons.com) for Vue, built with [Motion for Vue (`motion-v`)](https://motion.dev/docs/vue).

## Installation

```bash
npm install @heroicons-animated/vue motion-v
pnpm add @heroicons-animated/vue motion-v
yarn add @heroicons-animated/vue motion-v
bun add @heroicons-animated/vue motion-v
```

## Add Icons with shadcn-vue CLI

```bash
npx shadcn-vue@latest add @heroicons-animated/vue/beaker
pnpm dlx shadcn-vue@latest add @heroicons-animated/vue/beaker
yarn dlx shadcn-vue@latest add @heroicons-animated/vue/beaker
bunx shadcn-vue@latest add @heroicons-animated/vue/beaker
```

## Usage

```vue
<script setup>
import { BeakerIcon } from "@heroicons-animated/vue";
</script>

<template>
  <BeakerIcon class="size-6" />
</template>
```

### Tree-shakable Imports

Import individual icons to reduce bundle size:

```vue
<script setup>
import BeakerIcon from "@heroicons-animated/vue/beaker";
</script>
```

## Requirements

- Vue 3.0+
- motion-v 1.10+

## Documentation

Visit [heroicons-animated.com](https://www.heroicons-animated.com) for the full documentation and icon gallery.

## License

MIT
