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
        d="M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18"
      />
      <path ref="dotRef" d="M12 6.75h.008v.008H12V6.75Z" />
      <path ref="pillar1Ref" d="M8.25 12.75v8.25" />
      <path ref="pillar2Ref" d="M12 12.75v8.25" />
      <path ref="pillar3Ref" d="M15.75 12.75v8.25" />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "BuildingLibraryIcon",
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

const dotVariants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [0, 1],
    transition: {
      delay: 0.1,
      duration: 0.1,
    },
  },
};

const createPillarVariants = (custom: number) => ({
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      delay: 0.2 + custom * 0.15,
      duration: 0.3,
      ease: "linear",
    },
  },
});

const dotRef = ref<SVGPathElement>();
const pillar1Ref = ref<SVGPathElement>();
const pillar2Ref = ref<SVGPathElement>();
const pillar3Ref = ref<SVGPathElement>();

const pillar1Variants = createPillarVariants(0);
const pillar2Variants = createPillarVariants(1);
const pillar3Variants = createPillarVariants(2);

const dotMotion = useMotion(dotRef, {
  initial: dotVariants.normal,
  enter: dotVariants.normal,
});
const pillar1Motion = useMotion(pillar1Ref, {
  initial: pillar1Variants.normal,
  enter: pillar1Variants.normal,
});
const pillar2Motion = useMotion(pillar2Ref, {
  initial: pillar2Variants.normal,
  enter: pillar2Variants.normal,
});
const pillar3Motion = useMotion(pillar3Ref, {
  initial: pillar3Variants.normal,
  enter: pillar3Variants.normal,
});

let isControlled = false;

const startAnimation = () => {
  dotMotion.apply(dotVariants.animate);
  pillar1Motion.apply(pillar1Variants.animate);
  pillar2Motion.apply(pillar2Variants.animate);
  pillar3Motion.apply(pillar3Variants.animate);
};

const stopAnimation = () => {
  dotMotion.apply(dotVariants.normal);
  pillar1Motion.apply(pillar1Variants.normal);
  pillar2Motion.apply(pillar2Variants.normal);
  pillar3Motion.apply(pillar3Variants.normal);
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
