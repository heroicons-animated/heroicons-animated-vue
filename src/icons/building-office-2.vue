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
      <path
        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21"
      />
      <path ref="window1Ref" d="M6.75 12.75h.75" />
      <path ref="window2Ref" d="M6.75 9.75h.75" />
      <path ref="window3Ref" d="M6.75 6.75h.75" />
      <path ref="window4Ref" d="M10.5 12.75h.75" />
      <path ref="window5Ref" d="M10.5 9.75h.75" />
      <path ref="window6Ref" d="M10.5 6.75h.75" />
      <path ref="window7Ref" d="M17.25 17h.008v.008h-.008v-.008Z" />
      <path ref="window8Ref" d="M17.25 14h.008v.008h-.008v-.008Z" />
      <path ref="window9Ref" d="M17.25 11h.008v.008h-.008v-.008Z" />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "BuildingOffice2Icon",
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

const createWindowVariants = (custom: number) => ({
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [0, 1],
    transition: {
      duration: 0.3,
      ease: "linear",
      delay: 0.1 + custom * 0.15,
    },
  },
});

const window0Variants = createWindowVariants(0);
const window1Variants = createWindowVariants(1);
const window2Variants = createWindowVariants(2);

const window1Ref = ref<SVGPathElement>();
const window2Ref = ref<SVGPathElement>();
const window3Ref = ref<SVGPathElement>();
const window4Ref = ref<SVGPathElement>();
const window5Ref = ref<SVGPathElement>();
const window6Ref = ref<SVGPathElement>();
const window7Ref = ref<SVGPathElement>();
const window8Ref = ref<SVGPathElement>();
const window9Ref = ref<SVGPathElement>();

const window1Motion = useMotion(window1Ref, {
  initial: window0Variants.normal,
  enter: window0Variants.normal,
});
const window2Motion = useMotion(window2Ref, {
  initial: window1Variants.normal,
  enter: window1Variants.normal,
});
const window3Motion = useMotion(window3Ref, {
  initial: window2Variants.normal,
  enter: window2Variants.normal,
});
const window4Motion = useMotion(window4Ref, {
  initial: window0Variants.normal,
  enter: window0Variants.normal,
});
const window5Motion = useMotion(window5Ref, {
  initial: window1Variants.normal,
  enter: window1Variants.normal,
});
const window6Motion = useMotion(window6Ref, {
  initial: window2Variants.normal,
  enter: window2Variants.normal,
});
const window7Motion = useMotion(window7Ref, {
  initial: window0Variants.normal,
  enter: window0Variants.normal,
});
const window8Motion = useMotion(window8Ref, {
  initial: window1Variants.normal,
  enter: window1Variants.normal,
});
const window9Motion = useMotion(window9Ref, {
  initial: window2Variants.normal,
  enter: window2Variants.normal,
});

let isControlled = false;

const startAnimation = () => {
  window1Motion.apply(window0Variants.animate);
  window2Motion.apply(window1Variants.animate);
  window3Motion.apply(window2Variants.animate);
  window4Motion.apply(window0Variants.animate);
  window5Motion.apply(window1Variants.animate);
  window6Motion.apply(window2Variants.animate);
  window7Motion.apply(window0Variants.animate);
  window8Motion.apply(window1Variants.animate);
  window9Motion.apply(window2Variants.animate);
};

const stopAnimation = () => {
  window1Motion.apply(window0Variants.normal);
  window2Motion.apply(window1Variants.normal);
  window3Motion.apply(window2Variants.normal);
  window4Motion.apply(window0Variants.normal);
  window5Motion.apply(window1Variants.normal);
  window6Motion.apply(window2Variants.normal);
  window7Motion.apply(window0Variants.normal);
  window8Motion.apply(window1Variants.normal);
  window9Motion.apply(window2Variants.normal);
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
