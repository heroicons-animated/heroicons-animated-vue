<script lang="ts" setup>
  import type { ToasterProps } from "vue-sonner";
  import { reactiveOmit } from "@vueuse/core";
  import { Toaster as Sonner } from "vue-sonner";
  import ExclamationTriangleIcon from "@heroicons-animated/vue/exclamation-triangle.vue";
  import XMarkIcon from "@heroicons-animated/vue/x-mark.vue";

  const props = defineProps<ToasterProps>();
  const delegatedProps = reactiveOmit(props, "toastOptions");
</script>

<template>
  <Sonner
    class="toaster group"
    :toast-options="{
      classes: {
      toast:
        '!bg-white !px-4 !py-4 !flex-wrap dark:!bg-black !gap-0 !border-neutral-900/5 dark:!border-neutral-100/10 supports-[corner-shape:squircle]:!corner-squircle supports-[corner-shape:squircle]:!rounded-[30px] !rounded-[14px]',
      title: 'font-sans text-black dark:!text-white',
      icon: 'translate-y-[-9.5px]',
      actionButton:
        '!mt-2 w-full flex items-center justify-center !font-sans !bg-primary focus-visible:outline-primary cursor-pointer !h-8 !text-[14px] transition-colors duration-100 hover:!bg-[color-mix(in_oklab,var(--color-primary),black_10%)] focus-visible:outline-1 focus-visible:outline-offset-1 supports-[corner-shape:squircle]:!corner-squircle supports-[corner-shape:squircle]:!rounded-[30px] !rounded-[14px]',
      },
    }"
    v-bind="delegatedProps"
  >
    <template #error-icon>
      <XMarkIcon :size="16" class="text-red-600 dark:text-red-400" />
    </template>
    <template #warning-icon>
      <ExclamationTriangleIcon
        :size="16"
        class="text-yellow-500 dark:text-yellow-400"
      />
    </template>
  </Sonner>
</template>
