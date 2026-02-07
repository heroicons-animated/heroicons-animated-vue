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
</script>

<template>
  <div v-if="isActive" :class="cn(attrs.class)" v-bind="attrs">
    <slot />
  </div>
</template>
