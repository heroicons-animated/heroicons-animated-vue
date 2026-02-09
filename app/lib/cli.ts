import { type PACKAGE_MANAGER, SITE } from "./constants";
import { getPackageManagerPrefix } from "./package-manager";

type PackageManager = (typeof PACKAGE_MANAGER)[keyof typeof PACKAGE_MANAGER];

export const getFileExtension = (): string => "vue";

export const getFrameworkName = (): string => "Vue";

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
