<script lang="ts" setup>
import type { AnchorHTMLAttributes } from "vue";

export interface CdvNavLinkProps {
  to: string;
}

withDefaults(defineProps<CdvNavLinkProps>(), {});
</script>

<template>
  <router-link
    class="cdv-link-alt cdv-nav-link"
    active-class="cdv-link-active"
    :to="to"
    ><slot></slot
  ></router-link>
</template>

<style scoped lang="scss">
.cdv-nav-link {
  font-size: 1.25rem;
  cursor: pointer;

  &.cdv-link-active {
    font-weight: bold;
  }
}
</style>
