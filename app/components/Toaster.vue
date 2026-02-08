<script setup lang="ts">
  import { computed } from "vue";
  import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XMarkIcon,
  } from "@heroicons/vue/24/outline";
  import { removeToast, toasts, type ToastItem } from "~/lib/toast";
  import { cn } from "~/lib/utils";

  const iconMap = {
    info: InformationCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: XMarkIcon,
  };

  const iconClasses: Record<ToastItem["type"], string> = {
    info: "text-neutral-500 dark:text-neutral-400",
    success: "text-green-600 dark:text-green-400",
    warning: "text-yellow-500 dark:text-yellow-400",
    error: "text-red-600 dark:text-red-400",
  };

  const items = computed(() => toasts.value);

  const handleActionClick = (toast: ToastItem) => {
    toast.action?.onClick();
    removeToast(toast.id);
  };
</script>

<template>
  <div
    class="pointer-events-none fixed top-4 left-1/2 z-[9999] w-full max-w-[420px] -translate-x-1/2 px-4"
  >
    <TransitionGroup name="toast" tag="div" class="flex flex-col gap-2">
      <div
        v-for="toast in items"
        :key="toast.id"
        class="pointer-events-auto flex w-full flex-wrap gap-0 border border-neutral-900/5 bg-white px-4 py-4 shadow-lg dark:border-neutral-100/10 dark:bg-black supports-[corner-shape:squircle]:corner-squircle rounded-[14px] supports-[corner-shape:squircle]:rounded-[30px]"
      >
        <component
          :is="iconMap[toast.type]"
          :class="cn('size-4 shrink-0 translate-y-[-9.5px]', iconClasses[toast.type])"
        />
        <div class="ml-3 flex w-full flex-1 flex-col">
          <p class="font-sans text-black text-sm dark:text-white">
            {{ toast.title }}
          </p>
          <p
            v-if="toast.description"
            class="font-sans text-secondary text-sm dark:text-secondary"
          >
            {{ toast.description }}
          </p>
          <button
            v-if="toast.action"
            class="mt-2 flex h-8 w-full items-center justify-center rounded-[14px] bg-primary font-sans text-[14px] text-white transition-colors duration-100 hover:bg-[color-mix(in_oklab,var(--color-primary),black_10%)] focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-primary supports-[corner-shape:squircle]:corner-squircle supports-[corner-shape:squircle]:rounded-[30px]"
            type="button"
            @click="handleActionClick(toast)"
          >
            {{ toast.action.label }}
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
