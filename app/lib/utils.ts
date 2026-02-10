import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: unknown[]) => {
  return twMerge(clsx(inputs as ClassValue[]));
};
