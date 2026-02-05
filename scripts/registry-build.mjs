import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.resolve(
  __dirname,
  "../src/icons"
);
const registryPath = path.resolve(__dirname, "../public/r");
const registryIndexPath = path.join(registryPath, "registry.json");

const schemaUrl = "https://shadcn-vue.com/schema/registry-item.json";
const registrySchemaUrl = "https://shadcn-vue.com/schema/registry.json";

const dependencies = ["@vueuse/motion"];

const stripContent = (schema) => ({
  ...schema,
  files: schema.files.map(({ content: _content, ...rest }) => rest),
});

const writeSchemaFile = (name, schema) => {
  fs.writeFileSync(
    path.join(registryPath, `${name}.json`),
    JSON.stringify(schema, null, 2)
  );
};

const buildRegistryItems = () => {
  if (!fs.existsSync(iconsDir)) {
    console.warn(`Icons directory not found: ${iconsDir}`);
    return [];
  }

  const iconFiles = fs
    .readdirSync(iconsDir)
    .filter((file) => file.endsWith(".vue"));

  const registryItems = [];

  for (const file of iconFiles) {
    const name = file.replace(".vue", "");
    const content = fs.readFileSync(path.join(iconsDir, file), "utf8");

    const schema = {
      $schema: schemaUrl,
      name,
      title: name,
      description: `Animated ${name} icon for Vue`,
      type: "registry:ui",
      registryDependencies: [],
      dependencies,
      files: [
        {
          path: `${name}.vue`,
          content,
          type: "registry:ui",
        },
      ],
    };

    writeSchemaFile(name, schema);
    registryItems.push(stripContent(schema));
  }

  return registryItems;
};

const buildRegistry = () => {
  if (!fs.existsSync(registryPath)) {
    fs.mkdirSync(registryPath, { recursive: true });
  }

  const registryItems = buildRegistryItems();
  const registryIndex = {
    $schema: registrySchemaUrl,
    name: "heroicons-animated-vue",
    homepage: "https://vue.heroicons-animated.com",
    items: registryItems,
  };

  fs.writeFileSync(
    registryIndexPath,
    JSON.stringify(registryIndex, null, 2)
  );

  console.log(`Built ${registryItems.length} Vue registry components`);
};

buildRegistry();
