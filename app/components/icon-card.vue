<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref } from "vue";
  import {
    ClipboardDocumentIcon,
    CommandLineIcon,
    PauseIcon,
    PlayIcon,
  } from "@heroicons/vue/24/outline";
  import { ICON_COMPONENTS } from "~/lib/icon-components";
  import { getCLICommand, getFileExtension } from "~/lib/cli";
  import { usePackageManager } from "~/lib/state";
  import { toast } from "vue-sonner";
  import { cn } from "~/lib/utils";
  import { IconState } from "~/components/ui/icon-state";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "~/components/ui/tooltip";
  import type { AnimatedIconInstance } from "~/types";

  const props = withDefaults(
    defineProps<{
      name: string;
      size?: number;
      showTitle?: boolean;
      showActions?: boolean;
      actionsAlwaysVisible?: boolean;
      hoverShadow?: boolean;
      iconClass?: string;
    }>(),
    {
      size: 40,
      showTitle: true,
      showActions: true,
      actionsAlwaysVisible: false,
      hoverShadow: true,
      iconClass:
        "flex items-center justify-center [&>svg]:size-10 [&>svg]:text-neutral-800 dark:[&>svg]:text-neutral-100",
    }
  );
  const iconComponent = computed(() => ICON_COMPONENTS[props.name]);
  const iconRef = ref<AnimatedIconInstance | null>(null);
  const isTouch = ref(false);
  const isAnimating = ref(false);
  let playTimeout: number | undefined;

  const packageManager = usePackageManager();

  const handleMouseEnter = () => {
    if (isTouch.value) {
      return;
    }
    iconRef.value?.startAnimation?.();
  };

  const handleMouseLeave = () => {
    if (isTouch.value) {
      return;
    }
    iconRef.value?.stopAnimation?.();
  };

  const handlePlayClick = () => {
    if (isAnimating.value) {
      iconRef.value?.stopAnimation?.();
      isAnimating.value = false;
      if (playTimeout) {
        clearTimeout(playTimeout);
      }
      return;
    }

    iconRef.value?.startAnimation?.();
    isAnimating.value = true;
    playTimeout = window.setTimeout(() => {
      isAnimating.value = false;
      iconRef.value?.stopAnimation?.();
    }, 1500);
  };

  onMounted(() => {
    isTouch.value = window.matchMedia("(hover: none)").matches;
  });

  onBeforeUnmount(() => {
    if (playTimeout) {
      clearTimeout(playTimeout);
    }
  });

  const cliState = ref<"idle" | "done" | "error">("idle");
  const codeState = ref<"idle" | "loading" | "done" | "error">("idle");

  const handleCopyCLI = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    if (cliState.value !== "idle") {
      return;
    }
    try {
      await navigator.clipboard.writeText(
        getCLICommand(packageManager.value, props.name)
      );
      cliState.value = "done";
    } catch (error: unknown) {
      toast.error("Failed to copy to clipboard", {
        description: (error as Error).message,
      });
      cliState.value = "error";
    } finally {
      setTimeout(() => {
        cliState.value = "idle";
      }, 2000);
    }
  };

  const handleCopyCode = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    if (codeState.value !== "idle") {
      return;
    }
    try {
      codeState.value = "loading";
      const response = await fetch(`/r/${props.name}.json`);
      if (!response.ok) {
        throw new Error("Missing content");
      }

      const data = await response.json();
      const content = data?.files?.[0]?.content;
      if (!content) {
        throw new Error("Missing content");
      }
      await navigator.clipboard.writeText(content);
      codeState.value = "done";
    } catch (error: unknown) {
      toast.error("Failed to copy to clipboard", {
        description: (error as Error).message,
      });
      codeState.value = "error";
    } finally {
      setTimeout(() => {
        codeState.value = "idle";
      }, 2000);
    }
  };

  const cardClasses = computed(() =>
    cn(
      "group/card supports-[corner-shape:squircle]:corner-squircle relative flex flex-col items-center justify-center rounded-[20px] bg-white px-[28px] pt-[50px] supports-[corner-shape:squircle]:rounded-[30px] dark:bg-[#0A0A0A]",
      props.hoverShadow &&
        "transition-shadow [contain-intrinsic-size:auto_180px] [content-visibility:auto] hover:shadow-sm",
      !props.showActions && "pb-[50px]"
    )
  );

  const actionsClass = computed(() =>
    cn(
      "my-6 flex items-center justify-center gap-2 transition-opacity duration-100",
      props.actionsAlwaysVisible
        ? "opacity-100"
        : "opacity-0 group-hover/card:opacity-100 has-[data-tooltip-open]:opacity-100 has-data-busy:opacity-100 has-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
    )
  );

  const iconAttrs = computed(() => {
    if (props.name.startsWith("battery-")) {
      return { instanceId: props.name };
    }
    return {};
  });
</script>

<template>
  <div
    :class="cardClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <button
      v-if="isTouch"
      :aria-label="isAnimating ? 'Stop animation' : 'Play animation'"
      :aria-pressed="isAnimating"
      class="supports-[corner-shape:squircle]:corner-squircle absolute top-3 right-3 z-10 flex size-10 cursor-pointer items-center justify-center rounded-[14px] bg-neutral-200/20 transition-[background-color] duration-100 focus-within:-outline-offset-1 hover:bg-neutral-200 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[20px] dark:bg-neutral-800/20 dark:hover:bg-neutral-700"
      type="button"
      @click="handlePlayClick"
    >
      <PauseIcon
        v-if="isAnimating"
        aria-hidden="true"
        class="size-4 text-neutral-800 dark:text-neutral-100"
      />
      <PlayIcon
        v-else
        aria-hidden="true"
        class="size-4 text-neutral-800 dark:text-neutral-100"
      />
    </button>
    <component
      :is="iconComponent"
      v-if="iconComponent"
      ref="iconRef"
      :size="props.size"
      :class="props.iconClass"
      v-bind="iconAttrs"
    />
    <p
      v-if="props.showTitle"
      class="mt-[36px] line-clamp-1 text-center font-mono text-[#9F9FA9] text-xs dark:text-[#D4D4D4]"
      :title="props.name"
    >
      {{ props.name }}
    </p>
    <TooltipProvider v-if="props.showActions">
      <div :class="actionsClass">
        <Tooltip>
          <TooltipTrigger
            :aria-disabled="codeState !== 'idle'"
            :aria-label="`Copy .${getFileExtension()} code`"
            class="supports-[corner-shape:squircle]:corner-squircle flex size-10 cursor-pointer items-center justify-center rounded-[14px] bg-neutral-200/20 transition-[background-color] duration-100 focus-within:-outline-offset-1 hover:bg-neutral-200 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[20px] dark:bg-neutral-800/20 dark:hover:bg-neutral-700"
            :data-busy="codeState !== 'idle' ? '' : undefined"
            @click="handleCopyCode"
            :title="`Copy .${getFileExtension()} code`"
          >
            <IconState :status="codeState">
              <ClipboardDocumentIcon
                aria-hidden="true"
                class="size-4 text-neutral-800 dark:text-neutral-100"
              />
            </IconState>
          </TooltipTrigger>
          <TooltipContent>
            Copy
            <code class="rounded-[4px] bg-neutral-50/20 px-1 py-0.5 font-mono">
              .{{ getFileExtension() }}
            </code>
            code
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            :aria-disabled="cliState !== 'idle'"
            aria-label="Copy shadcn/cli command"
            class="supports-[corner-shape:squircle]:corner-squircle flex size-10 cursor-pointer items-center justify-center rounded-[14px] bg-neutral-200/20 transition-[background-color] duration-100 focus-within:-outline-offset-1 hover:bg-neutral-200 focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[20px] dark:bg-neutral-800/20 dark:hover:bg-neutral-700"
            :data-busy="cliState !== 'idle' ? '' : undefined"
            @click="handleCopyCLI"
            title="Copy shadcn/cli command"
          >
            <IconState :status="cliState">
              <CommandLineIcon
                aria-hidden="true"
                class="size-4 text-neutral-800 dark:text-neutral-100"
              />
            </IconState>
          </TooltipTrigger>
          <TooltipContent>
            Copy
            <!-- biome-ignore format: preserve inline spacing -->
            <code class="rounded-[4px] bg-neutral-50/20 px-1 py-0.5 font-mono">
              shadcn/cli</code>
            command
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  </div>
</template>
