<script lang="ts" setup>
import { mdiChevronRight } from "@mdi/js";
import { computed, unref, type Ref, toRefs } from "vue";
import type { CdvNavItem } from "@/composables/useNavItems";
import { useScrollTarget } from "@/composables/useScrollTarget";
import { useScroll } from "@vueuse/core";
import CdvIcon from "@/components/atoms/CdvIcon.vue";

export interface CdvPageIndicatorProps {
  items: CdvNavItem[];
  heights: (number | Ref<number>)[];
}

const props = defineProps<CdvPageIndicatorProps>();
const propsRef = toRefs(props);

const scrollTarget = useScrollTarget();
const { y: scrollTop } = useScroll(scrollTarget);

const distances = computed(() =>
  propsRef.heights.value.reduce((arr, d, i) => {
    return [...arr, unref(d) + (arr[i - 1] ?? 0)];
  }, [] as number[])
);

const position = computed(() => {
  const index = distances.value.findIndex(
    (d, i, arr) => scrollTop.value < d || i === arr.length - 1
  );
  const height = propsRef.heights.value[index];
  const distance = distances.value[index];
  const relativeDistance = unref(height) - (distance - scrollTop.value);
  const percentage = relativeDistance / unref(height);
  return Math.min(
    index * 64 + percentage * 64,
    (propsRef.items.value.length - 1) * 64
  );
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
        <span v-for="item in items" :key="item.name">{{ item.label }}</span>
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
