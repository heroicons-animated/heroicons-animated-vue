export { default as Avatar } from "./avatar.vue";
export { default as AvatarFallback } from "./avatar-fallback.vue";
export { default as AvatarImage } from "./avatar-image.vue";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export const avatarVariant = cva(
  "inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-neutral-100 font-normal text-neutral-950 dark:bg-neutral-800 dark:text-neutral-50",
  {
    variants: {
      size: {
        sm: "h-10 w-10 text-xs",
        base: "h-16 w-16 text-2xl",
        lg: "h-32 w-32 text-5xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
  }
);

export type AvatarVariants = VariantProps<typeof avatarVariant>;
