<script setup lang="ts">
  import { useHead, useSeoMeta } from "#imports";
  import { ICON_MANIFEST } from "~/lib/manifest";
  import { LINK, SITE } from "~/lib/constants";
  import CliBlock from "~/components/cli-block.vue";
  import CommentBlock from "~/components/comment-block.vue";
  import IconsList from "~/components/icons-list.vue";

  const homeTitle = `${SITE.NAME} | Free Animated Heroicons for Vue`;

  useSeoMeta({
    title: homeTitle,
    description: SITE.DESCRIPTION.LONG,
    keywords: SITE.KEYWORDS.join(", "),
    ogTitle: homeTitle,
    ogDescription: SITE.DESCRIPTION.SHORT,
    ogUrl: SITE.URL,
    twitterTitle: homeTitle,
    twitterDescription: SITE.DESCRIPTION.SHORT,
  });

  useHead({
    link: [{ rel: "canonical", href: SITE.URL }],
  });
</script>

<template>
  <section
    class="view-container flex flex-col items-center justify-center border-neutral-200 px-0 pt-[60px] xl:border-x dark:border-neutral-800"
    id="hero"
  >
    <h1 class="px-4 text-center font-sans text-[32px] min-[640px]:text-[42px]">
      Beautifully animated heroicons for Vue<span class="text-primary">^</span>
    </h1>
    <p
      class="mt-5 max-w-[582px] px-4 text-center font-mono text-secondary text-sm"
    >
      an open-source (<a
        class="underline underline-offset-3 transition-[decoration-color] duration-100 focus-within:outline-offset-0 hover:decoration-primary focus-visible:outline-1 focus-visible:outline-primary"
        :href="`${LINK.GITHUB}/blob/main/LICENSE`"
        rel="noopener noreferrer"
        tabIndex="0"
        target="_blank"
        >MIT License</a
      >) collection of smooth animated <br>
      316 icons for your projects. feel free to use them, share your feedback,
      and let's make this library awesome together!
    </p>
    <p class="mt-4 font-mono text-secondary text-xs min-[640px]:text-sm">
      Crafted with
      <a
        class="bg-[#E5E5E5] px-2 py-0.5 text-primary focus-within:outline-offset-1 focus-visible:outline-1 focus-visible:outline-primary dark:bg-[#262626]"
        :href="LINK.MOTION"
        rel="noopener noreferrer"
        tabIndex="0"
        target="_blank"
        >Motion for Vue</a
      >
      &
      <a
        class="bg-[#E5E5E5] px-2 py-0.5 text-primary focus-within:outline-offset-1 focus-visible:outline-1 focus-visible:outline-primary dark:bg-[#262626]"
        :href="LINK.HEROICONS"
        rel="noopener noreferrer"
        tabIndex="0"
        target="_blank"
      >
        Heroicons
      </a>
    </p>
    <CliBlock :icons="ICON_MANIFEST" />
    <CommentBlock />
  </section>
  <section id="icons">
    <IconsList />
  </section>
</template>
