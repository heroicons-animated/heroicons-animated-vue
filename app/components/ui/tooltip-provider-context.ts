import type { InjectionKey } from "vue";

export interface TooltipProviderContext {
  delay: number;
  closeDelay: number;
}

export const tooltipProviderKey: InjectionKey<TooltipProviderContext> = Symbol(
  "TooltipProviderContext"
);
