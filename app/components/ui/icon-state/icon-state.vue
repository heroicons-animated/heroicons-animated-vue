<script setup lang="ts">
  import {
    ArrowPathIcon,
    CheckIcon,
    XMarkIcon,
  } from "@heroicons/vue/24/outline";
  import { AnimatePresence, Motion } from "motion-v";
  import { computed, onBeforeUnmount, ref, watch } from "vue";
  import type { IconStatus } from "~/types";

  const DEFAULT_LOADING_DELAY = 150;

  const props = withDefaults(
    defineProps<{
      status?: IconStatus;
      loadingDelay?: number;
    }>(),
    {
      status: "idle",
      loadingDelay: DEFAULT_LOADING_DELAY,
    }
  );

  const showLoading = ref(false);
  let loadingTimer: ReturnType<typeof setTimeout> | undefined;

  const clearLoadingTimer = () => {
    if (loadingTimer) {
      clearTimeout(loadingTimer);
      loadingTimer = undefined;
    }
  };

  watch(
    () => props.status,
    (status) => {
      clearLoadingTimer();
      if (status === "loading") {
        loadingTimer = setTimeout(() => {
          showLoading.value = true;
        }, props.loadingDelay);
      } else {
        showLoading.value = false;
      }
    },
    { immediate: true }
  );

  onBeforeUnmount(() => {
    clearLoadingTimer();
  });

  const displayStatus = computed(() => {
    if (props.status === "loading" && !showLoading.value) {
      return "idle";
    }
    return props.status;
  });

  const key = computed(() => {
    return props.status === "loading" && !showLoading.value
      ? "idle"
      : props.status;
  });
</script>

<template>
  <AnimatePresence :initial="false" mode="popLayout">
    <Motion
      :key="key"
      :initial="{ opacity: 0, scale: 0.6, filter: 'blur(3px)' }"
      :animate="{ opacity: 1, scale: 1, filter: 'blur(0px)' }"
      :exit="{ opacity: 0, scale: 0.6, filter: 'blur(3px)' }"
      :transition="{
        duration: 0.1,
        ease: 'easeOut',
      }"
      class="flex items-center justify-center [&>svg]:size-4 [&>svg]:shrink-0"
    >
      <ArrowPathIcon
        v-if="displayStatus === 'loading'"
        aria-hidden="true"
        class="animate-spin"
      />
      <CheckIcon
        v-else-if="displayStatus === 'done'"
        aria-hidden="true"
        class="text-green-600"
      />
      <XMarkIcon
        v-else-if="displayStatus === 'error'"
        aria-hidden="true"
        class="text-red-500"
      />
      <slot v-else />
    </Motion>
  </AnimatePresence>
</template>
