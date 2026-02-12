<script setup lang="ts">
  import HomeIcon from "@heroicons-animated/vue/home.vue";
  import type { ComponentPublicInstance } from "vue";
  import { computed, ref, watch } from "vue";
  import { clearError } from "#imports";
  import Header from "~/components/header.vue";
  import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
  } from "~/components/ui/empty";

  interface HomeIconExpose {
    startAnimation: () => void;
    stopAnimation: () => void;
    setControlled: (value: boolean) => void;
  }

  const props = defineProps<{
    error: {
      statusCode?: number;
      statusMessage?: string;
      message?: string;
    };
  }>();

  const homeIconRef = ref<ComponentPublicInstance<HomeIconExpose> | null>(null);

  watch(
    homeIconRef,
    (el) => {
      el?.setControlled?.(true);
    },
    { immediate: true }
  );

  const isNotFound = computed(() => props.error?.statusCode === 404);

  const description = computed(() =>
    isNotFound.value
      ? "The page you're looking for might have been moved or doesn't exist."
      : "An unexpected error occurred. Please try again or head back home."
  );

  function onLinkMouseEnter() {
    homeIconRef.value?.startAnimation?.();
  }

  function onLinkMouseLeave() {
    homeIconRef.value?.stopAnimation?.();
  }

  async function handleGoHome() {
    await clearError({ redirect: "/" });
  }
</script>

<template>
  <Header />
  <main
    class="view-container flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center border-neutral-200 px-4 py-16 xl:border-x dark:border-neutral-800"
    role="main"
  >
    <Empty>
      <EmptyHeader>
        <EmptyTitle
          v-if="isNotFound"
          id="error-title"
          class="font-mono text-8xl"
        >
          404
        </EmptyTitle>
        <EmptyTitle
          v-else
          id="error-title"
          class="text-2xl font-semibold tracking-tight"
        >
          Something went wrong
        </EmptyTitle>
        <EmptyDescription id="error-description" class="text-secondary">
          {{ description }}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <a
          href="/"
          class="supports-[corner-shape:squircle]:corner-squircle inline-flex w-fit cursor-pointer items-center justify-center gap-1 rounded-[8px] bg-primary px-[12px] py-[4px] font-sans text-sm text-white transition-[background-color] duration-100 hover:bg-primary/90 focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-1 supports-[corner-shape:squircle]:rounded-[12px]"
          @click.prevent="handleGoHome"
          @mouseenter="onLinkMouseEnter"
          @mouseleave="onLinkMouseLeave"
        >
          <HomeIcon ref="homeIconRef" :size="14" />
          Go Home
        </a>
      </EmptyContent>
    </Empty>
  </main>
</template>
