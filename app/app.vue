<script setup lang="ts">
  import Header from "~/components/Header.vue";
  import Toaster from "~/components/Toaster.vue";
  import { provideFramework } from "~/lib/framework";
  import { providePackageManager } from "~/lib/state";

  provideFramework();
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
