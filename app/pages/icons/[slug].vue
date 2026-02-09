<script setup lang="ts">
  import { computed } from "vue";
  import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
  import {
    createError,
    useHead,
    useRoute,
    useSchemaOrg,
    useSeoMeta,
  } from "#imports";
  import CliBlock from "~/components/CliBlock.vue";
  import IconCard from "~/components/IconCard.vue";
  import SimilarIcons from "~/components/SimilarIcons.vue";
  import { LINK, SITE } from "~/lib/constants";
  import { DEFAULT_FRAMEWORK, useFramework } from "~/lib/framework";
  import { getFrameworkName } from "~/lib/cli";
  import { kebabToPascalCase } from "~/lib/kebab-to-pascal";
  import { ICON_MANIFEST } from "~/lib/manifest";

  const route = useRoute();
  const { framework } = useFramework();

  const slug = computed(() => String(route.params.slug || ""));
  const icon = computed(() =>
    ICON_MANIFEST.find((item) => item.name === slug.value)
  );

  if (!icon.value) {
    throw createError({ statusCode: 404, statusMessage: "Icon Not Found" });
  }

  const pascalName = computed(() => kebabToPascalCase(slug.value));
  const formattedName = computed(() => slug.value.replace(/-/g, " "));

  const backHref = computed(() => {
    if (framework.value === DEFAULT_FRAMEWORK) {
      return "/";
    }
    return { path: "/", query: { framework: framework.value } };
  });

  const canonicalUrl = computed(() => `${SITE.URL}/icons/${slug.value}`);

  const pageTitle = computed(() => {
    const keyword = pascalName.value.replace(/Icon$/u, "").trim();
    return `${keyword} Icon - Animated Icon for Vue`;
  });

  const pageDescription = computed(() => {
    const keywordList = icon.value?.keywords.slice(0, 5).join(", ") ?? "";
    return `Free animated ${slug.value} icon for Vue. Smooth Motion for Vue-powered Heroicons component, copy-paste ready. Keywords: ${keywordList}.`;
  });

  const pageKeywords = computed(() => {
    const iconName = icon.value?.name ?? slug.value;
    return [
      ...(icon.value?.keywords ?? []),
      "animated icon",
      "vue icon",
      "motion icon",
      `${iconName} animation`,
      `${iconName} vue`,
    ];
  });

  useSeoMeta({
    title: () => pageTitle.value,
    description: () => pageDescription.value,
    keywords: () => pageKeywords.value.join(", "),
    ogTitle: () => `${pascalName.value} | ${SITE.NAME}`,
    ogDescription: () => pageDescription.value,
    ogUrl: () => canonicalUrl.value,
    ogType: "website",
    twitterTitle: () => `${pascalName.value} | ${SITE.NAME}`,
    twitterDescription: () => pageDescription.value,
  });

  useHead(() => ({
    link: [{ rel: "canonical", href: canonicalUrl.value }],
  }));

  useSchemaOrg([
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE.URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Icons",
          item: `${SITE.URL}/icons`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: pascalName.value,
          item: canonicalUrl.value,
        },
      ],
    },
    {
      "@type": "SoftwareSourceCode",
      name: pascalName.value,
      description: `Animated ${slug.value} icon component for Vue`,
      codeRepository: LINK.GITHUB,
      programmingLanguage: ["TypeScript", "Vue", "JavaScript"],
      license: LINK.LICENSE,
      isPartOf: {
        "@type": "SoftwareSourceCode",
        name: SITE.NAME,
        url: SITE.URL,
      },
      keywords: icon.value?.keywords.join(", ") ?? "",
    },
  ]);
</script>

<template>
  <section class="flex min-h-[calc(100vh-var(--header-height))] flex-col">
    <div
      class="view-container flex flex-col items-start border-neutral-200 py-12 xl:border-x xl:pb-4 min-[880px]:pt-[60px] dark:border-neutral-800"
    >
      <NuxtLink
        :to="backHref"
        class="mb-8 flex items-center gap-2 font-sans text-secondary text-sm transition-[color] duration-100 hover:text-primary focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-2"
      >
        <ArrowLeftIcon class="size-4" />
        Back to all icons
      </NuxtLink>

      <div
        class="flex w-full flex-col gap-6 min-[880px]:flex-row min-[880px]:items-center"
      >
        <IconCard
          v-if="icon"
          :name="icon.name"
          :size="48"
          :show-title="false"
          :actions-always-visible="true"
          :hover-shadow="false"
          icon-class="flex items-center justify-center [&>svg]:size-12 [&>svg]:text-neutral-800 dark:[&>svg]:text-neutral-100"
          class="w-full min-[880px]:w-[200px]"
        />

        <div class="flex h-full flex-col gap-1">
          <h1 class="font-sans text-[28px] min-[640px]:text-[36px]">
            {{ pascalName }}
          </h1>
          <p class="font-mono text-secondary text-sm">
            Animated {{ formattedName }} icon for {{ getFrameworkName() }}
          </p>
          <CliBlock
            class="mt-7 hidden px-0 min-[880px]:flex"
            :static-icon-name="slug"
          />
        </div>
      </div>

      <CliBlock
        class="mt-8 flex px-0 min-[880px]:hidden"
        :static-icon-name="slug"
      />
    </div>

    <div
      class="view-container border-neutral-200 py-4 xl:border dark:border-neutral-800"
    >
      <h2 class="mb-3 font-sans text-xl">Keywords</h2>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(keyword, index) in icon?.keywords || []"
          :key="`${keyword}-${index}`"
          class="supports-[corner-shape:squircle]:corner-squircle rounded-[12px] bg-neutral-200 px-3 py-1 font-mono text-secondary text-sm supports-[corner-shape:squircle]:rounded-[20px] dark:bg-[#262626]"
        >
          {{ keyword }}
        </span>
      </div>
    </div>

    <SimilarIcons v-if="icon" :current-icon="icon" />
  </section>
</template>
