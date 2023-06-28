import {
  defineConfig,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography({
      selectorName: "cdv-prose",
      cssExtend: {
        blockquote: {
          "border-left": ".25em solid var(--cdv-c-primary)",
        },
        code: {
          color: "var(--cdv-c-primary)",
        },
        p: {
          "font-weight": "500",
        },
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
