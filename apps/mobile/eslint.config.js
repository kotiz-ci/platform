const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const boundaries = require("eslint-plugin-boundaries");

// Feature-Sliced Design (ADR-015) : app -> pages -> widgets -> features -> entities -> shared.
const SLICED_LAYERS = ["pages", "widgets", "features", "entities"];
const LOWER_LAYERS = {
  app: [...SLICED_LAYERS, "shared"],
  pages: ["widgets", "features", "entities", "shared"],
  widgets: ["features", "entities", "shared"],
  features: ["entities", "shared"],
  entities: ["shared"],
  shared: ["shared"],
};
const PUBLIC_API = "index.{ts,tsx}";

const publicApiOf = (type) => ({ element: { type, fileInternalPath: PUBLIC_API } });

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/**"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "app" },
        ...SLICED_LAYERS.map((type) => ({
          type,
          pattern: `src/${type}/*`,
          capture: ["slice"],
        })),
        { type: "shared", pattern: "src/shared/*", capture: ["segment"] },
      ],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "allow",
          message:
            "FSD : {{from.element.type}} ne peut importer {{to.element.type}} " +
            "que vers une couche inférieure et via son index.ts",
          policies: [
            ...Object.keys(LOWER_LAYERS).map((type) => ({
              from: { element: { type } },
              disallow: { to: { element: { types: { anyOf: Object.keys(LOWER_LAYERS) } } } },
            })),
            ...Object.entries(LOWER_LAYERS).map(([type, lower]) => ({
              from: { element: { type } },
              allow: { to: lower.map(publicApiOf) },
            })),
            ...[...SLICED_LAYERS, "shared"].map((type) => {
              const key = type === "shared" ? "segment" : "slice";
              return {
                from: { element: { type } },
                allow: {
                  to: {
                    element: {
                      type,
                      captured: { [key]: `{{from.element.captured.${key}}}` },
                    },
                  },
                },
              };
            }),
            {
              from: { element: { type: "app" } },
              allow: { to: { element: { type: "app" } } },
            },
          ],
        },
      ],
    },
  },
  {
    // Tout fichier sous src/ appartient à une couche FSD.
    files: ["src/**/*.{js,jsx,ts,tsx}", "test/fixtures/fsd/src/**/*.{js,jsx,ts,tsx}"],
    rules: { "boundaries/no-unknown-files": "error" },
  },
]);
