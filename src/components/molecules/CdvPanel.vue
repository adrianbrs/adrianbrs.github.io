<script lang="ts" setup>
import { useShowAnim } from "@/composables/useShowAnim.js";
import { ref } from "vue";

export interface CdvPanelProps {
  width?: string | number;
  height?: string | number;
  divisor?: "left" | "right" | "none" | "both";
}

withDefaults(defineProps<CdvPanelProps>(), {
  width: "100%",
  height: "100%",
  divisor: "both",
});

const container = ref<HTMLDivElement>();
const show = useShowAnim(container);
</script>

<template>
  <div
    class="cdv-panel-container"
    ref="container"
    :style="{
      width: width,
      height: height,
    }"
  >
    <Transition
      class="!transition-delay-[0.1s] !transition-duration-[0.6s]"
      name="cdv-modal"
      appear
    >
      <div
        :class="{
          'cdv-panel': true,
          [`cdv-panel--divisor-${divisor}`]: !!divisor,
        }"
        v-if="show"
      >
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.cdv-panel {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  background: var(--cdv-panel-background);
  box-shadow: 0 6px 4px -2px rgba(#111, 0.2), 0 0 8px -2px rgba(#222, 0.4),
    inset 0 0 2px rgba(#fff, 0.1);
  border-radius: 1.25rem;
  min-height: 200px;
  padding: 16px 24px;
  flex-direction: column;

  &-container {
    display: flex;
    flex-direction: column;
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    left: -1px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    width: 4px;
    border-radius: 4px;
    background: var(--cdv-c-accent);
    height: max(20%, 74px);
  }

  &:after {
    left: auto;
    right: -1px;
  }

  &--divisor-left,
  &--divisor-both {
    &:before {
      display: block;
    }
  }

  &--divisor-right,
  &--divisor-both {
    &:after {
      display: block;
    }
  }
}
</style>
