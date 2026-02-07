import type { InjectionKey } from "vue";

export type TooltipProviderContext = {
  delay: number;
  closeDelay: number;
};

export const tooltipProviderKey: InjectionKey<TooltipProviderContext> = Symbol(
  "TooltipProviderContext"
);
