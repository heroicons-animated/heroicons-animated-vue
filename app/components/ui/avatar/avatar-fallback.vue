<script setup lang="ts">
  import type { HTMLAttributes } from "vue";
  import type { AvatarFallbackProps } from "reka-ui";
  import { AvatarFallback } from "reka-ui";
  import { reactiveOmit } from "@vueuse/core";
  import { cn } from "@/lib/utils";

  const props = defineProps<
    AvatarFallbackProps & { class?: HTMLAttributes["class"] }
  >();

  const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <AvatarFallback
    :class="cn('bg-neutral-200 dark:bg-neutral-800 flex size-full select-none items-center justify-center',props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </AvatarFallback>
</template>
