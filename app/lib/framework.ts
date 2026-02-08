import { inject, provide, ref, type Ref, watch } from "vue";
import { useRoute, useRouter } from "#imports";

export type Framework = "react" | "vue" | "svelte";

export const FRAMEWORKS = ["react", "vue", "svelte"] as const;
export const DEFAULT_FRAMEWORK: Framework = "vue";

type FrameworkContext = {
  framework: Ref<Framework>;
  setFramework: (framework: Framework) => void;
};

const frameworkKey = Symbol("framework");

const normalizeFramework = (value: unknown): Framework => {
  if (value === "react" || value === "vue" || value === "svelte") {
    return value;
  }
  return DEFAULT_FRAMEWORK;
};

export const provideFramework = () => {
  const route = useRoute();
  const router = useRouter();
  const framework = ref<Framework>(
    normalizeFramework(route.query.framework ?? DEFAULT_FRAMEWORK)
  );

  const setFramework = (next: Framework) => {
    framework.value = next;
  };

  watch(
    () => route.query.framework,
    (value) => {
      const next = normalizeFramework(value ?? DEFAULT_FRAMEWORK);
      if (next !== framework.value) {
        framework.value = next;
      }
    }
  );

  watch(framework, (value) => {
    if (process.server) {
      return;
    }
    const current = normalizeFramework(
      route.query.framework ?? DEFAULT_FRAMEWORK
    );
    if (current === value) {
      return;
    }

    const nextQuery: Record<string, string> = {};
    for (const [key, val] of Object.entries(route.query)) {
      if (typeof val === "string") {
        nextQuery[key] = val;
      }
    }

    if (value === DEFAULT_FRAMEWORK) {
      delete nextQuery.framework;
    } else {
      nextQuery.framework = value;
    }

    router.replace({ query: nextQuery });
  });

  provide(frameworkKey, { framework, setFramework });

  return { framework, setFramework };
};

export const useFramework = (): FrameworkContext => {
  const context = inject<FrameworkContext>(frameworkKey);
  if (!context) {
    throw new Error("Framework not provided");
  }
  return context;
};
