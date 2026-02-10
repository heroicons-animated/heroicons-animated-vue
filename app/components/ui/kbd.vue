<script setup lang="ts">
  import { useAttrs } from "vue";
  import { cn } from "~/lib/utils";

  defineOptions({ inheritAttrs: false });

  const attrs = useAttrs();
</script>

<template>
  <kbd
    :class="cn(
      'pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-muted px-1 font-medium font-sans text-neutral-400 text-xs dark:text-neutral-500',
      `inline-svg:not([class*='size-'])]:size-3`,
      'in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10',
      attrs.class
    )"
    data-slot="kbd"
    v-bind="attrs"
  >
    <slot />
  </kbd>
</template>
