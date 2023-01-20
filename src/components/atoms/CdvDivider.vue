<script lang="ts" setup>
import { coercePixelValue } from "@/lib/shared";

export interface CdvDividerProps {
  thickness?: number | string;
  size?: number | string;
  vertical?: boolean;
  radius?: number | string;
  color?: number | string;
}

withDefaults(defineProps<CdvDividerProps>(), {
  thickness: 2,
  size: 54,
  vertical: false,
  radius: 2,
});
</script>

<template>
  <div
    v-if="vertical"
    class="cdv-divider"
    :style="{
      width: coercePixelValue(thickness),
      height: coercePixelValue(size),
      borderRadius: coercePixelValue(radius),
      '--cdv-divider-color': color,
    }"
  ></div>
  <div
    v-else
    class="cdv-divider"
    :style="{
      height: coercePixelValue(thickness),
      width: coercePixelValue(size),
      borderRadius: coercePixelValue(radius),
      '--cdv-divider-color': color,
    }"
  ></div>
</template>

<style lang="scss">
:root {
  --cdv-divider-color: var(--cdv-c-accent);
}

.cdv-divider {
  content: "";
  display: inline-flex;
  background: var(--cdv-divider-color);
}
</style>
