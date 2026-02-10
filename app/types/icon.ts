export interface AnimatedIconInstance {
  startAnimation?: () => void;
  stopAnimation?: () => void;
  setControlled?: (value: boolean) => void;
}

export type IconStatus = "idle" | "loading" | "done" | "error";
