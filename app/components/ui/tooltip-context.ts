import type { InjectionKey, Ref } from "vue";

export interface TooltipContext {
  open: Ref<boolean>;
  setOpen: (value: boolean) => void;
  openWithDelay: () => void;
  closeWithDelay: () => void;
  triggerRef: Ref<HTMLElement | null>;
}

export const tooltipContextKey: InjectionKey<TooltipContext> =
  Symbol("TooltipContext");
