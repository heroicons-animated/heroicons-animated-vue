<script setup lang="ts">
  import {
    computed,
    inject,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    useAttrs,
    watch,
  } from "vue";
  import { cn } from "~/lib/utils";
  import { tooltipContextKey } from "./tooltip-context";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<{
      align?: "start" | "center" | "end";
      side?: "top" | "bottom" | "left" | "right";
      sideOffset?: number;
    }>(),
    {
      align: "center",
      side: "bottom",
      sideOffset: 6,
    }
  );

  const attrs = useAttrs();
  const ctx = inject(tooltipContextKey);
  const contentRef = ref<HTMLElement | null>(null);
  const isClient = ref(false);
  const position = ref({ top: 0, left: 0, transformOrigin: "center top" });
  const arrowPosition = ref({ top: 0, left: 0 });

  const ARROW_WIDTH = 20;
  const ARROW_HEIGHT = 10;
  const ARROW_OFFSET = 8;
  const ARROW_SIDE_OFFSET = 13;

  const getTransformOrigin = () => {
    if (props.side === "top") {
      return "center bottom";
    }
    if (props.side === "left") {
      return "right center";
    }
    if (props.side === "right") {
      return "left center";
    }
    return "center top";
  };

  const updatePosition = () => {
    if (
      !(ctx?.triggerRef.value && contentRef.value) ||
      typeof window === "undefined"
    ) {
      return;
    }

    const triggerRect = ctx.triggerRef.value.getBoundingClientRect();
    const contentRect = contentRef.value.getBoundingClientRect();
    const offset = props.sideOffset;

    let top = 0;
    let left = 0;

    const alignHorizontal = () => {
      if (props.align === "start") {
        return triggerRect.left;
      }
      if (props.align === "end") {
        return triggerRect.right - contentRect.width;
      }
      return triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
    };

    const alignVertical = () => {
      if (props.align === "start") {
        return triggerRect.top;
      }
      if (props.align === "end") {
        return triggerRect.bottom - contentRect.height;
      }
      return triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
    };

    if (props.side === "top") {
      top = triggerRect.top - offset - contentRect.height;
      left = alignHorizontal();
    } else if (props.side === "bottom") {
      top = triggerRect.bottom + offset;
      left = alignHorizontal();
    } else if (props.side === "left") {
      left = triggerRect.left - offset - contentRect.width;
      top = alignVertical();
    } else {
      left = triggerRect.right + offset;
      top = alignVertical();
    }

    const padding = 8;
    left = Math.min(
      Math.max(left, padding),
      window.innerWidth - contentRect.width - padding
    );
    top = Math.min(
      Math.max(top, padding),
      window.innerHeight - contentRect.height - padding
    );

    position.value = {
      top,
      left,
      transformOrigin: getTransformOrigin(),
    };

    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top + triggerRect.height / 2;
    const arrowPadding = 8;

    if (props.side === "top" || props.side === "bottom") {
      const targetX = triggerCenterX - left;
      const arrowLeft = Math.min(
        Math.max(targetX - ARROW_WIDTH / 2, arrowPadding),
        contentRect.width - ARROW_WIDTH - arrowPadding
      );
      const arrowTop =
        props.side === "bottom"
          ? -ARROW_OFFSET
          : contentRect.height - (ARROW_HEIGHT - ARROW_OFFSET);
      arrowPosition.value = { left: arrowLeft, top: arrowTop };
    } else {
      const targetY = triggerCenterY - top;
      const arrowSpan = ARROW_WIDTH;
      const arrowTop = Math.min(
        Math.max(targetY - arrowSpan / 2, arrowPadding),
        contentRect.height - arrowSpan - arrowPadding
      );
      const arrowLeft =
        props.side === "left"
          ? contentRect.width - (ARROW_WIDTH - ARROW_SIDE_OFFSET)
          : -ARROW_SIDE_OFFSET;
      arrowPosition.value = { left: arrowLeft, top: arrowTop };
    }
  };

  const scheduleUpdate = () => {
    if (!isClient.value) {
      return;
    }
    nextTick(() => requestAnimationFrame(updatePosition));
  };

  const handleWindowUpdate = () => {
    if (!ctx?.open.value) {
      return;
    }
    updatePosition();
  };

  watch(
    () => ctx?.open.value,
    (open) => {
      if (open) {
        scheduleUpdate();
      }
    }
  );

  watch(
    () => [props.side, props.align, props.sideOffset],
    () => {
      if (ctx?.open.value) {
        scheduleUpdate();
      }
    }
  );

  onMounted(() => {
    isClient.value = true;
    if (typeof window === "undefined") {
      return;
    }
    window.addEventListener("resize", handleWindowUpdate);
    window.addEventListener("scroll", handleWindowUpdate, true);
  });

  onBeforeUnmount(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.removeEventListener("resize", handleWindowUpdate);
    window.removeEventListener("scroll", handleWindowUpdate, true);
  });

  const contentStyle = computed(() => ({
    top: `${position.value.top}px`,
    left: `${position.value.left}px`,
    "--transform-origin": position.value.transformOrigin,
  }));

  const arrowStyle = computed(() => ({
    top: `${arrowPosition.value.top}px`,
    left: `${arrowPosition.value.left}px`,
  }));
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-100"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-50"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="ctx?.open.value"
          ref="contentRef"
          :class="cn(
            'z-50 w-fit origin-(--transform-origin) text-balance rounded-[14px] bg-primary px-3 py-1.5 text-white text-xs shadow-sm',
            'supports-[corner-shape:squircle]:corner-squircle supports-[corner-shape:squircle]:rounded-[20px]',
            'fixed',
            attrs.class
          )"
          :data-side="props.side"
          data-slot="tooltip-content"
          v-bind="attrs"
          :style="contentStyle"
        >
          <slot />
          <span
            class="absolute data-[side=left]:rotate-90 data-[side=right]:-rotate-90 data-[side=top]:rotate-180"
            :data-side="props.side"
            :style="arrowStyle"
          >
            <svg fill="none" height="10" viewBox="0 0 20 10" width="20">
              <path
                class="fill-primary"
                d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V9H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
              />
              <path
                class="fill-primary"
                d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
              />
            </svg>
          </span>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>
