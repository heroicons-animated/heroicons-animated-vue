<script setup lang="ts">
import { computed } from "vue";
import { ICON_COMPONENTS } from "~/lib/icon-components";

const props = defineProps<{ name: string }>();

const iconComponent = computed(() => ICON_COMPONENTS[props.name]);
</script>

<template>
  <article class="icon-card">
    <div class="icon-frame">
      <component :is="iconComponent" v-if="iconComponent" :size="36" />
    </div>
    <div class="icon-name">{{ props.name }}</div>
  </article>
</template>
