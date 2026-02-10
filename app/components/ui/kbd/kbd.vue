<script setup lang="ts">
  import type { HTMLAttributes } from "vue";
  import { cn } from "@/lib/utils";

  const props = defineProps<{
    class?: HTMLAttributes["class"];
  }>();
</script>

<template>
  <kbd
    :class="cn(
      'pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-neutral-100 px-1 font-medium font-sans text-neutral-400 text-xs dark:bg-neutral-800 dark:text-neutral-500',
      '[&_svg:not([class*=\'size-\'])]:size-3',
      'in-data-[slot=tooltip-content]:bg-white/20 in-data-[slot=tooltip-content]:text-white dark:in-data-[slot=tooltip-content]:bg-white/10 dark:in-data-[slot=tooltip-content]:text-neutral-950',
      props.class,
    )"
  >
    <slot />
  </kbd>
</template>
