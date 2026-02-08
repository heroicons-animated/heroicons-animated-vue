<script setup lang="ts">
  import { computed, inject, useAttrs } from "vue";
  import { cn } from "~/lib/utils";
  import { avatarContextKey } from "./avatar-context";

  defineOptions({ inheritAttrs: false });

  const attrs = useAttrs();
  const ctx = inject(avatarContextKey);
  const showFallback = computed(() => !ctx?.imageLoaded.value);
</script>

<template>
  <div
    v-if="showFallback"
    :class="cn(
      'absolute inset-0 flex size-full select-none items-center justify-center rounded-full bg-muted',
      attrs.class
    )"
    v-bind="attrs"
  >
    <slot />
  </div>
</template>
