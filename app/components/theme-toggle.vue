<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref } from "vue";
  import MoonIcon from "@heroicons-animated/vue/moon";
  import SunIcon from "@heroicons-animated/vue/sun";
  import { useColorMode } from "#imports";
  import type { AnimatedIconInstance } from "~/types";

  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === "dark");

  const sunRef = ref<AnimatedIconInstance | null>(null);
  const moonRef = ref<AnimatedIconInstance | null>(null);

  const ICON_VARIANTS = {
    initial: { opacity: 0, scale: 0.6, filter: "blur(3px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.6, filter: "blur(3px)" },
  };

  const ICON_TRANSITION = { duration: 0.15, ease: "ease-out" } as const;

  const toggleTheme = () => {
    colorMode.preference = isDark.value ? "light" : "dark";
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if ((event.metaKey || event.ctrlKey) && key === "u") {
      event.preventDefault();
      toggleTheme();
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  onBeforeUnmount(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.removeEventListener("keydown", handleKeydown);
  });

  const nextThemeLabel = computed(() =>
    isDark.value ? "Switch to light mode" : "Switch to dark mode"
  );

  const handleMouseEnter = () => {
    sunRef.value?.setControlled?.(true);
    moonRef.value?.setControlled?.(true);
    sunRef.value?.startAnimation?.();
    moonRef.value?.startAnimation?.();
  };

  const handleMouseLeave = () => {
    sunRef.value?.setControlled?.(false);
    moonRef.value?.setControlled?.(false);
    sunRef.value?.stopAnimation?.();
    moonRef.value?.stopAnimation?.();
  };

  const applyVariant = (
    el: HTMLElement,
    variant: typeof ICON_VARIANTS.initial
  ) => {
    el.style.opacity = `${variant.opacity}`;
    el.style.transform = `scale(${variant.scale})`;
    el.style.filter = variant.filter;
  };

  const applyTransition = (el: HTMLElement) => {
    el.style.willChange = "transform, opacity, filter";
    el.style.transition = `transform ${ICON_TRANSITION.duration}s ${ICON_TRANSITION.ease}, opacity ${ICON_TRANSITION.duration}s ${ICON_TRANSITION.ease}, filter ${ICON_TRANSITION.duration}s ${ICON_TRANSITION.ease}`;
  };

  const handleBeforeEnter = (el: Element) => {
    const node = el as HTMLElement;
    node.style.transition = "none";
    applyVariant(node, ICON_VARIANTS.initial);
  };

  const handleEnter = (el: Element, done: () => void) => {
    const node = el as HTMLElement;
    requestAnimationFrame(() => {
      applyTransition(node);
      applyVariant(node, ICON_VARIANTS.animate);
      window.setTimeout(done, ICON_TRANSITION.duration * 1000);
    });
  };

  const handleLeave = (el: Element, done: () => void) => {
    const node = el as HTMLElement;
    applyTransition(node);
    applyVariant(node, ICON_VARIANTS.exit);
    window.setTimeout(done, ICON_TRANSITION.duration * 1000);
  };
</script>

<template>
  <button
    :aria-label="nextThemeLabel"
    :aria-pressed="isDark"
    class="supports-[corner-shape:squircle]:corner-squircle flex size-9 cursor-pointer items-center justify-center rounded-[14px] bg-white focus-within:outline-offset-2 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[20px] dark:bg-white/10"
    @click="toggleTheme"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    type="button"
  >
    <Transition
      :css="false"
      mode="out-in"
      @before-enter="handleBeforeEnter"
      @enter="handleEnter"
      @leave="handleLeave"
    >
      <span
        :key="isDark ? 'moon' : 'sun'"
        class="flex items-center justify-center"
      >
        <MoonIcon v-if="isDark" ref="moonRef" aria-hidden="true" :size="16" />
        <SunIcon v-else ref="sunRef" aria-hidden="true" :size="16" />
      </span>
    </Transition>
  </button>
</template>
