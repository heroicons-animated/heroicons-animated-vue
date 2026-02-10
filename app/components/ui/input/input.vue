<script setup lang="ts">
  import type { HTMLAttributes } from "vue";
  import { useVModel } from "@vueuse/core";
  import { cn } from "@/lib/utils";

  const props = defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    class?: HTMLAttributes["class"];
  }>();

  const emits =
    defineEmits<(e: "update:modelValue", payload: string | number) => void>();

  const modelValue = useVModel(props, "modelValue", emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });
</script>

<template>
  <input
    v-model="modelValue"
    :class="cn(
      'flex h-10 w-full px-3 py-2 text-sm outline-none ring-1 transition-[color,box-shadow,ring-color] disabled:cursor-not-allowed disabled:opacity-50',
      'bg-neutral-100 text-neutral-800 ring-neutral-200 selection:bg-primary selection:text-white placeholder:text-neutral-400/70 dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-800',
      'focus-visible:ring-primary dark:focus-visible:ring-primary',
      'supports-[corner-shape:squircle]:corner-squircle rounded-[14px] supports-[corner-shape:squircle]:rounded-[24px]',
      props.class
    )"
  >
</template>
