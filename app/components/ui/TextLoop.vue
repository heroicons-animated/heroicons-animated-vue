<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useSlots, watch } from "vue";
import { cn } from "~/lib/utils";

type Variant = {
  opacity?: number;
  x?: number;
  y?: number;
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  filter?: string;
};

type TransitionSpec = {
  duration?: number;
  ease?: string;
  delay?: number;
};

const props = withDefaults(
  defineProps<{
    class?: string;
    interval?: number;
    transition?: TransitionSpec;
    variants?: {
      initial?: Variant;
      animate?: Variant;
      exit?: Variant;
    };
    onIndexChange?: (index: number) => void;
  }>(),
  {
    interval: 2,
  }
);

const emit = defineEmits<{
  (e: "index-change", index: number): void;
}>();

const slots = useSlots();
const items = computed(() => slots.default?.() ?? []);
const currentIndex = ref(0);
let timer: number | undefined;

const notify = (index: number) => {
  props.onIndexChange?.(index);
  emit("index-change", index);
};

const startTimer = () => {
  if (typeof window === "undefined") return;
  if (timer) clearInterval(timer);
  if (items.value.length === 0) return;
  timer = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % items.value.length;
    notify(currentIndex.value);
  }, props.interval * 1000);
};

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});

watch(
  () => props.interval,
  () => {
    startTimer();
  }
);

watch(items, () => {
  currentIndex.value = 0;
  notify(0);
  startTimer();
});

const defaultVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

const resolvedVariants = computed(() => props.variants || defaultVariants);
const resolvedTransition = computed(() => ({
  duration: props.transition?.duration ?? 0.3,
  ease: props.transition?.ease ?? "ease-out",
  delay: props.transition?.delay ?? 0,
}));

const buildTransform = (variant: Variant) => {
  const transforms: string[] = [];
  const has3d =
    typeof variant.rotateX === "number" || typeof variant.rotateY === "number";
  if (has3d) {
    transforms.push("perspective(1000px)");
  }
  if (typeof variant.x === "number") {
    transforms.push(`translateX(${variant.x}px)`);
  }
  if (typeof variant.y === "number") {
    transforms.push(`translateY(${variant.y}px)`);
  }
  if (typeof variant.rotate === "number") {
    transforms.push(`rotate(${variant.rotate}deg)`);
  }
  if (typeof variant.rotateX === "number") {
    transforms.push(`rotateX(${variant.rotateX}deg)`);
  }
  if (typeof variant.rotateY === "number") {
    transforms.push(`rotateY(${variant.rotateY}deg)`);
  }
  if (typeof variant.scale === "number") {
    transforms.push(`scale(${variant.scale})`);
  }
  if (typeof variant.scaleX === "number") {
    transforms.push(`scaleX(${variant.scaleX})`);
  }
  if (typeof variant.scaleY === "number") {
    transforms.push(`scaleY(${variant.scaleY})`);
  }
  return transforms.join(" ");
};

const applyVariant = (el: HTMLElement, variant: Variant) => {
  const transform = buildTransform(variant);
  if (transform) {
    el.style.transform = transform;
  } else {
    el.style.removeProperty("transform");
  }

  if (typeof variant.opacity === "number") {
    el.style.opacity = `${variant.opacity}`;
  } else {
    el.style.removeProperty("opacity");
  }

  if (typeof variant.filter === "string") {
    el.style.filter = variant.filter;
  } else {
    el.style.removeProperty("filter");
  }
};

const applyTransition = (el: HTMLElement) => {
  const { duration, ease, delay } = resolvedTransition.value;
  el.style.willChange = "transform, opacity, filter";
  el.style.transition = `transform ${duration}s ${ease} ${delay}s, opacity ${duration}s ${ease} ${delay}s, filter ${duration}s ${ease} ${delay}s`;
};

const handleBeforeEnter = (el: Element) => {
  const node = el as HTMLElement;
  node.style.transition = "none";
  node.style.transformOrigin = "50% 50%";
  node.style.transformStyle = "preserve-3d";
  node.style.backfaceVisibility = "hidden";
  applyVariant(node, resolvedVariants.value.initial || defaultVariants.initial);
};

const handleEnter = (el: Element, done: () => void) => {
  const node = el as HTMLElement;
  const { duration, delay } = resolvedTransition.value;
  requestAnimationFrame(() => {
    applyTransition(node);
    applyVariant(node, resolvedVariants.value.animate || defaultVariants.animate);
    window.setTimeout(done, (duration + delay) * 1000);
  });
};

const handleLeave = (el: Element, done: () => void) => {
  const node = el as HTMLElement;
  const { duration, delay } = resolvedTransition.value;
  applyTransition(node);
  applyVariant(node, resolvedVariants.value.exit || defaultVariants.exit);
  window.setTimeout(done, (duration + delay) * 1000);
};
</script>

<template>
  <div :class="cn('relative inline-block whitespace-nowrap', props.class)" style="perspective: 1000px;">
    <Transition
      :css="false"
      mode="out-in"
      @before-enter="handleBeforeEnter"
      @enter="handleEnter"
      @leave="handleLeave"
    >
      <span v-if="items.length" :key="currentIndex" class="inline-flex">
        <component :is="items[currentIndex]" />
      </span>
    </Transition>
  </div>
</template>
