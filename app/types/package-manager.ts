import type { PACKAGE_MANAGER } from "~/lib/constants";

export type PackageManager =
  (typeof PACKAGE_MANAGER)[keyof typeof PACKAGE_MANAGER];
