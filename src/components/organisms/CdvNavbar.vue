<script lang="ts" setup>
import { ref, toRefs, watch } from "vue";
import type { CdvNavItem } from "@/composables/useNavItems";
import { useRouter } from "vue-router";
import { useNavbarMenu } from "@/composables/useNavbarMenu";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import CdvMenuBtn from "../atoms/CdvMenuBtn.vue";
import CdvBackdrop from "../atoms/CdvBackdrop.vue";
import CdvNavLink from "../atoms/CdvNavLink.vue";
import CdvLocaleSwitcher from "../molecules/CdvLocaleSwitcher.vue";
import { useI18n } from "vue-i18n";

export interface CdvNavbarProps {
  inline?: boolean;
  items: CdvNavItem[];
}

const props = withDefaults(defineProps<CdvNavbarProps>(), {
  inline: true,
});

const { t } = useI18n();
const { isOpen, toggle, close } = useNavbarMenu();
const { inline: isInline } = toRefs(props);

const router = useRouter();

router.afterEach(() => {
  if (isOpen) {
    close();
  }
});

watch(isInline, (inline) => {
  if (inline && isOpen.value) {
    close();
  }
});

const containerRef = ref<HTMLElement>();
const itemsRef = ref<HTMLElement>();
const { activate, deactivate } = useFocusTrap(containerRef);

watch(itemsRef, () => {
  if (isOpen.value) {
    activate();
  } else {
    deactivate();
  }
});
</script>

<template>
  <Transition name="cdv-fade-up" appear>
    <div v-if="inline" class="cdv-navbar" ref="containerRef">
      <TransitionGroup
        tag="nav"
        name="cdv-navlist"
        class="cdv-navbar-items"
        :aria-label="t('aria_label')"
        appear
      >
        <CdvNavLink
          v-for="(item, i) in items"
          v-bind="item"
          :key="item.name"
          :style="{ '--cdv-navlist-i': i }"
          >{{ item.label }}</CdvNavLink
        >
      </TransitionGroup>

      <Transition name="cdv-fade" appear>
        <CdvLocaleSwitcher class="ml-[16px]" />
      </Transition>
    </div>

    <div v-else class="cdv-navbar cdv-navbar--fixed" ref="containerRef">
      <Transition name="cdv-fade-out-down">
        <TransitionGroup
          v-if="isOpen"
          tag="nav"
          class="cdv-navbar-items"
          name="cdv-navlist"
          ref="itemsRef"
          id="cdvNavbarItems"
          :aria-label="t('aria_label')"
          appear
        >
          <CdvNavLink
            v-for="(item, i) in items"
            v-bind="item"
            :key="item.name"
            :style="{ '--cdv-navlist-i': i }"
            >{{ item.label }}</CdvNavLink
          >

          <CdvLocaleSwitcher key="switcher" />
        </TransitionGroup>
      </Transition>

      <div class="cdv-navbar-title">
        <slot></slot>
      </div>

      <a
        class="cdv-nolink cdv-navbar-btn"
        aria-controls="cdvNavbarItems"
        :aria-expanded="isOpen"
        :aria-label="isOpen ? t('close_menu') : t('open_menu')"
      >
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

    .cdv-locale-switcher {
      margin-top: 48px;
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

<i18n lang="yaml">
en:
  aria_label: Main
  open_menu: Open menu
  close_menu: Close menu
pt_BR:
  aria_label: Principal
  open_menu: Abrir menu
  close_menu: Fechar menu
</i18n>
