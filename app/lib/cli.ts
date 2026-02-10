import type { PackageManager } from "~/types";
import { SITE } from "./constants";
import { getPackageManagerPrefix } from "./package-manager";

export const getFileExtension = (): string => "vue";

export const getShadcnCLI = (): string => "shadcn-vue@latest";

export const getRegistryPathPrefix = (): string => "/vue/";

export const getCLICommand = (
  packageManager: PackageManager,
  iconName: string
): string => {
  const prefix = getPackageManagerPrefix(packageManager);
  const cli = getShadcnCLI();
  return `${prefix} ${cli} add @${SITE.NAME}${getRegistryPathPrefix()}${iconName}`;
};
