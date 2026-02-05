<script setup lang="ts">
import { computed, ref } from "vue";
import { ICON_MANIFEST } from "~/lib/manifest";
import { LINK } from "~/lib/constants";

const query = ref("");

const filteredIcons = computed(() => {
  const term = query.value.toLowerCase().trim();
  if (!term) {
    return ICON_MANIFEST;
  }

  const tokens = term.split(/\s+/).filter(Boolean);
  return ICON_MANIFEST.filter((icon) => {
    const haystack = [icon.name, ...icon.keywords]
      .join(" ")
      .toLowerCase();
    return tokens.every((token) => haystack.includes(token));
  });
});

const totalCount = ICON_MANIFEST.length;
const resultCount = computed(() => filteredIcons.value.length);
</script>

<template>
  <main class="page">
    <section class="hero">
      <div class="badges">
        <span class="badge accent">Nuxt 4 Demo</span>
        <span class="badge">Vue 3</span>
        <span class="badge">@vueuse/motion</span>
        <span class="badge">MIT Licensed</span>
      </div>
      <h1 class="hero-title">Heroicons Animated for Vue</h1>
      <p class="hero-subtitle">
        A motion-first icon gallery for Vue. Hover any icon to see the animation
        and use the registry endpoints to pull components into your own stack.
      </p>

      <div class="search-card">
        <input
          v-model="query"
          class="search-input"
          type="search"
          placeholder="Search icons by name, keyword, or intent"
          aria-label="Search icons"
        />
        <div class="stats">
          <span>{{ resultCount }} of {{ totalCount }} icons</span>
          <span class="code-pill"
            >pnpm add @heroicons-animated/vue @vueuse/motion</span
          >
          <span class="code-pill">/r/registry.json</span>
        </div>
      </div>
    </section>

    <h2 class="section-title">Icon Gallery</h2>

    <div v-if="filteredIcons.length" class="grid">
      <IconCard
        v-for="icon in filteredIcons"
        :key="icon.name"
        :name="icon.name"
      />
    </div>

    <div v-else class="empty">
      No icons matched your search. Try a shorter keyword like "arrow" or
      "check".
    </div>

    <div class="footer">
      <span>Made for Vue + Nuxt 4.</span>
      <a :href="LINK.HEROICONS" target="_blank" rel="noreferrer">
        Heroicons
      </a>
      <a :href="LINK.MOTION" target="_blank" rel="noreferrer">
        Motion
      </a>
      <a :href="LINK.GITHUB" target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a :href="LINK.SPONSOR" target="_blank" rel="noreferrer">
        Sponsor
      </a>
    </div>
  </main>
</template>
