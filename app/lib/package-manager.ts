import type { PackageManager } from "~/types";

const PREFIX_MAP: Record<PackageManager, string> = {
  pnpm: "pnpm dlx",
  npm: "npx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
};

export const getPackageManagerPrefix = (pm: PackageManager) => PREFIX_MAP[pm];
