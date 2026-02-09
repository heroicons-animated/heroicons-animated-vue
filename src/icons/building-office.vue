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
        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
      />
      <path ref="floor1Ref" d="M9 12.75h1.5" />
      <path ref="floor2Ref" d="M13.5 12.75H15" />
      <path ref="floor3Ref" d="M9 9.75h1.5" />
      <path ref="floor4Ref" d="M13.5 9.75H15" />
      <path ref="floor5Ref" d="M9 6.75h1.5" />
      <path ref="floor6Ref" d="M13.5 6.75H15" />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "BuildingOfficeIcon",
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

const createFloorVariants = (custom: number) => ({
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

const floor0Variants = createFloorVariants(0);
const floor1Variants = createFloorVariants(1);
const floor2Variants = createFloorVariants(2);

const floor1Ref = ref<SVGPathElement>();
const floor2Ref = ref<SVGPathElement>();
const floor3Ref = ref<SVGPathElement>();
const floor4Ref = ref<SVGPathElement>();
const floor5Ref = ref<SVGPathElement>();
const floor6Ref = ref<SVGPathElement>();

const floor1Motion = useMotion(floor1Ref, {
  initial: floor0Variants.normal,
  enter: floor0Variants.normal,
});
const floor2Motion = useMotion(floor2Ref, {
  initial: floor0Variants.normal,
  enter: floor0Variants.normal,
});
const floor3Motion = useMotion(floor3Ref, {
  initial: floor1Variants.normal,
  enter: floor1Variants.normal,
});
const floor4Motion = useMotion(floor4Ref, {
  initial: floor1Variants.normal,
  enter: floor1Variants.normal,
});
const floor5Motion = useMotion(floor5Ref, {
  initial: floor2Variants.normal,
  enter: floor2Variants.normal,
});
const floor6Motion = useMotion(floor6Ref, {
  initial: floor2Variants.normal,
  enter: floor2Variants.normal,
});

let isControlled = false;

const startAnimation = () => {
  floor1Motion.apply(floor0Variants.animate);
  floor2Motion.apply(floor0Variants.animate);
  floor3Motion.apply(floor1Variants.animate);
  floor4Motion.apply(floor1Variants.animate);
  floor5Motion.apply(floor2Variants.animate);
  floor6Motion.apply(floor2Variants.animate);
};

const stopAnimation = () => {
  floor1Motion.apply(floor0Variants.normal);
  floor2Motion.apply(floor0Variants.normal);
  floor3Motion.apply(floor1Variants.normal);
  floor4Motion.apply(floor1Variants.normal);
  floor5Motion.apply(floor2Variants.normal);
  floor6Motion.apply(floor2Variants.normal);
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
