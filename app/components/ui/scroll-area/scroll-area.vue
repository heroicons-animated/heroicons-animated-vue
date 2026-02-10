<script setup lang="ts">
  import type { ScrollAreaRootProps, ScrollAreaScrollbarProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";
  import { reactiveOmit } from "@vueuse/core";
  import {
    ScrollAreaCorner,
    ScrollAreaRoot,
    ScrollAreaViewport,
  } from "reka-ui";
  import { cn } from "@/lib/utils";
  import ScrollBar from "./scroll-bar.vue";

  const props = defineProps<
    ScrollAreaRootProps & {
      class?: HTMLAttributes["class"];
      orientation?: ScrollAreaScrollbarProps["orientation"];
      scrollbarClasses?: string;
    }
  >();

  const delegatedProps = reactiveOmit(
    props,
    "class",
    "orientation",
    "scrollbarClasses"
  );
</script>

<template>
  <ScrollAreaRoot
    v-bind="delegatedProps"
    :class="cn('relative overflow-hidden', props.class)"
  >
    <ScrollAreaViewport class="h-full w-full rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar
      :orientation="props.orientation"
      :class="props.scrollbarClasses"
    />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
