<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { ClipboardDocumentIcon } from "@heroicons/vue/24/outline";
  import { PACKAGE_MANAGER } from "~/lib/constants";
  import {
    getCLICommand,
    getRegistryPathPrefix,
    getShadcnCLI,
  } from "~/lib/cli";
  import { getPackageManagerPrefix } from "~/lib/package-manager";
  import { usePackageManager } from "~/lib/state";
  import { toast } from "vue-sonner";
  import { cn } from "~/lib/utils";
  import { IconState } from "~/components/ui/icon-state";
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "~/components/ui/tabs";
  import { ScrollArea } from "~/components/ui/scroll-area";
  import { TextLoop } from "~/components/ui/text-loop";
  import type { IconItem } from "~/types";

  interface Props {
    icons?: IconItem[];
    staticIconName?: string;
    className?: string;
  }

  const props = defineProps<Props>();
  const packageManager = usePackageManager();

  const iconList = computed(() =>
    (props.icons || []).filter((icon) => icon.name.length <= 20)
  );

  const currentIconName = ref(
    props.staticIconName || iconList.value[0]?.name || ""
  );

  watch(iconList, () => {
    if (props.staticIconName) {
      return;
    }
    currentIconName.value = iconList.value[0]?.name || "";
  });

  const handleIndexChange = (index: number) => {
    currentIconName.value = iconList.value[index]?.name || "";
  };

  const state = ref<"idle" | "done" | "error">("idle");

  const handleCopy = async () => {
    if (state.value !== "idle") {
      return;
    }
    try {
      await navigator.clipboard.writeText(
        getCLICommand(packageManager.value, currentIconName.value)
      );
      state.value = "done";
      setTimeout(() => {
        state.value = "idle";
      }, 2000);
    } catch {
      toast.error("Failed to copy to clipboard", {
        description: "Please check your browser permissions.",
      });
      state.value = "error";
      setTimeout(() => {
        state.value = "idle";
      }, 2000);
    }
  };
</script>

<template>
  <div
    :class="cn('relative mt-[40px] w-full max-w-[642px] px-4', props.className)"
  >
    <Tabs class="w-full" v-model="packageManager">
      <TabsList class="w-full justify-start" @click.stop>
        <TabsTrigger
          v-for="pm in Object.values(PACKAGE_MANAGER)"
          :key="pm"
          :value="pm"
        >
          {{ pm }}
        </TabsTrigger>
      </TabsList>
      <TabsContent
        v-for="pm in Object.values(PACKAGE_MANAGER)"
        :key="pm"
        :value="pm"
        class="supports-[corner-shape:squircle]:corner-tr-squircle supports-[corner-shape:squircle]:corner-br-squircle supports-[corner-shape:squircle]:corner-bl-squircle overflow-hidden rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] focus-within:outline-offset-0 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-tr-[14px] supports-[corner-shape:squircle]:rounded-br-[14px] supports-[corner-shape:squircle]:rounded-bl-[14px]"
      >
        <ScrollArea
          orientation="horizontal"
          class="w-full overflow-hidden"
          scrollbarClasses="pointer-events-none absolute right-2! bottom-1! left-2! flex h-0.5 touch-none rounded bg-neutral-200 opacity-0 transition-opacity duration-100 data-hovering:pointer-events-auto data-scrolling:pointer-events-auto data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:delay-0 data-scrolling:duration-0 dark:bg-neutral-700"
        >
          <div
            class="overflow-hidden rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] bg-white focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-0 dark:bg-white/10 supports-[corner-shape:squircle]:corner-tr-squircle supports-[corner-shape:squircle]:corner-br-squircle supports-[corner-shape:squircle]:corner-bl-squircle supports-[corner-shape:squircle]:rounded-tr-[14px] supports-[corner-shape:squircle]:rounded-br-[14px] supports-[corner-shape:squircle]:rounded-bl-[14px] isolate whitespace-nowrap px-4 py-3 pr-20 font-mono text-sm tracking-[-0.39px] before:pointer-events-none before:absolute before:top-0 before:left-0 before:z-10 before:block before:h-full before:rounded-bl-[10px] supports-[corner-shape:squircle]:before:corner-bl-squircle supports-[corner-shape:squircle]:before:rounded-bl-[14px] before:transition-[width] before:duration-50 before:ease-out before:content-[''] before:w-[min(40px,var(--scroll-area-overflow-x-start))] before:bg-[linear-gradient(to_right,white,transparent)] dark:before:bg-[linear-gradient(to_right,rgb(47_47_47/1),transparent)] before:[--scroll-area-overflow-x-start:inherit] after:pointer-events-none after:absolute after:top-0 after:right-0 after:z-10 after:block after:h-full after:rounded-r-[10px] supports-[corner-shape:squircle]:after:corner-r-squircle supports-[corner-shape:squircle]:after:rounded-r-[14px] after:transition-[width] after:duration-50 after:ease-out after:content-[''] after:w-[calc(min(40px,var(--scroll-area-overflow-x-end,100px))+100px)] after:bg-[linear-gradient(to_left,white_0%,white_30%,transparent)] dark:after:bg-[linear-gradient(to_left,rgb(47_47_47/1)_0%,rgb(47_47_47/1)_30%,transparent)] after:[--scroll-area-overflow-x-end:inherit]"
          >
            <span class="sr-only">
              {{ getPackageManagerPrefix(pm) }} {{ getShadcnCLI() }} add
              {{ getRegistryPathPrefix() }}
              {{ props.staticIconName || currentIconName }}
            </span>
            <span class="text-neutral-600 dark:text-neutral-400">
              {{ getPackageManagerPrefix(pm) }}
            </span>
            {{ " " }}
            <!-- biome-ignore format: preserve inline spacing -->
            <span class="text-black dark:text-white">
                {{ getShadcnCLI() }} add {{ getRegistryPathPrefix() }}
              </span>
            <span v-if="props.staticIconName" class="shrink-0 text-primary">
              {{ props.staticIconName }}
            </span>
            <TextLoop
              v-else
              :interval="1.5"
              :transition="{ duration: 0.25 }"
              :variants="{
                  initial: {
                    y: -12,
                    rotateX: -90,
                    opacity: 0,
                    filter: 'blur(2px)',
                  },
                  animate: { y: 0, rotateX: 0, opacity: 1, filter: 'blur(0px)' },
                  exit: { y: 12, rotateX: 90, opacity: 0, filter: 'blur(2px)' },
                }"
              @index-change="handleIndexChange"
            >
              <span
                v-for="icon in iconList"
                :key="icon.name"
                class="shrink-0 text-primary"
              >
                {{ icon.name }}
              </span>
            </TextLoop>
          </div>
          <button
            :aria-disabled="state !== 'idle'"
            aria-label="Copy to clipboard"
            class="supports-[corner-shape:squircle]:corner-squircle absolute top-1/2 right-1.5 z-20 -translate-y-1/2 cursor-pointer rounded-[6px] p-2 transition-[background-color] duration-100 focus-within:outline-offset-1 hover:bg-neutral-100 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[8px] dark:hover:bg-neutral-700"
            @click="handleCopy"
            type="button"
          >
            <IconState :status="state">
              <ClipboardDocumentIcon aria-hidden="true" class="size-4" />
            </IconState>
          </button>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  </div>
</template>
