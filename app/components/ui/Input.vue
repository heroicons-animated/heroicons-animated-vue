<script setup lang="ts">
  import { computed, ref, useAttrs, useSlots } from "vue";
  import { cn } from "~/lib/utils";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<{
      modelValue?: string;
      inputContainerClass?: string;
      type?: string;
      disabled?: boolean;
    }>(),
    {
      type: "text",
    }
  );

  const emit = defineEmits<(e: "update:modelValue", value: string) => void>();

  const attrs = useAttrs();
  const slots = useSlots();
  const inputRef = ref<HTMLInputElement | null>(null);

  const hasLeading = computed(() => !!slots.leading);
  const hasTrailing = computed(() => !!slots.trailing);

  const onInput = (event: Event) => {
    emit("update:modelValue", (event.target as HTMLInputElement).value);
  };

  defineExpose({
    focus: () => inputRef.value?.focus(),
    blur: () => inputRef.value?.blur(),
  });
</script>

<template>
  <div
    :class="cn(
      'group relative w-full data-disabled:pointer-events-none',
      props.inputContainerClass
    )"
    :data-disabled="props.disabled ? '' : undefined"
    data-slot="input-container"
  >
    <span
      v-if="hasLeading"
      class="pointer-events-none absolute top-1/2 left-3 inline-flex shrink-0 -translate-y-1/2 [&_svg]:shrink-0"
      data-slot="input-leading-icon"
    >
      <slot name="leading" />
    </span>
    <input
      ref="inputRef"
      v-bind="attrs"
      :type="props.type"
      :value="props.modelValue"
      :disabled="props.disabled"
      @input="onInput"
      :class="cn(
        'flex h-9 w-full min-w-0 px-3 py-1 text-sm outline-none ring-1',
        'bg-neutral-100 text-neutral-800 ring-neutral-200 selection:bg-primary selection:text-white placeholder:text-neutral-400/70 dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-800',
        'transition-[color,box-shadow,ring-color]',
        'focus-visible:ring-primary dark:focus-visible:ring-primary',
        'supports-[corner-shape:squircle]:corner-squircle rounded-[14px] supports-[corner-shape:squircle]:rounded-[24px]',
        hasLeading ? 'pl-10' : undefined,
        hasTrailing ? 'pr-12' : undefined,
        (attrs as any).class
      )"
      data-slot="input"
    >
    <span
      v-if="hasTrailing"
      class="pointer-events-none absolute top-1/2 right-3 inline-flex shrink-0 -translate-y-1/2 [&_svg]:shrink-0"
      data-slot="input-trailing-icon"
    >
      <slot name="trailing" />
    </span>
  </div>
</template>
