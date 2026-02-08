import type { InjectionKey, Ref } from "vue";

export type AvatarContext = {
  imageLoaded: Ref<boolean>;
  setImageLoaded: (value: boolean) => void;
};

export const avatarContextKey: InjectionKey<AvatarContext> =
  Symbol("AvatarContext");
