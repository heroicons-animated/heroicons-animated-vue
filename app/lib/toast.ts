import { ref } from "vue";

export type ToastType = "info" | "success" | "warning" | "error";

export type ToastAction = {
  label: string;
  onClick: () => void;
};

export type ToastOptions = {
  description?: string;
  duration?: number;
  action?: ToastAction;
};

export type ToastItem = ToastOptions & {
  id: string;
  title: string;
  type: ToastType;
};

const DEFAULT_DURATION = 4000;

const toasts = ref<ToastItem[]>([]);
const timeouts = new Map<string, ReturnType<typeof setTimeout>>();
let counter = 0;

const removeToast = (id: string) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
  const timeout = timeouts.get(id);
  if (timeout) {
    clearTimeout(timeout);
    timeouts.delete(id);
  }
};

const addToast = (title: string, type: ToastType, options: ToastOptions = {}) => {
  const id = `${Date.now()}-${counter++}`;
  const duration = options.duration ?? DEFAULT_DURATION;

  const toast: ToastItem = {
    id,
    title,
    type,
    description: options.description,
    duration,
    action: options.action,
  };

  toasts.value = [toast, ...toasts.value];

  if (duration !== Infinity) {
    const timeout = setTimeout(() => {
      removeToast(id);
    }, duration);
    timeouts.set(id, timeout);
  }

  return id;
};

export const toast = {
  info: (title: string, options?: ToastOptions) =>
    addToast(title, "info", options),
  success: (title: string, options?: ToastOptions) =>
    addToast(title, "success", options),
  warning: (title: string, options?: ToastOptions) =>
    addToast(title, "warning", options),
  error: (title: string, options?: ToastOptions) =>
    addToast(title, "error", options),
};

export { toasts, removeToast };
