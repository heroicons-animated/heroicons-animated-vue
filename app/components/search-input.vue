<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref } from "vue";
  import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
  import { Input } from "~/components/ui/input";
  import { Kbd } from "~/components/ui/kbd";

  const props = defineProps<{
    modelValue: string;
    resultCount?: number;
    totalCount?: number;
  }>();

  const emit = defineEmits<(e: "update:modelValue", value: string) => void>();

  const inputRef = ref<{ focus: () => void; blur: () => void } | null>(null);

  const value = computed({
    get: () => props.modelValue,
    set: (next: string) => emit("update:modelValue", next),
  });

  const showResultCount = computed(
    () =>
      props.modelValue.length > 0 &&
      props.resultCount !== undefined &&
      props.totalCount !== undefined
  );

  const handleKeydown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if ((event.metaKey || event.ctrlKey) && key === "k") {
      event.preventDefault();
      inputRef.value?.focus();
      return;
    }

    if (key === "escape") {
      event.preventDefault();
      emit("update:modelValue", "");
      inputRef.value?.blur();
    }
  };

  onMounted(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.addEventListener("keydown", handleKeydown);
  });

  onBeforeUnmount(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.removeEventListener("keydown", handleKeydown);
  });
</script>

<template>
  <div
    class="sticky top-0 z-50 border-neutral-200 border-y bg-background/80 backdrop-blur-md dark:border-neutral-800 dark:bg-background/80"
  >
    <div
      class="view-container flex items-center gap-2 border-neutral-200 py-2 xl:border-x dark:border-neutral-800"
    >
      <Input
        ref="inputRef"
        v-model="value"
        aria-label="Search icons"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        class="h-10 bg-white dark:bg-[#0A0A0A]"
        inputmode="search"
        placeholder="Search icons..."
        role="search"
        spellcheck="false"
        type="search"
      >
        <template #leading>
          <MagnifyingGlassIcon
            class="size-5 text-neutral-400"
            :stroke-width="2"
          />
        </template>
        <template #trailing>
          <span
            v-if="showResultCount"
            class="font-mono text-neutral-400 text-sm"
          >
            {{ resultCount }}/{{ totalCount }}
          </span>
          <Kbd
            v-else
            class="border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"
          >
            ⌘ K
          </Kbd>
        </template>
      </Input>
    </div>
  </div>
</template>
