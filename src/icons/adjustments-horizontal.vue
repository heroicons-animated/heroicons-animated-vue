<template>
  <div
    :class="props.class"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    v-bind="$attrs"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line ref="line1Ref" x1="10.5" x2="20.25" y1="6" y2="6" />
      <line ref="line2Ref" x1="3.75" x2="7.5" y1="6" y2="6" />
      <circle ref="circle1Ref" cx="9" cy="6" fill="none" r="1.5" />

      <line ref="line3Ref" x1="16.5" x2="20.25" y1="12" y2="12" />
      <line ref="line4Ref" x1="3.75" x2="13.5" y1="12" y2="12" />
      <circle ref="circle2Ref" cx="15" cy="12" fill="none" r="1.5" />

      <line ref="line5Ref" x1="10.5" x2="20.25" y1="18" y2="18" />
      <line ref="line6Ref" x1="3.75" x2="7.5" y1="18" y2="18" />
      <circle ref="circle3Ref" cx="9" cy="18" fill="none" r="1.5" />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "AdjustmentsHorizontalIcon",
};
</script>

<script setup lang="ts">
import { useMotion } from "../motion";
import { ref } from "vue";

export interface Props {
  size?: number;
  class?: string;
  [key: string]: any; // Allow all HTMLAttributes
}

const props = withDefaults(defineProps<Props>(), {
  size: 28,
});

const defaultTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 12,
  mass: 0.4,
};

const line1Ref = ref<SVGLineElement>();
const line2Ref = ref<SVGLineElement>();
const circle1Ref = ref<SVGCircleElement>();
const line3Ref = ref<SVGLineElement>();
const line4Ref = ref<SVGLineElement>();
const circle2Ref = ref<SVGCircleElement>();
const line5Ref = ref<SVGLineElement>();
const line6Ref = ref<SVGLineElement>();
const circle3Ref = ref<SVGCircleElement>();

const line1Variants = {
  normal: { x1: 10.5, transition: defaultTransition },
  animate: { x1: 13.5, transition: defaultTransition },
};
const line2Variants = {
  normal: { x2: 7.5, transition: defaultTransition },
  animate: { x2: 10.5, transition: defaultTransition },
};
const circle1Variants = {
  normal: { cx: 9, transition: defaultTransition },
  animate: { cx: 12, transition: defaultTransition },
};
const line3Variants = {
  normal: { x1: 16.5, transition: defaultTransition },
  animate: { x1: 13.5, transition: defaultTransition },
};
const line4Variants = {
  normal: { x2: 13.5, transition: defaultTransition },
  animate: { x2: 10.5, transition: defaultTransition },
};
const circle2Variants = {
  normal: { cx: 15, transition: defaultTransition },
  animate: { cx: 12, transition: defaultTransition },
};
const line5Variants = {
  normal: { x1: 10.5, transition: defaultTransition },
  animate: { x1: 13.5, transition: defaultTransition },
};
const line6Variants = {
  normal: { x2: 7.5, transition: defaultTransition },
  animate: { x2: 10.5, transition: defaultTransition },
};
const circle3Variants = {
  normal: { cx: 9, transition: defaultTransition },
  animate: { cx: 12, transition: defaultTransition },
};

const line1Motion = useMotion(line1Ref, {
  initial: line1Variants.normal,
  enter: line1Variants.normal,
});
const line2Motion = useMotion(line2Ref, {
  initial: line2Variants.normal,
  enter: line2Variants.normal,
});
const circle1Motion = useMotion(circle1Ref, {
  initial: circle1Variants.normal,
  enter: circle1Variants.normal,
});
const line3Motion = useMotion(line3Ref, {
  initial: line3Variants.normal,
  enter: line3Variants.normal,
});
const line4Motion = useMotion(line4Ref, {
  initial: line4Variants.normal,
  enter: line4Variants.normal,
});
const circle2Motion = useMotion(circle2Ref, {
  initial: circle2Variants.normal,
  enter: circle2Variants.normal,
});
const line5Motion = useMotion(line5Ref, {
  initial: line5Variants.normal,
  enter: line5Variants.normal,
});
const line6Motion = useMotion(line6Ref, {
  initial: line6Variants.normal,
  enter: line6Variants.normal,
});
const circle3Motion = useMotion(circle3Ref, {
  initial: circle3Variants.normal,
  enter: circle3Variants.normal,
});

let isControlled = false;

const startAnimation = () => {
  line1Motion.apply(line1Variants.animate);
  line2Motion.apply(line2Variants.animate);
  circle1Motion.apply(circle1Variants.animate);
  line3Motion.apply(line3Variants.animate);
  line4Motion.apply(line4Variants.animate);
  circle2Motion.apply(circle2Variants.animate);
  line5Motion.apply(line5Variants.animate);
  line6Motion.apply(line6Variants.animate);
  circle3Motion.apply(circle3Variants.animate);
};

const stopAnimation = () => {
  line1Motion.apply(line1Variants.normal);
  line2Motion.apply(line2Variants.normal);
  circle1Motion.apply(circle1Variants.normal);
  line3Motion.apply(line3Variants.normal);
  line4Motion.apply(line4Variants.normal);
  circle2Motion.apply(circle2Variants.normal);
  line5Motion.apply(line5Variants.normal);
  line6Motion.apply(line6Variants.normal);
  circle3Motion.apply(circle3Variants.normal);
};

const handleMouseEnter = () => {
  if (!isControlled) {
    startAnimation();
  }
};

const handleMouseLeave = () => {
  if (!isControlled) {
    stopAnimation();
  }
};

const setControlled = (value: boolean) => {
  isControlled = value;
};

defineExpose({
  startAnimation,
  stopAnimation,
  setControlled,
});
</script>
