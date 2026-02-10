import type { PackageManager } from "~/types";
import { SITE } from "./constants";
import { getPackageManagerPrefix } from "./package-manager";

export const getFileExtension = (): string => "vue";

export const getShadcnCLI = (): string => "shadcn-vue";

export const getRegistryPathPrefix = (): string => `${SITE.URL}/r/`;

export const getCLICommand = (
  packageManager: PackageManager,
  iconName: string
): string => {
  const prefix = getPackageManagerPrefix(packageManager);
  const cli = getShadcnCLI();
  return `${prefix} ${cli} add ${getRegistryPathPrefix()}${iconName}`;
};
