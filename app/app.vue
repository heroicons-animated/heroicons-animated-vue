<script setup lang="ts">
  import { useSchemaOrg } from "#imports";
  import Header from "~/components/header.vue";
  import Toaster from "~/components/toaster.vue";
  import { LINK, SITE } from "~/lib/constants";
  import { ICON_MANIFEST } from "~/lib/manifest";
  import { providePackageManager } from "~/lib/state";

  const todayIsoDate = new Date().toISOString().split("T")[0] ?? "";
  const faqEntries = [
    {
      question: "What is heroicons-animated?",
      answer:
        "heroicons-animated is a free, open-source library of beautifully crafted animated Vue icons built with Motion for Vue and based on Heroicons.",
    },
    {
      question: "How do I install heroicons-animated icons?",
      answer:
        'You can install icons using shadcn-vue with any package manager: "npx shadcn-vue@latest add @heroicons-animated/vue/{icon-name}", "pnpm dlx shadcn-vue@latest add @heroicons-animated/vue/{icon-name}", "yarn dlx shadcn-vue@latest add @heroicons-animated/vue/{icon-name}", or "bunx shadcn-vue@latest add @heroicons-animated/vue/{icon-name}". Replace {icon-name} with your desired icon in kebab-case.',
    },
    {
      question: "Is heroicons-animated free to use?",
      answer:
        "Yes. heroicons-animated is completely free and open-source under the MIT license for personal and commercial projects.",
    },
    {
      question: "What technologies are used in heroicons-animated?",
      answer:
        "heroicons-animated icons are Vue components written in TypeScript. Animations are powered by Motion for Vue, and the icons are based on Heroicons.",
    },
  ] as const;

  useSchemaOrg([
    {
      "@type": "WebSite",
      name: SITE.NAME,
      url: SITE.URL,
      description: SITE.DESCRIPTION.LONG,
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE.URL}?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareSourceCode",
      name: SITE.NAME,
      description: SITE.DESCRIPTION.LONG,
      url: SITE.URL,
      codeRepository: LINK.GITHUB,
      programmingLanguage: ["TypeScript", "Vue", "JavaScript"],
      runtimePlatform: "Node.js",
      license: LINK.LICENSE,
      author: {
        "@type": "Person",
        name: SITE.AUTHOR.NAME,
        url: LINK.TWITTER,
      },
      maintainer: {
        "@type": "Person",
        name: SITE.AUTHOR.NAME,
        url: LINK.TWITTER,
      },
      keywords: SITE.KEYWORDS,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      isAccessibleForFree: true,
      dateModified: todayIsoDate,
      numberOfItems: ICON_MANIFEST.length,
    },
    {
      "@type": "Organization",
      name: SITE.NAME,
      url: SITE.URL,
      logo: `${SITE.URL}${SITE.OG_IMAGE}`,
      sameAs: [LINK.GITHUB, LINK.TWITTER],
      founder: {
        "@type": "Person",
        name: SITE.AUTHOR.NAME,
        url: LINK.TWITTER,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqEntries.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ]);

  providePackageManager();
</script>

<template>
  <div class="root">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#8b5cf6" />
    <Header />
    <NuxtPage />
    <Toaster />
  </div>
</template>
