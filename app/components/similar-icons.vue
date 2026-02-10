<script setup lang="ts">
  import { computed } from "vue";
  import { ICON_MANIFEST, type IconManifestItem } from "~/lib/manifest";
  import IconCard from "~/components/icon-card.vue";

  const props = defineProps<{
    currentIcon: IconManifestItem;
  }>();

  const similarIcons = computed(() => {
    const currentKeywords = new Set(props.currentIcon.keywords);

    const scored = ICON_MANIFEST.filter(
      (icon) => icon.name !== props.currentIcon.name
    )
      .map((icon) => ({
        icon,
        score: icon.keywords.filter((kw) => currentKeywords.has(kw)).length,
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    return scored.map((item) => item.icon);
  });

  const getIconHref = (name: string) => `/icons/${name}`;
</script>

<template>
  <div
    v-if="similarIcons.length === 0"
    class="view-container flex-1 border-neutral-200 pb-[60px] xl:border-x dark:border-neutral-800"
  />
  <div
    v-else
    class="view-container border-neutral-200 pt-12 pb-[60px] xl:border-x xl:pt-4 dark:border-neutral-800"
  >
    <h2 class="mb-4 font-sans text-xl">Similar Icons</h2>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
      <NuxtLink
        v-for="icon in similarIcons"
        :key="icon.name"
        :to="getIconHref(icon.name)"
        class="rounded-[20px] focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-2"
      >
        <IconCard :name="icon.name" :show-actions="false" />
      </NuxtLink>
    </div>
  </div>
</template>
