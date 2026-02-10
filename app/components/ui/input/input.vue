<script setup lang="ts">
  defineOptions({
    inheritAttrs: false,
  });

  import { type HTMLAttributes, useSlots, computed, ref } from "vue";
  import { useVModel } from "@vueuse/core";
  import { cn } from "@/lib/utils";

  const props = defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    class?: HTMLAttributes["class"];
    inputContainerClass?: HTMLAttributes["class"];
    disabled?: boolean;
    type?: string;
  }>();

  const emits =
    defineEmits<(e: "update:modelValue", payload: string | number) => void>();

  const modelValue = useVModel(props, "modelValue", emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });

  const slots = useSlots();
  const hasLeading = computed(() => !!slots.leading);
  const hasTrailing = computed(() => !!slots.trailing);

  const inputRef = ref<HTMLInputElement | null>(null);

  defineExpose({
    focus: () => inputRef.value?.focus(),
    blur: () => inputRef.value?.blur(),
  });
</script>

<template>
  <div
    :class="cn('group relative w-full', props.inputContainerClass)"
    :data-disabled="props.disabled ? '' : undefined"
  >
    <span
      v-if="hasLeading"
      class="pointer-events-none absolute top-1/2 left-3 inline-flex shrink-0 -translate-y-1/2 [&_svg]:shrink-0"
    >
      <slot name="leading" />
    </span>
    <input
      ref="inputRef"
      v-model="modelValue"
      :type="props.type || 'text'"
      :disabled="props.disabled"
      :class="cn(
        'flex h-10 w-full px-3 py-2 text-sm outline-none ring-1 transition-[color,box-shadow,ring-color] disabled:cursor-not-allowed disabled:opacity-50',
        'bg-neutral-100 text-neutral-800 ring-neutral-200 selection:bg-primary selection:text-white placeholder:text-neutral-400/70 dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-800',
        'focus-visible:ring-primary dark:focus-visible:ring-primary',
        'supports-[corner-shape:squircle]:corner-squircle rounded-[14px] supports-[corner-shape:squircle]:rounded-[24px]',
        hasLeading && 'pl-10',
        hasTrailing && 'pr-12',
        props.class
      )"
      v-bind="$attrs"
    >
    <span
      v-if="hasTrailing"
      class="pointer-events-none absolute top-1/2 right-3 inline-flex shrink-0 -translate-y-1/2 [&_svg]:shrink-0"
    >
      <slot name="trailing" />
    </span>
  </div>
</template>
