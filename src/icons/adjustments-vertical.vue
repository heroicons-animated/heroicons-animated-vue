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
      <line ref="line1Ref" x1="6" x2="6" y1="3.75" y2="13.5" />
      <line ref="line2Ref" x1="6" x2="6" y1="16.5" y2="20.25" />
      <circle ref="circle1Ref" cx="6" cy="15" fill="none" r="1.5" />

      <line ref="line3Ref" x1="12" x2="12" y1="3.75" y2="7.5" />
      <line ref="line4Ref" x1="12" x2="12" y1="10.5" y2="20.25" />
      <circle ref="circle2Ref" cx="12" cy="9" fill="none" r="1.5" />

      <line ref="line5Ref" x1="18" x2="18" y1="3.75" y2="13.5" />
      <line ref="line6Ref" x1="18" x2="18" y1="16.5" y2="20.25" />
      <circle ref="circle3Ref" cx="18" cy="15" fill="none" r="1.5" />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "AdjustmentsVerticalIcon",
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
  normal: { y2: 13.5, transition: defaultTransition },
  animate: { y2: 10.5, transition: defaultTransition },
};
const line2Variants = {
  normal: { y1: 16.5, transition: defaultTransition },
  animate: { y1: 13.5, transition: defaultTransition },
};
const circle1Variants = {
  normal: { cy: 15, transition: defaultTransition },
  animate: { cy: 12, transition: defaultTransition },
};
const line3Variants = {
  normal: { y2: 7.5, transition: defaultTransition },
  animate: { y2: 10.5, transition: defaultTransition },
};
const line4Variants = {
  normal: { y1: 10.5, transition: defaultTransition },
  animate: { y1: 13.5, transition: defaultTransition },
};
const circle2Variants = {
  normal: { cy: 9, transition: defaultTransition },
  animate: { cy: 12, transition: defaultTransition },
};
const line5Variants = {
  normal: { y2: 13.5, transition: defaultTransition },
  animate: { y2: 10.5, transition: defaultTransition },
};
const line6Variants = {
  normal: { y1: 16.5, transition: defaultTransition },
  animate: { y1: 13.5, transition: defaultTransition },
};
const circle3Variants = {
  normal: { cy: 15, transition: defaultTransition },
  animate: { cy: 12, transition: defaultTransition },
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
