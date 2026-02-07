<script setup lang="ts">
import { computed, inject, useAttrs } from "vue";
import { cn } from "~/lib/utils";
import { tabsContextKey } from "./tabs-context";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  value: string;
}>();

const attrs = useAttrs();
const ctx = inject(tabsContextKey);

const isActive = computed(() => ctx?.value.value === props.value);

const handleClick = (event: MouseEvent) => {
  ctx?.setValue(props.value);
  const onClick = (attrs as any).onClick;
  if (typeof onClick === "function") onClick(event);
};
</script>

<template>
  <button
    type="button"
    :aria-selected="isActive"
    :class="cn(
      'z-50 inline-flex cursor-pointer items-center justify-center whitespace-nowrap bg-white px-4 py-1 font-mono text-black text-sm tracking-[-0.39px] hover:bg-neutral-50 aria-selected:bg-primary aria-selected:text-white dark:bg-white/10 dark:text-white dark:aria-selected:bg-primary dark:hover:bg-white/5',
      'first:rounded-tl-[8px] last:rounded-tr-[8px]',
      'supports-[corner-shape:squircle]:first:corner-tl-squircle supports-[corner-shape:squircle]:first:rounded-tl-[14px]',
      'supports-[corner-shape:squircle]:last:corner-tr-squircle supports-[corner-shape:squircle]:last:rounded-tr-[14px]',
      'transition-[background-color] duration-50',
      'focus-within:outline-offset-0 focus-visible:outline-1 focus-visible:outline-primary',
      attrs.class
    )"
    v-bind="attrs"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
