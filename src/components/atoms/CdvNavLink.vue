<script lang="ts" setup>
export interface CdvNavLinkProps {
  to: string;
}

withDefaults(defineProps<CdvNavLinkProps>(), {});
</script>

<template>
  <a class="cdv-link-alt cdv-nav-link" active-class="cdv-link-active" :href="to"
    ><slot></slot
  ></a>
</template>

<style scoped lang="scss">
.cdv-nav-link {
  font-size: 1.25rem;
  cursor: pointer;
  font-weight: 400;
  color: var(--cdv-c-white-soft);

  &.cdv-link-active {
    font-weight: bold;
    color: var(--cdv-c-white);
  }
}
</style>
