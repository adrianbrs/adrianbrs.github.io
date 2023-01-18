<script lang="ts" setup>
import { coercePixelValue } from "@/lib/shared";

export interface CdvCardProps {
  title: string;
  width?: string | number;
  height?: string | number;
}

withDefaults(defineProps<CdvCardProps>(), {});
</script>

<template>
  <div
    class="cdv-card flex flex-col items-center justify-start gap-[12px]"
    :style="{
      width: coercePixelValue(width),
      height: coercePixelValue(height),
    }"
  >
    <h2 class="cdv-card-title">{{ title }}</h2>

    <div
      class="cdv-card-content flex flex-col flex-grow-1 flex-shrink-0 flex-basis-auto"
    >
      <div class="cdv-card-image">
        <slot name="image"></slot>
      </div>

      <div class="cdv-card-text flex-1 py-4 px-5">
        <slot></slot>
      </div>

      <div class="cdv-card-actions flex items-center justify-end py-4 px-5">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cdv-card {
  &-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--cdv-c-white);
    text-align: left;
    width: 100%;
  }

  &-image {
    overflow: hidden;

    > img {
      min-width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  &-content {
    background: var(--cdv-c-black-soft);
    color: var(--cdv-c-white-soft);
    min-width: 100%;
    border-radius: 6px;
    box-shadow: 0 6px 4px -2px rgba(#111, 0.2), 0 0 8px -2px rgba(#222, 0.4),
      inset 0 0 2px rgba(#fff, 0.1);
    overflow: hidden;
  }
}
</style>
