<script setup lang="ts">
  import { useAttrs } from "vue";
  import { cn } from "~/lib/utils";

  defineOptions({ inheritAttrs: false });

  const attrs = useAttrs();
</script>

<template>
  <div
    :class="cn('inline-flex items-center gap-1', attrs.class)"
    v-bind="attrs"
  >
    <slot />
  </div>
</template>
