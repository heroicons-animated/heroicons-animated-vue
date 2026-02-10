<script setup lang="ts">
  import {
    ArrowPathIcon,
    CheckIcon,
    XMarkIcon,
  } from "@heroicons/vue/24/outline";
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
</script>

<template>
  <Transition
    mode="out-in"
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="opacity-0 scale-[0.6] blur-[3px]"
    enter-to-class="opacity-100 scale-100 blur-0"
    leave-active-class="transition duration-100 ease-out"
    leave-from-class="opacity-100 scale-100 blur-0"
    leave-to-class="opacity-0 scale-[0.6] blur-[3px]"
  >
    <span
      :key="displayStatus"
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
    </span>
  </Transition>
</template>
