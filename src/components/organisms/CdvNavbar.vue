<script lang="ts" setup>
import type { CdvNavItem } from "@/composables/useNavItems";
import { useRouter } from "vue-router";
import { useNavbarMenu } from "@/composables/useNavbarMenu";
import CdvMenuBtn from "../atoms/CdvMenuBtn.vue";
import CdvBackdrop from "../atoms/CdvBackdrop.vue";
import CdvNavLink from "../atoms/CdvNavLink.vue";

export interface CdvNavbarProps {
  inline?: boolean;
  items: CdvNavItem[];
}

withDefaults(defineProps<CdvNavbarProps>(), {
  inline: true,
});

const { isOpen, toggle, close } = useNavbarMenu();

const router = useRouter();

router.afterEach(() => {
  if (isOpen) {
    close();
  }
});
</script>

<template>
  <Transition name="cdv-fade-up" appear>
    <div v-if="inline" class="cdv-navbar">
      <TransitionGroup
        tag="div"
        class="cdv-navbar-items"
        name="cdv-navlist"
        appear
      >
        <CdvNavLink
          v-for="(item, i) in items"
          v-bind="item"
          :key="item.label"
          :style="{ '--cdv-navlist-i': i }"
          >{{ item.label }}</CdvNavLink
        >
      </TransitionGroup>
    </div>

    <div v-else class="cdv-navbar cdv-navbar--fixed">
      <Transition name="cdv-fade-out-down">
        <TransitionGroup
          tag="div"
          class="cdv-navbar-items"
          name="cdv-navlist"
          v-if="isOpen"
          appear
        >
          <CdvNavLink
            v-for="(item, i) in items"
            v-bind="item"
            :key="item.label"
            :style="{ '--cdv-navlist-i': i }"
            >{{ item.label }}</CdvNavLink
          >
        </TransitionGroup>
      </Transition>

      <div class="cdv-navbar-title">
        <slot></slot>
      </div>

      <a class="cdv-nolink cdv-navbar-btn" v-if="!inline">
        <CdvMenuBtn @click="toggle" :close="isOpen"></CdvMenuBtn>
      </a>
    </div>
  </Transition>

  <CdvBackdrop :show="!inline && isOpen"></CdvBackdrop>
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
  filter: drop-shadow(1px 1px rgba(0, 0, 0, 0.4))
    drop-shadow(0 0 6px rgba(0, 0, 0, 0.4));

  &-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--cdv-c-white);
    user-select: none;
  }

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
    top: 16px;
    color: var(--cdv-c-white);
    cursor: pointer;
    z-index: 9999;
    right: 32px;
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
        right: 0;
        bottom: 0;
        left: 50%;
        flex-direction: column;
        align-items: center;
        transform: translate3d(-50%, 0, 0);

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
    opacity: 0 !important;
  }

  &-enter-from {
    transform: translateY(1em);
  }
}
</style>
