<script lang="ts" setup>
import { mdiChevronRight } from "@mdi/js";
import { useScroll, useWindowSize } from "@vueuse/core";
import { computed } from "vue";
import CdvIcon from "@/components/atoms/CdvIcon.vue";

export interface CdvPageIndicatorProps {
  items: string[];
}

const props = defineProps<CdvPageIndicatorProps>();

const { y } = useScroll(window);
const { height } = useWindowSize();
const transfromY = computed(() => {
  return Math.min((y.value / height.value) * 64, (props.items.length - 1) * 64);
});
</script>

<template>
  <div class="cdv-page-indicator-container">
    <div class="cdv-page-indicator">
      <CdvIcon :icon="mdiChevronRight" :size="20"></CdvIcon>
      <div
        class="cdv-page-indicator-items"
        :style="{
          transform: `translate3d(0, ${-transfromY}px, 0)`,
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
  left: var(--app-spacing);
  overflow: hidden;
  font-weight: 600;
  font-size: 0.86rem;
  color: var(--cdv-c-white);
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
    z-index: -1;
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
