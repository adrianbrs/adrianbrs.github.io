<script lang="ts" setup>
import { mdiChevronRight } from "@mdi/js";
import { computed } from "vue";
import CdvIcon from "@/components/atoms/CdvIcon.vue";
import { useScrollTarget } from "@/composables/useScrollTarget";
import { useScroll } from "@vueuse/core";

export interface CdvPageIndicatorProps {
  items: string[];
  heights: number[];
}

const props = defineProps<CdvPageIndicatorProps>();

const scrollTarget = useScrollTarget();
const { y: scrollTop } = useScroll(scrollTarget);

const distances = computed(() =>
  props.heights.reduce((arr, d, i) => {
    return [...arr, d + (arr[i - 1] ?? 0)];
  }, [] as number[])
);

const position = computed(() => {
  const index = distances.value.findIndex(
    (d, i, arr) => scrollTop.value < d || i === arr.length - 1
  );
  const height = props.heights[index];
  const distance = distances.value[index];
  const relativeDistance = height - (distance - scrollTop.value);
  const percentage = relativeDistance / height;
  return Math.min(index * 64 + percentage * 64, (props.items.length - 1) * 64);
});
</script>

<template>
  <div class="cdv-page-indicator-container">
    <div class="cdv-page-indicator">
      <CdvIcon :icon="mdiChevronRight" :size="20"></CdvIcon>
      <div
        class="cdv-page-indicator-items"
        :style="{
          transform: `translate3d(0, ${-position}px, 0)`,
        }"
      >
        <span v-for="name in items" :key="name">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cdv-page-indicator {
  position: absolute;
  display: flex;
  align-items: flex-start;
  height: 64px;
  top: 0;
  left: calc(var(--app-spacing) / 2);
  overflow: hidden;
  font-weight: 600;
  font-size: 0.86rem;
  color: var(--cdv-c-white);
  pointer-events: initial;
  mask-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgb(0, 0, 0) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-mask-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgb(0, 0, 0) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  filter: drop-shadow(1px 1px var(--cdv-c-indigo))
    drop-shadow(0 0 6px rgba(0, 0, 0, 0.4));

  > .cdv-icon {
    align-self: center;
  }

  &-container {
    position: fixed;
    top: 0;
    left: 50%;
    width: 100%;
    max-width: var(--app-max-width);
    height: 64px;
    transform: translate3d(-50%, 0, 0);
    z-index: 999;
    pointer-events: none;
  }

  &-items {
    display: flex;
    flex-direction: column;

    > span {
      display: flex;
      align-items: center;
      height: 64px;
    }
  }
}
</style>
