export interface AnimatedIconInstance {
  startAnimation?: () => void;
  stopAnimation?: () => void;
}

export type IconStatus = "idle" | "loading" | "done" | "error";
