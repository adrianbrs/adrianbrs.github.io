<script lang="ts" setup>
import CdvNavLink from "../atoms/CdvNavLink.vue";
import CdvSocialBtn from "../atoms/CdvSocialBtn.vue";
import CdvSocialBtnGroup from "../molecules/CdvSocialBtnGroup.vue";

export interface CdvFooterLink {
  to: string;
  text: string;
}

export interface CdvFooterProps {
  items?: CdvFooterLink[];
}

withDefaults(defineProps<CdvFooterProps>(), {});
</script>

<template>
  <footer class="cdv-footer">
    <div
      class="cdv-footer-content flex gap-[16px] items-center justify-between"
    >
      <div class="cdv-footer-nav flex gap-[16px]" v-if="items">
        <CdvNavLink v-for="item in items" :to="item.to" :key="item.to">{{
          item.text
        }}</CdvNavLink>
      </div>

      <CdvSocialBtnGroup></CdvSocialBtnGroup>
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
