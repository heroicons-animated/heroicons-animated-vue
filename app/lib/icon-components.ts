import type { Component } from "vue";

const modules = import.meta.glob("@heroicons-animated/vue/*.vue", {
  import: "default",
  eager: true,
});

const components: Record<string, Component> = {};

for (const [path, component] of Object.entries(modules)) {
  const name = path.split("/").pop()?.replace(".vue", "");
  if (name) {
    components[name] = component as Component;
  }
}

export const ICON_COMPONENTS = components;
