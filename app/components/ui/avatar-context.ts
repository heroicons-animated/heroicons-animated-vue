import type { InjectionKey, Ref } from "vue";

export interface AvatarContext {
  imageLoaded: Ref<boolean>;
  setImageLoaded: (value: boolean) => void;
}

export const avatarContextKey: InjectionKey<AvatarContext> =
  Symbol("AvatarContext");
