<script setup lang="ts">
import { provide } from "vue";
import { tooltipProviderKey } from "./tooltip-provider-context";

const props = withDefaults(
  defineProps<{
    delay?: number;
    closeDelay?: number;
  }>(),
  {
    delay: 150,
    closeDelay: 200,
  }
);

provide(tooltipProviderKey, {
  delay: props.delay,
  closeDelay: props.closeDelay,
});
</script>

<template>
  <slot />
</template>
