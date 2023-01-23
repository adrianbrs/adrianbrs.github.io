<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import CdvSocialBtnGroup from "../molecules/CdvSocialBtnGroup.vue";

export interface CdvFooterLink {
  to: string;
  text: string;
}

export interface CdvFooterProps {
  items?: CdvFooterLink[];
}

withDefaults(defineProps<CdvFooterProps>(), {});

const { t } = useI18n();
</script>

<template>
  <footer class="cdv-footer">
    <div
      class="cdv-footer-content flex gap-[16px] items-center justify-between"
    >
      <nav
        class="cdv-footer-nav flex gap-[16px]"
        v-if="$slots.nav"
        :aria-label="t('aria_label')"
      >
        <slot name="nav"></slot>
      </nav>

      <div class="flex flex-1 justify-end">
        <CdvSocialBtnGroup class="justify-self-end"></CdvSocialBtnGroup>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.cdv-footer {
  width: 100%;
  padding: 24px 0;

  &-content {
    max-width: var(--app-max-width);
    padding: 0 var(--app-spacing);
    margin: 0 auto;
  }
}

@media screen and (max-width: 768px) {
  .cdv-footer {
    &-content {
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 480px) {
  .cdv-footer {
    &-nav {
      display: none !important;
    }
  }
}
</style>

<i18n lang="yaml">
en:
  aria_label: Footer
pt_BR:
  aria_label: Rodapé
</i18n>
