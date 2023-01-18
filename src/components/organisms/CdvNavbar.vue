<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import CdvMenuBtn from "../atoms/CdvMenuBtn.vue";
import CdvBackdrop from "../atoms/CdvBackdrop.vue";
import CdvNavLink from "../atoms/CdvNavLink.vue";

export interface CdvNavbarItem {
  to: string;
  text: string;
}

export interface CdvNavbarProps {
  inline?: boolean;
  items: CdvNavbarItem[];
}

const props = withDefaults(defineProps<CdvNavbarProps>(), {
  inline: true,
});

const open = ref(false);

const toggle = () => {
  open.value = !open.value;
};
</script>

<template>
  <Transition name="fade">
    <div v-if="inline" class="cdv-navbar">
      <TransitionGroup
        tag="div"
        class="cdv-navbar-items"
        name="cdv-navlist"
        appear
      >
        <CdvNavLink
          v-for="(item, i) in items"
          :to="item.to"
          :key="item.to"
          :style="{ '--cdv-navlist-i': i }"
          >{{ item.text }}</CdvNavLink
        >
      </TransitionGroup>
    </div>

    <div v-else class="cdv-navbar cdv-navbar--fixed">
      <Transition name="fade-out-down">
        <TransitionGroup
          tag="div"
          class="cdv-navbar-items"
          name="cdv-navlist"
          v-if="open"
          appear
        >
          <CdvNavLink
            v-for="(item, i) in items"
            :to="item.to"
            :key="item.to"
            :style="{ '--cdv-navlist-i': i }"
            >{{ item.text }}</CdvNavLink
          >
        </TransitionGroup>
      </Transition>

      <a class="cdv-nolink cdv-navbar-btn" v-if="!inline">
        <CdvMenuBtn @click="toggle" :close="open"></CdvMenuBtn>
      </a>
    </div>
  </Transition>

  <CdvBackdrop :show="!inline && open"></CdvBackdrop>
</template>

<style lang="scss">
.cdv-navbar {
  top: 0;
  height: var(--app-navbar-height);
  width: 100%;
  max-width: var(--app-max-width);
  margin: 0 auto;
  position: fixed;
  display: flex;
  align-items: flex-end;
  padding-bottom: 6px;
  padding: 0 var(--app-navbar-height);
  z-index: 999;
  left: 0;
  right: 0;

  &-items {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 28px;
    width: 100%;
  }

  &-btn {
    display: inline-flex;
    position: absolute;
    right: 0;
    top: 16px;
    color: var(--cdv-c-white);
    cursor: pointer;
    z-index: 9999;
    right: 32px;
  }

  &-backdrop {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--color-background-backdrop);
    z-index: 999;
  }

  &--fixed {
    &.cdv-navbar {
      align-items: center;
      justify-content: center;
    }

    .cdv-navbar {
      &-items {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        flex-direction: column;
        align-items: center;

        .cdv-nav-link {
          font-size: 1.8rem;
        }
      }
    }
  }
}

/** Transition */
.cdv-navlist {
  &-move {
    transition: opacity 0.5s linear, transform 0.5s ease-in-out;
  }

  &-enter-active {
    transition: opacity 0.5s linear,
      transform 0.5s cubic-bezier(0.2, 0.5, 0.1, 1);
    transition-delay: calc(0.1s * var(--cdv-navlist-i));
  }

  &-enter-from {
    opacity: 0;
  }

  &-enter-from {
    transform: translateY(1em);
  }
}
</style>
