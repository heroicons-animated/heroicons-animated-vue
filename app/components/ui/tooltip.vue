<script setup lang="ts">
  import { inject, onBeforeUnmount, provide, ref } from "vue";
  import { tooltipProviderKey } from "./tooltip-provider-context";
  import { tooltipContextKey } from "./tooltip-context";

  const provider = inject(tooltipProviderKey, { delay: 150, closeDelay: 200 });

  const open = ref(false);
  const triggerRef = ref<HTMLElement | null>(null);

  let openTimeout: number | undefined;
  let closeTimeout: number | undefined;

  const clearOpen = () => {
    if (openTimeout) {
      clearTimeout(openTimeout);
      openTimeout = undefined;
    }
  };

  const clearClose = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = undefined;
    }
  };

  const setOpen = (value: boolean) => {
    open.value = value;
  };

  const openWithDelay = () => {
    clearClose();
    clearOpen();
    openTimeout = window.setTimeout(() => {
      open.value = true;
    }, provider.delay);
  };

  const closeWithDelay = () => {
    clearOpen();
    clearClose();
    closeTimeout = window.setTimeout(() => {
      open.value = false;
    }, provider.closeDelay);
  };

  onBeforeUnmount(() => {
    clearOpen();
    clearClose();
  });

  provide(tooltipContextKey, {
    open,
    setOpen,
    openWithDelay,
    closeWithDelay,
    triggerRef,
  });
</script>

<template>
  <div class="relative inline-flex">
    <slot />
  </div>
</template>
