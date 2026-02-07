<script setup lang="ts">
import { inject, useAttrs } from "vue";
import { cn } from "~/lib/utils";
import { avatarContextKey } from "./avatar-context";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const ctx = inject(avatarContextKey);

const handleLoad = () => {
  ctx?.setImageLoaded(true);
};

const handleError = () => {
  ctx?.setImageLoaded(false);
};
</script>

<template>
  <img
    :class="cn('absolute inset-0 size-full object-cover', attrs.class)"
    v-bind="attrs"
    @load="handleLoad"
    @error="handleError"
  />
</template>
