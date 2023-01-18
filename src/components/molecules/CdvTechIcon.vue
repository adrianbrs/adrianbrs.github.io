<script lang="ts" setup>
import type { CdvTechIconOptions } from "@/lib/tech-icons";
import CdvIcon from "../atoms/CdvIcon.vue";

export interface CdvTechIconProps {
  options: CdvTechIconOptions;
  size?: number;
  position: "left" | "right";
}

withDefaults(defineProps<CdvTechIconProps>(), {
  size: 32,
  position: "right",
});
</script>

<template>
  <div
    :class="{
      'cdv-tech-icon': true,
      'cdv-tech-icon--left': position === 'left',
    }"
  >
    <CdvIcon :icon="options.icon" :size="size"></CdvIcon>
    <span class="cdv-tech-icon-label">{{ options.label }}</span>
  </div>
</template>

<style lang="scss">
.cdv-tech-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.86rem;
  transform-origin: 0 50%;

  &--left {
    flex-direction: row-reverse;
    transform-origin: 100% 50%;

    .cdv-tech-icon {
      &-label {
        transform-origin: 67% 50%;
        padding-right: 0;
        padding-left: 1.5rem;
        transform: translate3d(1.2rem, 0, 0) scale3d(0.4, 0.4, 1);
      }
    }
  }

  .cdv-icon {
    cursor: help;

    &:hover {
      transform: scale3d(1.2, 1.2, 1);

      + .cdv-tech-icon-label {
        visibility: visible;
        opacity: 1;
        transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
      }
    }
  }

  .cdv-icon,
  &-label {
    transition: all 0.16s ease;
  }

  &-label {
    visibility: hidden;
    opacity: 0;
    transform: translate3d(-1.2rem, 0, 0) scale3d(0.4, 0.4, 1);
    transform-origin: 33% 50%;
    padding-right: 1.5rem;
    user-select: none;
    pointer-events: none;
    transition-delay: 0.2s;
  }
}

@media screen and (max-width: 768px) {
  .cdv-tech-icon {
    .cdv-icon {
      cursor: default;
    }

    &-label {
      display: none !important;
    }
  }
}
</style>
