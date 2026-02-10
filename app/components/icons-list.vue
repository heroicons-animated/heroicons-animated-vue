<script setup lang="ts">
  import Fuse from "fuse.js";
  import { computed, ref, watch } from "vue";
  import { useRoute, useRouter } from "#imports";
  import { ICON_MANIFEST } from "~/lib/manifest";
  import { DEFAULT_FRAMEWORK } from "~/lib/framework";
  import { useFramework } from "~/lib/framework";
  import SearchInput from "~/components/search-input.vue";
  import IconCard from "~/components/icon-card.vue";

  const route = useRoute();
  const router = useRouter();
  const { framework } = useFramework();

  const query = ref(
    typeof route.query.search === "string" ? route.query.search : ""
  );

  watch(
    () => route.query.search,
    (value) => {
      const next = typeof value === "string" ? value : "";
      if (next !== query.value) {
        query.value = next;
      }
    }
  );

  watch(query, (value) => {
    if (process.server) {
      return;
    }
    const current =
      typeof route.query.search === "string" ? route.query.search : "";
    if (current === value) {
      return;
    }

    const nextQuery: Record<string, string> = {};
    for (const [key, val] of Object.entries(route.query)) {
      if (typeof val === "string") {
        nextQuery[key] = val;
      }
    }

    if (value.trim().length === 0) {
      nextQuery.search = undefined;
    } else {
      nextQuery.search = value;
    }

    router.replace({ query: nextQuery });
  });

  const fuse = new Fuse(ICON_MANIFEST, {
    keys: [
      { name: "name", weight: 3 },
      { name: "keywords", weight: 2 },
    ],
    threshold: 0.3,
    ignoreLocation: true,
    findAllMatches: true,
    isCaseSensitive: false,
    minMatchCharLength: 2,
  });

  const filteredIcons = computed(() => {
    if (!query.value.trim()) {
      return ICON_MANIFEST;
    }
    return fuse.search(query.value).map((result) => result.item);
  });

  const getIconHref = (name: string) => {
    if (framework.value === DEFAULT_FRAMEWORK) {
      return `/icons/${name}`;
    }
    return {
      path: `/icons/${name}`,
      query: { framework: framework.value },
    };
  };
</script>

<template>
  <SearchInput
    v-model="query"
    :result-count="filteredIcons.length"
    :total-count="ICON_MANIFEST.length"
  />
  <div
    class="view-container grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2 border-neutral-200 pt-2 pb-[60px] xl:border-x dark:border-neutral-800"
  >
    <div
      v-if="filteredIcons.length === 0"
      class="col-span-full pt-10 text-center text-neutral-500 text-sm"
    >
      No icons found
    </div>
    <NuxtLink
      v-for="icon in filteredIcons"
      :key="icon.name"
      :to="getIconHref(icon.name)"
      class="rounded-[20px] focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-2"
    >
      <IconCard :name="icon.name" />
    </NuxtLink>
  </div>
</template>
