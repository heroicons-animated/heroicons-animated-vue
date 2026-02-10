<script setup lang="ts">
  import {
    computed,
    onBeforeUnmount,
    onMounted,
    ref,
    useSlots,
    watch,
    type VNode,
  } from "vue";
  import { AnimatePresence, Motion } from "motion-v";
  import type { TargetAndTransition, Transition } from "motion-v";
  import { cn } from "~/lib/utils";

  const props = withDefaults(
    defineProps<{
      class?: string;
      interval?: number;
      transition?: Transition;
      variants?: {
        initial?: TargetAndTransition;
        animate?: TargetAndTransition;
        exit?: TargetAndTransition;
      };
      onIndexChange?: (index: number) => void;
    }>(),
    {
      interval: 2,
    }
  );

  const emit = defineEmits<(e: "index-change", index: number) => void>();

  const slots = useSlots();

  function flatten(vnodes: VNode[]) {
    const result: VNode[] = [];
    for (const vnode of vnodes) {
      if (vnode.type?.toString() === "Symbol(v-fgt)") {
        let children: VNode[] = [];
        if (Array.isArray(vnode.children)) {
          children = vnode.children as VNode[];
        } else if (
          typeof vnode.children === "object" &&
          vnode.children !== null &&
          "default" in vnode.children
        ) {
          const defaultSlot = (vnode.children as { default?: () => VNode[] })
            .default;
          children = defaultSlot?.() || [];
        }
        result.push(...flatten(children));
      } else {
        result.push(vnode);
      }
    }
    return result;
  }

  const items = computed(() => {
    const vnodes = (slots.default?.() ?? []) as VNode[];
    return flatten(vnodes);
  });
  const currentIndex = ref(0);
  let timer: ReturnType<typeof setInterval> | undefined;

  const notify = (index: number) => {
    props.onIndexChange?.(index);
    emit("index-change", index);
  };

  const startTimer = () => {
    if (typeof window === "undefined") {
      return;
    }
    if (timer) {
      clearInterval(timer);
    }
    if (items.value.length === 0) {
      return;
    }
    timer = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % items.value.length;
      notify(currentIndex.value);
    }, props.interval * 1000);
  };

  onMounted(() => {
    startTimer();
  });

  onBeforeUnmount(() => {
    if (timer) {
      clearInterval(timer);
    }
  });

  watch(
    () => props.interval,
    () => {
      startTimer();
    }
  );

  watch(items, (newItems) => {
    if (currentIndex.value >= newItems.length) {
      currentIndex.value = 0;
      notify(0);
    }
    startTimer();
  });

  const defaultVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  const defaultTransition = { duration: 0.3 };
</script>

<template>
  <div
    aria-hidden="true"
    :class="cn('relative inline-block whitespace-nowrap', props.class)"
  >
    <AnimatePresence mode="popLayout" :initial="false">
      <Motion
        v-if="items.length"
        :key="currentIndex"
        :initial="(props.variants?.initial as any) ?? defaultVariants.initial"
        :animate="(props.variants?.animate as any) ?? defaultVariants.animate"
        :exit="(props.variants?.exit as any) ?? defaultVariants.exit"
        :transition="props.transition ?? defaultTransition"
      >
        <component :is="items[currentIndex]" />
      </Motion>
    </AnimatePresence>
  </div>
</template>
