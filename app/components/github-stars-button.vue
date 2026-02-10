<script setup lang="ts">
  import { useFetch } from "#imports";
  import { computed, ref } from "vue";
  import StarIcon from "@heroicons-animated/vue/star";
  import { LINK } from "~/lib/constants";

  interface StarsResponse {
    stars: number | null;
  }

  const { data } = await useFetch<StarsResponse>("/api/github-stars");
  const stars = computed(() => data.value?.stars ?? null);
  const starRef = ref<InstanceType<typeof StarIcon> | null>(null);

  const handleMouseEnter = () => {
    starRef.value?.startAnimation?.();
  };

  const handleMouseLeave = () => {
    starRef.value?.stopAnimation?.();
  };
</script>

<template>
  <a
    :aria-label="`Star on GitHub${stars !== null ? ` (${stars.toLocaleString()} stars)` : ''}`"
    class="group supports-[corner-shape:squircle]:corner-squircle flex size-9 items-center justify-center gap-2 rounded-[14px] bg-white focus-within:outline-offset-2 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[20px] sm:size-auto sm:px-2.5 sm:py-2 dark:bg-white/10"
    :href="LINK.GITHUB"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    rel="noopener noreferrer"
    tabIndex="0"
    target="_blank"
  >
    <svg
      aria-hidden="true"
      class="size-4"
      fill="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
      />
    </svg>
    <span
      v-if="stars !== null"
      aria-hidden="true"
      class="hidden font-sans text-black text-sm tabular-nums tracking-[-0.4px] [text-shadow:-0.1px_0_0_currentColor,0.1px_0_0_currentColor] sm:inline dark:text-white"
    >
      {{ stars.toLocaleString() }}
    </span>
    <span
      v-else
      aria-hidden="true"
      class="hidden h-4 w-10 rounded bg-neutral-200/70 sm:inline-block dark:bg-neutral-700/60 animate-pulse"
    ></span>
    <StarIcon
      ref="starRef"
      aria-hidden="true"
      class="hidden text-neutral-400 transition-colors duration-100 sm:block group-hover:text-[#e3b341]"
      :size="13"
    />
  </a>
</template>
