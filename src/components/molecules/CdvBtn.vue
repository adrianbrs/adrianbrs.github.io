<script lang="ts" setup>
import { useElementHover } from "@vueuse/core";
import { ref } from "vue";
import { mdiArrowRight } from "@mdi/js";
import { useIsMobile } from "@/composables/useIsMobile";
import CdvIcon from "../atoms/CdvIcon.vue";

export interface CdvBtnProps {
  tag?: string;
  rounded?: boolean;
  outlined?: boolean;
  color?: string;
  arrow?: boolean;
  type?: string;
}

withDefaults(defineProps<CdvBtnProps>(), {
  tag: "button",
  type: "submit",
});

const btn = ref<HTMLElement>();
const isHovering = useElementHover(btn);
const isMobile = useIsMobile();
</script>

<template>
  <component
    :is="tag"
    :class="{
      'cdv-btn': true,
      'cdv-btn--rounded': rounded,
      'cdv-btn--outlined': outlined,
    }"
    :style="{
      '--cdv-btn-color': color,
    }"
    :type="type"
    ref="btn"
  >
    <Transition
      :name="isHovering ? 'cdv-btn-wrapper-in' : 'cdv-btn-wrapper-out'"
      :css="!isMobile"
    >
      <span
        :key="isHovering && !isMobile ? 'hover' : 'default'"
        class="cdv-btn-wrapper"
      >
        <slot />

        <CdvIcon class="cdv-btn-arrow" v-if="arrow" :icon="mdiArrowRight" />
      </span>
    </Transition>
  </component>
</template>

<style lang="scss">
:root {
  --cdv-btn-color: var(--cdv-c-primary);
  --cdv-btn-timing: 0.2s;
  --cdv-btn-easing: cubic-bezier(0.76, 0, 0.24, 1);
  --cdv-btn-arrow-transform: translate3d(12px, 0, 0);
}

.cdv-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  border-radius: 4px;
  border: 1px solid transparent;
  background: var(--cdv-c-white-soft);
  color: var(--cdv-btn-color);
  text-transform: uppercase;
  height: 46px;
  font-weight: 600;
  transition: all var(--cdv-btn-timing) var(--cdv-btn-easing);
  overflow: hidden;
  position: relative;

  &:hover {
    .cdv-btn {
      &-wrapper {
        &:not(
            .cdv-btn-wrapper-in-enter-active,
            .cdv-btn-wrapper-in-leave-active,
            .cdv-btn-wrapper-out-leave-active
          ) {
          .cdv-btn {
            &-arrow {
              transform: var(--cdv-btn-arrow-transform);
            }
          }
        }
      }
    }
  }

  &-arrow {
    transition: transform 0.6s cubic-bezier(0.87, 0, 0.13, 1);
  }

  &-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
    z-index: 2;

    &-in,
    &-out {
      &-enter-active,
      &-leave-active {
        transition: all var(--cdv-btn-timing) var(--cdv-btn-easing);
      }
      &-leave-active {
        position: absolute;
      }
      &-enter-from,
      &-leave-to {
        opacity: 0;
      }
    }

    &-in {
      &-enter-from {
        transform: translate3d(-110%, 0, 0);
        color: var(--cdv-c-white);

        .cdv-btn--outlined & {
          color: var(--cdv-btn-color);
        }
      }
      &-leave-to {
        transform: translate3d(110%, 0, 0);
        color: var(--cdv-btn-color);

        .cdv-btn--outlined & {
          color: var(--cdv-c-white);
        }
      }
    }

    &-out {
      &-enter-active {
        .cdv-btn-arrow {
          transform: var(--cdv-btn-arrow-transform);
        }
      }

      &-enter-from {
        transform: translate3d(110%, 0, 0);
        color: var(--cdv-btn-color);

        .cdv-btn--outlined & {
          color: var(--cdv-c-white);
        }
      }
      &-leave-to {
        transform: translate3d(-110%, 0, 0);
        color: var(--cdv-c-white);

        .cdv-btn--outlined & {
          color: var(--cdv-btn-color);
        }
      }
    }
  }

  &--rounded {
    border-radius: 40px;

    &:not(&--outlined) {
      &::before {
        border-radius: 40px;
      }
    }
  }

  &--outlined {
    background: transparent;
    border: 1px solid var(--cdv-c-white);
    color: var(--cdv-c-white);

    &:hover {
      border: 1px solid var(--cdv-btn-color);
      color: var(--cdv-btn-color);
    }
  }

  &:not(&--outlined) {
    &:hover {
      color: var(--cdv-c-white);
      background: var(--cdv-btn-color);

      &::before {
        transform: translate3d(0, 0, 0);
        // visibility: visible;
      }
    }
  }
}
</style>
