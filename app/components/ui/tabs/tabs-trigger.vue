<script setup lang="ts">
  import type { TabsTriggerProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";
  import { reactiveOmit } from "@vueuse/core";
  import { TabsTrigger, useForwardProps } from "reka-ui";
  import { cn } from "@/lib/utils";

  const props = defineProps<
    TabsTriggerProps & { class?: HTMLAttributes["class"] }
  >();

  const delegatedProps = reactiveOmit(props, "class");

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="cn(
      'inline-flex items-center justify-center whitespace-nowrap bg-white px-4 py-1 font-mono text-black text-sm tracking-[-0.39px] transition-[background-color] duration-50 hover:bg-neutral-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/5',
      'first:rounded-tl-[8px] last:rounded-tr-[8px]',
      'supports-[corner-shape:squircle]:first:corner-tl-squircle supports-[corner-shape:squircle]:first:rounded-tl-[14px]',
      'supports-[corner-shape:squircle]:last:corner-tr-squircle supports-[corner-shape:squircle]:last:rounded-tr-[14px]',
      'focus-within:outline-offset-0 focus-visible:outline-1 focus-visible:outline-primary',
      'data-[state=active]:bg-primary data-[state=active]:text-white dark:data-[state=active]:bg-primary',
      props.class,
    )"
  >
    <span class="truncate">
      <slot />
    </span>
  </TabsTrigger>
</template>
