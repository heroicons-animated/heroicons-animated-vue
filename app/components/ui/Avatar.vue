<script setup lang="ts">
import { computed, provide, ref, useAttrs } from "vue";
import { cn } from "~/lib/utils";
import { avatarContextKey } from "./avatar-context";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
  }>(),
  {
    size: "md",
  }
);

const attrs = useAttrs();
const imageLoaded = ref(false);

const setImageLoaded = (value: boolean) => {
  imageLoaded.value = value;
};

provide(avatarContextKey, { imageLoaded, setImageLoaded });

const sizeClass = computed(() => {
  if (props.size === "sm") return "size-7 text-sm";
  if (props.size === "lg") return "size-12 text-lg";
  return "size-10";
});
</script>

<template>
  <div
    :class="cn('relative flex shrink-0 overflow-hidden rounded-full', sizeClass, attrs.class)"
    v-bind="attrs"
  >
    <slot />
  </div>
</template>
