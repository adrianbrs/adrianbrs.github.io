<script lang="ts" setup>
import { computed, toRefs, type AnchorHTMLAttributes } from "vue";
import { RouterLink, type RouterLinkProps } from "vue-router";

export interface CdvNavLinkProps {
  to?: string;
  href?: string;
  target?: string;
}

const props = withDefaults(defineProps<CdvNavLinkProps>(), {});

const propsRef = toRefs(props);

const linkComponent = computed(() => {
  if (propsRef.to?.value) {
    return RouterLink;
  } else {
    return "a";
  }
});

const linkProps = computed(() => {
  if (propsRef.to?.value) {
    return {
      to: propsRef.to?.value,
      exactActiveClass: "cdv-link-active cdv-link-hover",
    } as RouterLinkProps;
  } else {
    return {
      href: propsRef.href?.value,
      target: propsRef.target?.value,
    } as AnchorHTMLAttributes;
  }
});
</script>

<template>
  <component
    :is="linkComponent"
    class="cdv-link-alt cdv-nav-link"
    v-bind="linkProps"
    ><slot></slot
  ></component>
</template>

<style scoped lang="scss">
.cdv-nav-link {
  font-size: 1.25rem;
  cursor: pointer;
  font-weight: 600;
  color: var(--cdv-c-white-soft);
  opacity: 0.7;

  &.cdv-link-active {
    opacity: 1;
    color: var(--cdv-c-white);
  }
}
</style>
