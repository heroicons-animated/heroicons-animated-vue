<script setup lang="ts">
  import { computed, provide, ref, watch, useAttrs } from "vue";
  import { cn } from "~/lib/utils";
  import { tabsContextKey } from "./tabs-context";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<{
      modelValue?: string;
      defaultValue?: string;
    }>(),
    {
      defaultValue: "",
    }
  );

  const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
    (e: "value-change", value: string): void;
  }>();

  const attrs = useAttrs();
  const internalValue = ref(props.modelValue ?? props.defaultValue ?? "");

  watch(
    () => props.modelValue,
    (value) => {
      if (value !== undefined) {
        internalValue.value = value;
      }
    }
  );

  const value = computed(() =>
    props.modelValue !== undefined ? props.modelValue : internalValue.value
  );

  const setValue = (next: string) => {
    if (props.modelValue === undefined) {
      internalValue.value = next;
    }
    emit("update:modelValue", next);
    emit("value-change", next);
  };

  provide(tabsContextKey, { value, setValue });
</script>

<template>
  <div :class="cn('flex flex-col', attrs.class)" v-bind="attrs">
    <slot />
  </div>
</template>
