<script setup lang="ts">
import { inject, onMounted, onUpdated, ref, useAttrs } from "vue";
import { cn } from "~/lib/utils";
import { tooltipContextKey } from "./tooltip-context";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const ctx = inject(tooltipContextKey);
const triggerRef = ref<HTMLElement | null>(null);

const syncTrigger = () => {
  if (ctx) ctx.triggerRef.value = triggerRef.value;
};

onMounted(() => {
  syncTrigger();
});

onUpdated(() => {
  syncTrigger();
});

const handleMouseEnter = () => {
  ctx?.openWithDelay();
};

const handleMouseLeave = () => {
  ctx?.closeWithDelay();
};

const handleFocus = () => {
  ctx?.openWithDelay();
};

const handleBlur = () => {
  ctx?.closeWithDelay();
};
</script>

<template>
  <button
    ref="triggerRef"
    type="button"
    :class="cn('inline-flex', attrs.class)"
    :data-tooltip-open="ctx?.open.value ? '' : undefined"
    v-bind="attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <slot />
  </button>
</template>
