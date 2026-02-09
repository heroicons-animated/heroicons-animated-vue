<script setup lang="ts">
  import { ref } from "vue";
  import { useMotion } from "../../src/motion";
  import GithubStarsButton from "~/components/GithubStarsButton.vue";
  import Logo from "~/components/Logo.vue";
  import ThemeToggle from "~/components/ThemeToggle.vue";
  import { LINK } from "~/lib/constants";

  const heartRef = ref<SVGSVGElement | null>(null);
  const heartMotion = useMotion(heartRef, {
    initial: { scale: 1 },
  });

  const handleMouseEnter = () => {
    heartMotion.apply({
      scale: [1, 1.08, 1],
      transition: { duration: 0.45, repeat: 2 },
    });
  };

  const handleMouseLeave = () => {
    heartMotion.apply({
      scale: 1,
      transition: { duration: 0.2 },
    });
  };
</script>

<template>
  <header
    class="h-(--header-height) border-neutral-200 xl:border-b dark:border-neutral-800"
  >
    <div
      class="view-container flex h-full w-full justify-between gap-4 border-neutral-200 xl:border-x dark:border-neutral-800"
    >
      <a
        aria-label="Heroicons Animated - Home"
        class="mr-auto flex items-center gap-2 font-sans text-base focus-within:outline-offset-4 focus-visible:outline-1 focus-visible:outline-primary max-[524px]:translate-y-[-2px] min-[395px]:text-xl"
        href="/"
        tabIndex="0"
      >
        <Logo class="w-6 text-primary min-[395px]:w-8" />
        <span class="relative inline-flex">
          heroicons-animated
          <span
            class="absolute right-0 top-full mt-0.5 flex items-center gap-1 text-[10px] font-medium text-neutral-500 dark:text-neutral-400"
          >
            - for
            <svg
              aria-hidden="true"
              class="size-3"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 221"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z"
                fill="#41B883"
              />
              <path
                d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z"
                fill="#41B883"
              />
              <path
                d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z"
                fill="#35495E"
              />
            </svg>
          </span>
        </span>
      </a>
      <div
        class="ml-auto flex w-full flex-1 flex-wrap-reverse items-center justify-end gap-2"
      >
        <a
          aria-label="Sponsor Project"
          class="supports-[corner-shape:squircle]:corner-squircle flex size-9 items-center justify-center gap-1 rounded-[14px] bg-white font-sans text-[#3F3F47] text-sm underline-offset-4 focus-within:outline-offset-2 hover:underline focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[20px] sm:size-auto sm:bg-transparent sm:pr-1 dark:bg-white/10 dark:text-[#FAFAFA] sm:dark:bg-transparent"
          :href="LINK.SPONSOR"
          tabIndex="0"
          target="_blank"
          rel="noopener noreferrer"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <svg
            ref="heartRef"
            aria-hidden="true"
            class="text-primary origin-center"
            fill="currentColor"
            height="16"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
            />
          </svg>
          <span class="hidden sm:inline">Sponsor Project</span>
        </a>
        <ThemeToggle />
        <GithubStarsButton />
      </div>
    </div>
  </header>
</template>
