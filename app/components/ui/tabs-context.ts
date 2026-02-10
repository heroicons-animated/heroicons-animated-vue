import type { InjectionKey, Ref } from "vue";

export interface TabsContext {
  value: Ref<string>;
  setValue: (value: string) => void;
}

export const tabsContextKey: InjectionKey<TabsContext> = Symbol("TabsContext");
