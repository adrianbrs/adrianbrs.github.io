<script lang="ts" setup>
export interface CdvMenuBtnProps {
  close?: boolean;
}

withDefaults(defineProps<CdvMenuBtnProps>(), {
  close: false,
});
</script>

<template>
  <button
    class="cdv-menu-btn"
    :class="{ 'cdv-menu-btn--close': close }"
    tabindex="0"
  >
    <div class="cdv-menu-btn-line"></div>
    <div class="cdv-menu-btn-line"></div>
    <div class="cdv-menu-btn-line"></div>
  </button>
</template>

<style scoped lang="scss">
.cdv-menu-btn {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: 0.8;
  border-radius: 50%;
  overflow: visible;

  &-line {
    width: 100%;
    height: 3px;
    background-color: var(--cdv-c-white);
    transition: all 0.2s ease-in-out;
    width: 32px;
  }

  &:hover,
  &:focus {
    opacity: 1;
  }

  &:not(.cdv-menu-btn--close) {
    outline-offset: 4px;

    &:hover,
    &:focus {
      .cdv-menu-btn-line {
        &:nth-child(1) {
          transform: translate3d(0, 1px, 0);
        }

        &:nth-child(2) {
          transform: scale3d(1.2, 1.2, 1);
        }

        &:nth-child(3) {
          transform: translate3d(0, -1px, 0);
        }
      }
    }
  }

  &--close {
    gap: 8px;
    padding-left: 8px;

    .cdv-menu-btn-line {
      transform-origin: 0 50%;

      &:nth-child(1) {
        transform: rotate3d(0, 0, 1, 45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: rotate3d(0, 0, 1, -45deg);
      }
    }

    &:hover,
    &:focus {
      transform: scale3d(1.25, 1.25, 1);
    }
  }
}
</style>
