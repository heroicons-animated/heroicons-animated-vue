import { inject, provide, ref, type Ref } from "vue";
import { PACKAGE_MANAGER } from "./constants";
import type { PackageManager } from "~/types";

const packageManagerKey = Symbol("packageManager");

export const providePackageManager = () => {
  const packageManager = ref<PackageManager>(PACKAGE_MANAGER.PNPM);
  provide(packageManagerKey, packageManager);
  return packageManager;
};

export const usePackageManager = (): Ref<PackageManager> => {
  const packageManager = inject<Ref<PackageManager>>(packageManagerKey);
  if (!packageManager) {
    throw new Error("Package manager not provided");
  }
  return packageManager;
};
